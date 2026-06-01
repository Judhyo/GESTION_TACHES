const { sequelize } = require("../config/database.js");
const { DataTypes } = require("sequelize");

const UserModel = require("./User");
const ColumnModel = require("./Column");
const CardModel = require("./Card");
const BoardModel = require("./Board");

const User = UserModel(sequelize, DataTypes);
const Column = ColumnModel(sequelize, DataTypes);
const Card = CardModel(sequelize, DataTypes);
const Board = BoardModel(sequelize, DataTypes);

// association entre l'utilisateur et le tableau
User.hasMany(Board, { foreignKey: "userId" });
Board.belongsTo(User, { foreignKey: "userId" });

// association entre le tableau et la colonne
Board.hasMany(Column, { foreignKey: "boardId" });
Column.belongsTo(Board, { foreignKey: "boardId" });

// association entre la colonne et le carte
Column.hasMany(Card, { foreignKey: "columnId" });
Card.belongsTo(Column, { foreignKey: "columnId" });

module.exports = { sequelize, User, Board, Column, Card };
