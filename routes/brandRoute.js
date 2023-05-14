const express = require("express");
const {
  createBrand,
  updateBrand,
  getAllBrand,
  deleteBrand,
  getABrand,
} = require("../controller/brandCtrl");

const { authMiddlreWare, isAdmin } = require("../middlewares/authMiddleWare");
const router = express.Router();
router.post("/", authMiddlreWare, isAdmin, createBrand);
router.put("/:id", authMiddlreWare, isAdmin, updateBrand);
router.get("/:id", authMiddlreWare, getABrand);
router.get("/", getAllBrand);
router.delete("/:id", authMiddlreWare, isAdmin, deleteBrand);
module.exports = router;
