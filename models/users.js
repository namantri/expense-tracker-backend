import mongoose from "mongoose";
const schema = mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
    unique: true,
  },
  password: {
    required: true,
    type: String,
    select: false,
  },
  location: {
    required: true,
    type: String,
  },
  createdAt: {
    required: true,
    type: Date,
    default: Date.now,
  },
  imgSrc: {
    required: true,
    type: String,
    default: "#",
  },
});
export const User = mongoose.model("User", schema);
