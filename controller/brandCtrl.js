const asyncHandler = require("express-async-handler");
const Brand = require("../models/brandModel");
const validateMongoDbId = require("../utils/validateMongodbId");

const getAllBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getAllBrand = await Brand.find();
    res.json(getAllBrand);
  } catch (err) {
    throw new Error(err);
  }
});
const getABrand = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getABrand = await Brand.findById(id);
    res.json(getABrand);
  } catch (err) {
    throw new Error(err);
  }
});
const createBrand = asyncHandler(async (req, res) => {
  try {
    const createBrand = await Brand.create(req.body);
    res.json(createBrand);
  } catch (err) {
    throw new Error(err);
  }
});
const updateBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updateBrand = await Brand.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updateBrand);
  } catch (err) {
    throw new Error(err);
  }
});
const deleteBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const deleteBrand = await Brand.findByIdAndDelete(id);
    res.json(deleteBrand);
  } catch (err) {
    throw new Error(err);
  }
});

module.exports = {
  getAllBrand,
  createBrand,
  updateBrand,
  deleteBrand,
  getABrand,
};
