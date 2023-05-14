const express = require("express");
const {
  createBlog,
  updateBlog,
  getBlog,
  getAllBlog,
  deleteBlog,
  likeBlog,
  dislikedBlog,
} = require("../controller/blogCtrl");

const { authMiddlreWare, isAdmin } = require("../middlewares/authMiddleWare");
const router = express.Router();
router.put("/likes", authMiddlreWare, likeBlog);
router.put("/dislikes", authMiddlreWare, dislikedBlog);
router.post("/", authMiddlreWare, isAdmin, createBlog);
router.put("/:id", authMiddlreWare, isAdmin, updateBlog);
router.get("/:id", getBlog);
router.get("/", getAllBlog);
router.delete("/:id", authMiddlreWare, isAdmin, deleteBlog);
module.exports = router;
