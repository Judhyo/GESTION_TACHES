const app = require("./app.js");
const { connectDB } = require("./config/database.js");
const { sequelize } = require("./models/index.js");
const PORT = process.env.PORT || 5000;
connectDB();

sequelize
  .sync({ alter: true })
  .then(() => console.log("Tables synchronisées et créées"))
  .catch((err) => console.error(err));

app.listen(PORT, () => {
  console.log(`Backend démarré sur le port ${PORT}`);
});
