import { app } from "./app.js";
import { connectDB } from "./data/database.js";
connectDB();
app.listen(8000, (req, res) => {
  console.log(
    `Server is Working on port:${process.env.PORT} in ${process.env.NODE_ENV}`
  );
});
