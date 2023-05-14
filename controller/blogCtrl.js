const Blog = require("../models/blogModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");
const { loginUserCtrl } = require("./userCtrl");

const getBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getblog = await Blog.findById(id)
      .populate("likes")
      .populate("dislikes");
    const updatedVIews = await Blog.findByIdAndUpdate(
      id,
      {
        $inc: { numViews: 1 },
      },
      {
        new: true,
      }
    );
    res.json(getblog);
  } catch (err) {
    throw new Error(err);
  }
});
const getAllBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const getAllBlog = await Blog.find();
    res.json(getAllBlog);
  } catch (err) {
    throw new Error(err);
  }
});
const createBlog = asyncHandler(async (req, res) => {
  try {
    const createBlog = await Blog.create(req.body);
    res.json(createBlog);
  } catch (err) {
    throw new Error(err);
  }
});
const updateBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updateBlog = await Blog.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updateBlog);
  } catch (err) {
    throw new Error(err);
  }
});
const deleteBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    const deleteBlog = await Blog.findByIdAndDelete(id);
    res.json(deleteBlog);
  } catch (err) {
    throw new Error(err);
  }
});
const dislikedBlog = asyncHandler(async (req, res) => {
  // const { id } = req.params;
  const { blogId } = req.body;
  validateMongoDbId(blogId);

  try {
    //find blog to be liked
    const blog = await Blog.findById(blogId);
    //check if logged in user?
    const isLoggedInUserId = req?.user?._id;
    //check if user already liked post?
    const isDisLiked = blog?.isDisliked;
    //check if user already disliked post?
    const alreadyliked = blog?.likes?.find(
      (userID) => userID?.toString() === isLoggedInUserId?.toString()
    );
    if (alreadyliked) {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $pull: { likes: isLoggedInUserId },
          isLiked: false,
        },
        { new: true }
      );
      res.json(blog);
    }
    if (isDisLiked) {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $pull: { dislikes: isLoggedInUserId },
          isDisliked: false,
        },
        { new: true }
      );
      res.json(blog);
    } else {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $push: { dislikes: isLoggedInUserId },
          isDisliked: true,
        },
        { new: true }
      );
      res.json(blog);
    }
  } catch (err) {
    throw new Error(err);
  }
});
const likeBlog = asyncHandler(async (req, res) => {
  // const { id } = req.params;
  const { blogId } = req.body;
  validateMongoDbId(blogId);

  try {
    //find blog to be liked
    const blog = await Blog.findById(blogId);
    //check if logged in user?
    const isLoggedInUserId = req?.user?._id;
    //check if user already liked post?
    const isLiked = blog?.isLiked;
    //check if user already disliked post?
    const isDisLiked = blog?.dislikes?.find(
      (userID) => userID?.toString() === isLoggedInUserId?.toString()
    );
    if (isDisLiked) {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $pull: { dislikes: isLoggedInUserId },
          isDisLiked: false,
        },
        { new: true }
      );
      res.json(blog);
    }
    if (isLiked) {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $pull: { likes: isLoggedInUserId },
          isLiked: false,
        },
        { new: true }
      );
      res.json(blog);
    } else {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $push: { likes: isLoggedInUserId },
          isLiked: true,
        },
        { new: true }
      );
      res.json(blog);
    }
  } catch (err) {
    throw new Error(err);
  }
});
module.exports = {
  createBlog,
  updateBlog,
  getBlog,
  getAllBlog,
  deleteBlog,
  likeBlog,
  dislikedBlog,
};
