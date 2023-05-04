import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import {
  newExpense,
  getMyExpense,
  updateTask,
  deleteTask,
} from "../controllers/expense.js";
const expenseRouter = express.Router();
expenseRouter.post("/newExpense", isAuthenticated, newExpense);
expenseRouter.get("/myExpense", isAuthenticated, getMyExpense);
expenseRouter
  .route("/:id")
  .put(isAuthenticated, updateTask)
  .delete(isAuthenticated, deleteTask);

export default expenseRouter;
