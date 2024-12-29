import mongoose from 'mongoose';

const cardSchema = new mongoose.Schema({
  id: { 
    type: Number, 
    unique: true 
  },
  cardClass: { 
    type: String, 
    required: true 
  },
  front: { 
    type: String, 
    required: true 
  },
  back: { 
    type: String, 
    required: true 
  },
  cardCreatorId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  cardUpdaterId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  }
}, {
  timestamps: true
});

const Card = mongoose.model('Card', cardSchema);

export default Card;