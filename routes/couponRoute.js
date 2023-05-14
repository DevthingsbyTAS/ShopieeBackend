const express = require("express");
const {
  createCoupon,
  updateCoupon,
  getCoupon,
  getAllCoupon,
  deleteCoupon,
} = require("../controller/couponCtrl");

const { authMiddlreWare, isAdmin } = require("../middlewares/authMiddleWare");
const router = express.Router();
router.post("/", authMiddlreWare, isAdmin, createCoupon);
router.put("/:id", authMiddlreWare, isAdmin, updateCoupon);
router.get("/:id", getCoupon);
router.get("/", authMiddlreWare, isAdmin, getAllCoupon);
router.delete("/:id", authMiddlreWare, isAdmin, deleteCoupon);
module.exports = router;
