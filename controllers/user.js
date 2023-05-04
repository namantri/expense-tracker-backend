import { signedCookie, signedCookies } from "cookie-parser";
import errorHandler from "../middlewares/error.js";
import { User } from "../models/users.js";
import bcrypt from "bcrypt";
import { sendCookies } from "../features/cookies.js";
export const register = async (req, res, next) => {
  try {
    const { name, email, password, location } = req.body;
    let user = await User.findOne({ email });
    if (user) return next(new errorHandler("User Already Exist", 400));
    const hashedPassword = await bcrypt.hash(password, 10);
    user = await User.create({
      name,
      email,
      password:hashedPassword,
      location,
    });
    sendCookies(user, res, "Registered Successfully", 201);
  } catch (error) {
    next(error);
  }
};
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email }).select("+password");
    if (!user) return next(new errorHandler("User Does not exist", 400));
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return next(new errorHandler("Wrong Password or Email", 400));
    sendCookies(user, res, `${user.name}`, 201);
  } catch (error) {
    next(error);
  }
};
export const getUser = (req, res) => {
  console.log(req.user);
  res.status(200).json({
    success: true,
    user: req.user,
  });
};
export const logout = (req, res) => {
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
export const getAllUser = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.json({
      success: true,
      users,
    });
  } catch (error) {
    next(error);
  }
};
