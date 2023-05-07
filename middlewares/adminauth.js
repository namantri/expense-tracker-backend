import { Admin } from "../models/admin.js";
import jwt from "jsonwebtoken";
import errorHandler from "./error.js";

export const isAdminAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(404).json({
      success: false,
      message: "Invalid Access",
    });
  }
  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await Admin.findById(decodedData._id);
  if (!req.user) return next(new errorHandler("Not a Admin", 400));
  next();
};
