// const express = require("express");
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./database/conn.js";
import authRouter from "./routes/authRouter.js";
import jobRouter from "./routes/jobRouter.js";
import errorMiddleware from "./middleware/errorMiddleware.js";

const app = express();

dotenv.config();

// Middleware
app.use(express.json());
app.use(cors());
app.use("/api", authRouter);
app.use("/api", jobRouter);

app.use(errorMiddleware);

// MongoDB Connection
connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is listening on PORT: ${PORT}`);
});
