import mongoose from "mongoose";
const schema = mongoose.Schema({
  user: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  expense: {
    required: true,
    type: String,
  },
  date: {
    required: true,
    type: Date,
  },
  category: {
    required: true,
    type: String,
  },
  description: {
    required: true,
    type: String,
  },
  createdAt: {
    required: true,
    type: Date,
    default: Date.now,
  },
});
export const Expense = mongoose.model("Expense", schema);
