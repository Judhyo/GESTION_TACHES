const { where } = require("sequelize");
const { Board } = require("../models/index.js");

const createBoard = async (req, res) => {
  const { title, userId } = req.body;
  try {
    const board = await Board.create({ title, userId });
    res.status(201).json(board);
  } catch (e) {
    res.status(400).json({ message: "Erreur serveur" });
  }
};
const readBoard = async (req, res) => {
  try {
    const board = await Board.findAll({ where: { userId: req.params.id } });
    res.status(201).json(board);
  } catch (e) {
    res.status(400).json({ message: "Erreur serveur" });
  }
};
const updateBoard = async (req, res) => {
  try {
    await Board.update(req.body, { where: { id: req.params.id } });
    res.json({ message: "Tableau mis à jour" });
  } catch {
    res.status(400).json({ message: "Erreur serveur" });
  }
};
const deleteBoard = async (req, res) => {
  try {
    await Board.destroy({ where: { id: req.params.id } });
    res.json({ message: "Tableau supprimé" });
  } catch {
    res.status(400).json({ message: "Erreur serveur" });
  }
};

module.exports = {
  createBoard,
  readBoard,
  updateBoard,
  deleteBoard,
};
