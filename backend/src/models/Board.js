const BoardModel = (sequelize, DataTypes) => {
  return sequelize.define("Board", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
module.exports = BoardModel;
