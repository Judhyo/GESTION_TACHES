const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware.js");
const {
  createCard,
  readCard,
  updateCard,
  patchCard,
  deleteCard,
} = require("../controllers/card.controller");
const router = express.Router();

router.post("/", authMiddleware, createCard);
router.get("/", authMiddleware, readCard);
router.put("/:id", authMiddleware, updateCard);
router.delete("/:id", authMiddleware, deleteCard);
module.exports = router;
