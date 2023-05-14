const Coupon = require("../models/couponModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");
const { loginUserCtrl } = require("./userCtrl");

const getCoupon = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getCoupon = await Coupon.findById(id);
    res.json(getCoupon);
  } catch (err) {
    throw new Error(err);
  }
});
const getAllCoupon = asyncHandler(async (req, res) => {
  try {
    const getAllCoupon = await Coupon.find();
    res.json(getAllCoupon);
  } catch (err) {
    throw new Error(err);
  }
});
const createCoupon = asyncHandler(async (req, res) => {
  try {
    const createCoupon = await Coupon.create(req.body);
    res.json(createCoupon);
  } catch (err) {
    throw new Error(err);
  }
});
const updateCoupon = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updateCoupon = await Coupon.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updateCoupon);
  } catch (err) {
    throw new Error(err);
  }
});
const deleteCoupon = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const deleteCoupon = await Coupon.findByIdAndDelete(id);
    res.json(deleteCoupon);
  } catch (err) {
    throw new Error(err);
  }
});

module.exports = {
  createCoupon,
  updateCoupon,
  getCoupon,
  getAllCoupon,
  deleteCoupon,
};
