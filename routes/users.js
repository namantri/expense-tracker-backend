import express from "express";
import {
  register,
  login,
  logout,
  getUser,
  getAllUser,
  postImage,
} from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { isAdminAuthenticated } from "../middlewares/adminauth.js";
const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/all", isAdminAuthenticated, getAllUser);
router.get("/me", isAuthenticated, getUser);
router.put("/addImage", isAuthenticated, postImage);
export default router;
