import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import {
  newExpense,
  getMyExpense,
  updateTask,
  deleteTask,
  allExpense,
} from "../controllers/expense.js";
import { isAdminAuthenticated } from "../middlewares/adminauth.js";
const expenseRouter = express.Router();
expenseRouter.post("/newExpense", isAuthenticated, newExpense);
expenseRouter.get("/allExpense", isAdminAuthenticated, allExpense);
expenseRouter.get("/myExpense", isAuthenticated, getMyExpense);
expenseRouter
  .route("/:id")
  .put(isAuthenticated, updateTask)
  .delete(isAuthenticated, deleteTask);

export default expenseRouter;
