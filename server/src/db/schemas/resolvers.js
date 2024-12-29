import jwt from 'jsonwebtoken';
import { Card, User } from '../../models/index.js';

const resolvers = {
  Query: {
    cards: async () => await Card.find(),
    card: async (_, { id }) => await Card.findOne({ id }),
    users: async () => await User.find(),
    user: async (_, { id }) => await User.findById(id),
  },
  Mutation: {
    addCard: async (_, { front, back, cardClass }) => {
      const lastCard = await Card.findOne().sort({ id: -1 });
      const newId = lastCard ? lastCard.id + 1 : 1;
      const newCard = new Card({ id: newId, front, back, class: cardClass });
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
    updateCard: async (_, { id, front, back, cardClass }, context) => {
      if (!context.user) throw new Error('Not authenticated');
      
      const card = await Card.findOne({ id });
      if (!card) throw new Error('Card not found');
      
      if (card.cardCreatorId.toString() !== context.user.id) {
        throw new Error('Not authorized to update this card');
      }

      const updates = {};
      if (front) updates.front = front;
      if (back) updates.back = back;
      if (cardClass) updates.cardClass = cardClass;

      const updatedCard = await Card.findOneAndUpdate(
        { id },
        updates,
        { new: true }
      );
      return updatedCard;
    },
  },
};

export default resolvers;