const express = require("express");
const {
  createUser,
  loginUserCtrl,
  getAllUsers,
  getUser,
  deletegetUser,
  updateUser,
  blockUser,
  unBlockUser,
  handleRefreshToken,
  logout,
  updatePassword,
  forgotPasswordToken,
  resetPassword,
  loginAdminUserCtrl,
} = require("../controller/userCtrl");
const { authMiddlreWare, isAdmin } = require("../middlewares/authMiddleWare");
const router = express.Router();

// router.post("/register", registerUser);
router.put("/updatePassword", authMiddlreWare, updatePassword);
router.post("/forgotPasswordToken", authMiddlreWare, forgotPasswordToken);
router.put("/resetPassword/:token", authMiddlreWare, resetPassword);
router.get("/refresh", handleRefreshToken);
router.get("/logout", logout);
router.post("/register", createUser);
router.post("/login", loginUserCtrl);
router.post("/admin-login", loginAdminUserCtrl);
router.get("/allusers", getAllUsers);
router.get("/:id", authMiddlreWare, isAdmin, getUser);
router.delete("/:id", deletegetUser);
// router.put("/:id", authMiddlreWare, updateUser);
router.put("/edit-user", authMiddlreWare, updateUser);
router.put("/block-user/:id", authMiddlreWare, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddlreWare, isAdmin, unBlockUser);
module.exports = router;
