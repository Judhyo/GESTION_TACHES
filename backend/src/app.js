const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const auth = require("./routes/auth.route");
const board = require("./routes/board.route");
const column = require("./routes/column.route");
const card = require("./routes/card.route");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//
app.use("/auth", auth);
app.use("/board", board);
app.use("/column", column);
app.use("/card", card);

module.exports = app;
