import { get } from "mongoose";
import { Expense } from "../models/expense.js";
import errorHandler from "../middlewares/error.js";
export const newExpense = async (req, res, next) => {
  try {
    const { expense, date, category, description } = req.body;
    await Expense.create({
      user: req.user,
      expense,
      date,
      category,
      description,
    });
    res.status(201).json({
      success: true,
      message: "Expense Data Added Successfully",
    });
  } catch (error) {
    next(error);
  }
};
export const getMyExpense = async (req, res, next) => {
  try {
    const userid = req.user._id;
    const getExpense = await Expense.find({ user: userid });
    res.status(200).json({
      success: true,
      userExpense: getExpense,
    });
  } catch (error) {
    next(error);
  }
};
export const updateTask = async (req, res, next) => {
  try {
    const { expense, date, category, description } = req.body;
    const updateExpense = await Expense.findById(req.params.id);
    if (!updateExpense)
      return next(new errorHandler("Expense Does not Exist", 404));
    const update = await Expense.findByIdAndUpdate(
      req.params.id,
      {
        expense,
        date,
        category,
        description,
      },
      { new: true }
    );
    res.status(201).json({
      success: true,
      message: "Expense Data Updated Successfully",
    });
  } catch (error) {
    next(error);
  }
};
export const deleteTask = async (req, res, next) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) return next(new errorHandler("Expense Does not Exist", 404));
    await expense.deleteOne();
    res.status({
      success: true,
      message: "Expense Deleted Successfully",
    });
  } catch (error) {
    next(error);
  }
};
