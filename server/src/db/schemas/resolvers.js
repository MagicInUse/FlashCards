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
    addCard: async (_, { question, answer }) => {
      const lastCard = await Card.findOne().sort({ id: -1 });
      const newId = lastCard ? lastCard.id + 1 : 1;
      const newCard = new Card({ id: newId, question, answer });
      await newCard.save();
      return newCard;
    },
    registerUser: async (_, { username, password, authLevel }) => {
      const newUser = new User({ username, password, authLevel });
      await newUser.save();
      return newUser;
    },
  },
};

export default resolvers;