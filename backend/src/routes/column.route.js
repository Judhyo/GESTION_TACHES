const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware.js");
const {
  createColumn,
  readColumn,
  updateColumn,
  deleteColumn,
} = require("../controllers/column.controller");
const router = express.Router();

router.post("/", authMiddleware, createColumn);
router.get("/:id", authMiddleware, readColumn);
router.put("/:id", authMiddleware, updateColumn);
router.delete("/:id", authMiddleware, deleteColumn);
module.exports = router;
