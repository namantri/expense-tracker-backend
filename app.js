import cookieParser from "cookie-parser";
import express from "express";
import { config } from "dotenv";
import { errorMiddleware } from "./middlewares/error.js";
import router from "./routes/users.js";
import expenseRouter from "./routes/expenses.js";
import cors from "cors";
import adminRouter from "./routes/admin.js";
export const app = express();
config({
  path: "./data/config.env",
});
app.use(express.json());
app.use(cookieParser());
// To use api in frontend
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);
app.use("/api/v1/users", router);
app.use("/api/v1/expense", expenseRouter);
app.use("/api/v1/admin", adminRouter);
app.use(errorMiddleware);
