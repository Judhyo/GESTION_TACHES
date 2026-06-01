const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware.js");
const {
  createBoard,
  readBoard,
  updateBoard,
  deleteBoard,
} = require("../controllers/board.controller");
const router = express.Router();

router.post("/", authMiddleware, createBoard);
router.get("/:id", authMiddleware, readBoard);
router.put("/:id", authMiddleware, updateBoard);
router.delete("/:id", authMiddleware, deleteBoard);
module.exports = router;
