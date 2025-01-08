import jwt from 'jsonwebtoken';
import { Card, User } from '../../models/index.js';

const getNextId = async () => {
  const highestCard = await Card.findOne({}, 'id').sort('-id');
  return highestCard ? highestCard.id + 1 : 1;
};

const resolvers = {
  Query: {
    cards: async () => {
      const cards = await Card.find({}, 'id front back cardClass cardCreatorId');
      return cards.map(card => ({
        ...card._doc,
        cardCreatorId: card.cardCreatorId
      }));
    },
    card: async (_, { id }) => await Card.findOne({ id }),
    users: async (_, __, context) => {
      try {
        if (!context.user) throw new Error('Not authenticated');
        const users = await User.find({}, 'id username authLevel');
        return users.map(user => ({
          id: user._id,
          username: user.username,
          authLevel: user.authLevel
        }));
      } catch (error) {
        console.error('Users query error:', error);
        throw error;
      }
    },
    user: async (_, { id }) => {
      try {
        const user = await User.findById(id);
        if (!user) {
          throw new Error('User not found');
        }
        return {
          id: user._id,
          username: user.username,
          createdAt: user.createdAt.toISOString(),
          authLevel: user.authLevel
        };
      } catch (error) {
        throw new Error('Error fetching user');
      }
    },
  },
  Mutation: {
    addCard: async (_, { front, back, cardClass, cardCreatorId }, context) => {
      if (!context.user) throw new Error('Not authenticated');
      
      const card = new Card({
        front,
        back,
        cardClass,
        cardCreatorId,
        id: await getNextId()
      });
      
      return await card.save();
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
    updateCard: async (_, { id, front, back, cardClass, cardUpdaterId }, context) => {
      if (!context.user) throw new Error('Not authenticated');
      
      const card = await Card.findOne({ id });
      if (!card) throw new Error('Card not found');
      
      if (card.cardCreatorId.toString() !== context.user.id) {
        throw new Error('Not authorized to update this card');
      }
      
      const updatedCard = await Card.findOneAndUpdate(
        { id },
        { front, back, cardClass, cardUpdaterId },
        { new: true }
      );
      
      return updatedCard;
    },
    deleteCard: async (_, { id }, context) => {
      if (!context.user) throw new Error('Not authenticated');
      
      const card = await Card.findOne({ id });
      if (!card) throw new Error('Card not found');
      
      if (card.cardCreatorId.toString() !== context.user.id) {
        throw new Error('Not authorized to delete this card');
      }
    
      return await Card.findOneAndDelete({ id });
    },
  },
};

export default resolvers;