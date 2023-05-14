const asyncHandler = require("express-async-handler");
const BlogCategory = require("../models/blogCategoryModel");
const validateMongoDbId = require("../utils/validateMongodbId");

const getAllBlogCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getAllBlogCategory = await BlogCategory.find();
    res.json(getAllBlogCategory);
  } catch (err) {
    throw new Error(err);
  }
});
const getABlogCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getABlogCategory = await BlogCategory.findById(id);
    res.json(getABlogCategory);
  } catch (err) {
    throw new Error(err);
  }
});
const createBlogCategory = asyncHandler(async (req, res) => {
  try {
    const createBlogCategory = await BlogCategory.create(req.body);
    res.json(createBlogCategory);
  } catch (err) {
    throw new Error(err);
  }
});
const updateBlogCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updateBlogCategory = await BlogCategory.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      }
    );
    res.json(updateBlogCategory);
  } catch (err) {
    throw new Error(err);
  }
});
const deleteBlogCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const deleteBlogCategory = await BlogCategory.findByIdAndDelete(id);
    res.json(deleteBlogCategory);
  } catch (err) {
    throw new Error(err);
  }
});

module.exports = {
  getAllBlogCategory,
  createBlogCategory,
  updateBlogCategory,
  deleteBlogCategory,
  getABlogCategory,
};
