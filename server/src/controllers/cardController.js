import Card from '../models/card.js';

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
    const newCard = new Card({ ...req.body, id: newId });
    await newCard.save();
    res.status(201).json(newCard);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};