import connection from "./src/db/index.js";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
dotenv.config();

const PORT = process.env.PORT || 8000;

const app = express();

app.use(cors());
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

//routes

import userRouter from "./src/routes/user.routes.js";

// routes declerationOrd

app.use("/api/v1/auth", userRouter);


connection()
  .then(
    app.listen(PORT, () => {
      console.log("server is running on porty ", PORT);
    })
  )
  .catch((err) => console.log("connection failed", err));

export default app;
