const { Card } = require("../models/index.js");

const createCard = async (req, res) => {
  const { title, order, description, columnId } = req.body;
  try {
    const card = await Card.create({ title, order, description, columnId });
    res.status(201).json(card);
  } catch (e) {
    res.status(400).json({ message: "Erreur serveur" });
  }
};
const readCard = async (req, res) => {
  try {
    const card = await Card.findAll();
    res.status(201).json(card);
  } catch (e) {
    res.status(400).json({ message: "Erreur serveur" });
  }
};
const updateCard = async (req, res) => {
  try {
    await Card.update(req.body, { where: { id: req.params.id } });
    res.json({ message: "Tableau mis à jour" });
  } catch {
    res.status(400).json({ message: "Erreur serveur" });
  }
};

const deleteCard = async (req, res) => {
  try {
    await Card.destroy({ where: { id: req.params.id } });
    res.json({ message: "Tableau supprimé" });
  } catch {
    res.status(400).json({ message: "Erreur serveur" });
  }
};

module.exports = {
  createCard,
  readCard,
  updateCard,
  deleteCard,
};
