import jwt from 'jsonwebtoken';
import Card from '../../models/card.js';
import User from '../../models/user.js';

const resolvers = {
  Query: {
    cards: async () => await Card.find(),
    card: async (_, { id }) => await Card.findOne({ id }),
    users: async () => await User.find(),
    user: async (_, { id }) => await User.findById(id),
  },
  Mutation: {
    addCard: async (_, { front, back }) => {
      const lastCard = await Card.findOne().sort({ id: -1 });
      const newId = lastCard ? lastCard.id + 1 : 1;
      const newCard = new Card({ id: newId, front, back });
      await newCard.save();
      return newCard;
    },
    registerUser: async (_, { username, password, authLevel = 0 }) => {
      const newUser = new User({ username, password, authLevel });
      await newUser.save();
      return newUser;
    },
    loginUser: async (_, { username, password }) => {
      const user = await User.findOne({ username });
      if (!user || !(await user.comparePassword(password))) {
        throw new Error('Invalid username or password');
      }
      const token = jwt.sign({ id: user._id, authLevel: user.authLevel }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return { token };
    },
  },
};

export default resolvers;