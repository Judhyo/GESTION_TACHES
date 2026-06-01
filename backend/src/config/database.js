const Sequelize = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 5432,
  dialect: "postgres",
  logging: false,
  define: {
    timestamps: true,
    underscored: true,
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

// Test de connexion
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connexion à PostgreSQL réussie");
  } catch (error) {
    console.error("Erreur de connexion à PostgreSQL :", error);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };
