import express from "express";
import { loginAdmin } from "../controllers/admin.js";
import { logoutAdmin } from "../controllers/admin.js";
const adminRouter = express.Router();
adminRouter.post("/login", loginAdmin);
adminRouter.get("/logout", logoutAdmin);
export default adminRouter;
