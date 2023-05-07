import errorHandler from "../middlewares/error.js";
import { Admin } from "../models/admin.js";
import bcrypt from 'bcrypt'
import { sendCookies } from "../features/cookies.js";
export const loginAdmin = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      let user = await Admin.findOne({ email }).select("+password");
      if (!user) return next(new errorHandler("User Does not exist", 400));
      const isMatch = user.password==password;
      if (!isMatch) return next(new errorHandler("Wrong Password or Email", 400));
      sendCookies(user, res, `${user.name}`, 201);
    } catch (error) {
      next(error);
    }
  };
  export const logoutAdmin = (req, res) => {
    res
      .status(200)
      .cookie("token", "", {
        expires: new Date(Date.now()),
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Development" ? false : true,
      })
      .json({
        success: true,
        user: req.user,
      });
  };