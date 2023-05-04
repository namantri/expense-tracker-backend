import express from "express";
import {
  register,
  login,
  logout,
  getUser,
  getAllUser,
} from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";
const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/all", getAllUser);
router.get("/me", isAuthenticated, getUser);
export default router;