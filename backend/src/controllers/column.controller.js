const { Column } = require("../models/index.js");

const createColumn = async (req, res) => {
  const columns = req.body;

  try {
    if (!Array.isArray(columns)) {
      return res.status(400).json({
        message: "Les données doivent être un tableau",
      });
    }
    const createdColumns = await Column.bulkCreate(columns);

    res.status(201).json(createdColumns);
  } catch (e) {
    console.log(e);

    res.status(500).json({
      message: "Erreur serveur",
    });
  }
};
const readColumn = async (req, res) => {
  try {
    const column = await Column.findAll({
      where: { boardId: req.params.id },
    });
    res.status(201).json(column);
  } catch (e) {
    res.status(400).json({ message: "Erreur serveur" });
  }
};
const updateColumn = async (req, res) => {
  await Column.update(req.body, { where: { id: req.params.id } });
  res.json({ message: "Tableau mis à jour" });
  try {
    await Column.update(req.body, { where: { id: req.params.id } });
    res.json({ message: "Tableau mis à jour" });
  } catch {
    res.status(400).json({ message: "Erreur serveur" });
  }
};
const deleteColumn = async (req, res) => {
  try {
    await Column.destroy({ where: { id: req.params.id } });
    res.json({ message: "Tableau supprimé" });
  } catch {
    res.status(400).json({ message: "Erreur serveur" });
  }
};

module.exports = {
  createColumn,
  readColumn,
  updateColumn,
  deleteColumn,
};
