const express = require("express");
const {
  createCategory,
  updateCategory,
  getAllCategory,
  deleteCategory,
  getACategory,
} = require("../controller/CategoryCtrl");

const { authMiddlreWare, isAdmin } = require("../middlewares/authMiddleWare");
const router = express.Router();
router.post("/", authMiddlreWare, isAdmin, createCategory);
router.put("/:id", authMiddlreWare, isAdmin, updateCategory);
router.get("/:id", authMiddlreWare, getACategory);
router.get("/", getAllCategory);
router.delete("/:id", authMiddlreWare, isAdmin, deleteCategory);
module.exports = router;
