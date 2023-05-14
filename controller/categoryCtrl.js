const asyncHandler = require("express-async-handler");
const Category = require("../models/categoryModel");
const validateMongoDbId = require("../utils/validateMongodbId");

const getAllCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getAllCategory = await Category.find();
    res.json(getAllCategory);
  } catch (err) {
    throw new Error(err);
  }
});
const getACategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getACategory = await Category.findById(id);
    res.json(getACategory);
  } catch (err) {
    throw new Error(err);
  }
});
const createCategory = asyncHandler(async (req, res) => {
  try {
    const createCategory = await Category.create(req.body);
    res.json(createCategory);
  } catch (err) {
    throw new Error(err);
  }
});
const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updateCategory = await Category.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updateCategory);
  } catch (err) {
    throw new Error(err);
  }
});
const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const deleteCategory = await Category.findByIdAndDelete(id);
    res.json(deleteCategory);
  } catch (err) {
    throw new Error(err);
  }
});

module.exports = {
  getAllCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  getACategory,
};
