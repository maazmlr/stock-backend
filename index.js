import connection from "./db/index.js";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
dotenv.config();

const PORT = process.env.PORT || 2000;

const app = express();

app.use(cors());
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//routes

import userRouter from "./routes/user.routes.js";
import stockDataRouter from "./routes/stock.data.routes.js";
import demoAccountRouter from "./routes/demo.account.routes.js";
// routes declerationOrd

app.use("/api/v1/auth", userRouter);
app.use("/api/v1/stock-data", stockDataRouter);
app.use("/api/v1/demo", demoAccountRouter);

app._router.stack.forEach((r) => r.route && console.log(r.route.path));
connection()
  .then(
    app.listen(PORT, () => {
      console.log("server is running on porty ", PORT);
    })
  )
  .catch((err) => console.log("connection failed", err));

export default app;
