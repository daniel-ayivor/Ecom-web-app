const express =require("express");
const router =express.Router();

const {loginUser,registerUser, forgotPassword, userInfo, resetPassword} =require("../Controllers/authController");

router.post("/api/auth/login", loginUser);
router.post("/api/auth/register", registerUser);
router.post("/api/auth/forgot-password", forgotPassword);
router.post("/api/auth/resetpassword", resetPassword);
router.get("/api/auth/userinfo/:id", userInfo);


module.exports= router;