const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const authMiddlreWare = asyncHandler(async (req, res, next) => {
  let token;
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
    try {
      if (token) {
        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await User.findById(decode?.id);
        req.user = user;
        next();
      }
    } catch (err) {
      throw new Error("Not Authorized, Please Login Again!");
    }
  } else {
    throw new Error("There is No token to the Header");
  }
});
const isAdmin = asyncHandler(async (req, res, next) => {
  const { email } = req.user;
  const adminUser = await User.findOne({ email });
  if (adminUser?.role?.toLowerCase() !== "admin") {
    throw new Error("You are not Admin !!");
  } else {
    next();
  }
});
module.exports = { authMiddlreWare, isAdmin };
