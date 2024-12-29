import { Card } from '../models/index.js';

export const getAllCards = async (req, res) => {
  try {
    const cards = await Card.find();
    res.json(cards);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getCardById = async (req, res) => {
  try {
    const card = await Card.findOne({ id: req.params.id });
    if (!card) return res.status(404).json({ error: 'Card not found' });
    res.json(card);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addCard = async (req, res) => {
  try {
    const lastCard = await Card.findOne().sort({ id: -1 });
    const newId = lastCard ? lastCard.id + 1 : 1;
    const newCard = new Card({ 
      ...req.body, 
      id: newId,
      cardCreatorId: req.user.id 
    });
    await newCard.save();
    res.status(201).json(newCard);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateCard = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    const card = await Card.findOne({ id });
    if (!card) {
      return res.status(404).json({ error: 'Card not found' });
    }

    if (card.cardCreatorId.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to update this card' });
    }

    const updatedCard = await Card.findOneAndUpdate(
      { id },
      updates,
      { new: true }
    );
    res.json(updatedCard);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};