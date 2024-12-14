import mongoose from 'mongoose';

const cardSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  class: { type: String, required: true },
  front: { type: String, required: true },
  back: { type: String, required: true }
});

const Card = mongoose.model('Card', cardSchema);

export default Card;