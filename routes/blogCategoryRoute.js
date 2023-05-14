const express = require("express");
const {
  createBlogCategory,
  updateBlogCategory,
  getAllBlogCategory,
  deleteBlogCategory,
  getABlogCategory,
} = require("../controller/blogCategoryCtrl ");

const { authMiddlreWare, isAdmin } = require("../middlewares/authMiddleWare");
const router = express.Router();
router.post("/", authMiddlreWare, isAdmin, createBlogCategory);
router.put("/:id", authMiddlreWare, isAdmin, updateBlogCategory);
router.get("/:id", authMiddlreWare, getABlogCategory);
router.get("/", getAllBlogCategory);
router.delete("/:id", authMiddlreWare, isAdmin, deleteBlogCategory);
module.exports = router;
