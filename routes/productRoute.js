const express = require("express");
const {
  createProduct,
  getaProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
  addToWishList,
  rating,
  uploadImages,
} = require("../controller/productCtrl");

const { authMiddlreWare, isAdmin } = require("../middlewares/authMiddleWare");
const {
  uploadPhoto,
  productImgResize,
} = require("../middlewares/uploadImages");
const router = express.Router();

router.post("/", authMiddlreWare, isAdmin, createProduct);
router.put(
  "/upload/:id",
  authMiddlreWare,
  isAdmin,
  uploadPhoto.array("images", 10),
  productImgResize,
  uploadImages
);
router.get("/:id", getaProduct);
router.put("/wishlist", authMiddlreWare, addToWishList);
router.put("/rating", authMiddlreWare, rating);
router.put("/:id", authMiddlreWare, isAdmin, updateProduct);
router.delete("/:id", authMiddlreWare, isAdmin, deleteProduct);
router.get("/", getAllProduct);
module.exports = router;
