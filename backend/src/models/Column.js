const ColumnModel = (sequelize, DataTypes) => {
  return sequelize.define("Column", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};
module.exports = ColumnModel;
