import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import listingRouter from "./routes/listing.route.js";
import uploadImagesRoute from "./routes/upload-images.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import "./utils/cloudinary.js";

const app = express();

// ------------------------
// DATABASE CONNECTION
// ------------------------
mongoose
  .connect(process.env.MONGO)
  .then(() => console.log("Connected to MongoDB!"))
  .catch((err) => console.log(err));

// ------------------------
// CORS FOR FRONTEND
// ------------------------
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// ------------------------
// UTILS & MIDDLEWARES
// ------------------------
app.use(express.json());
app.use(cookieParser());

// Debug log
app.use((req, res, next) => {
  console.log("🔥 Incoming request:", req.method, req.url);
  next();
});

// ------------------------
// ROUTES
// ------------------------
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);
app.use("/api/upload-images", uploadImagesRoute);

// ------------------------
// SERVE CLIENT
// ------------------------
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

// ------------------------
// ERROR HANDLER
// ------------------------
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// ------------------------
// START SERVER
// ------------------------
app.listen(3000, () => console.log("Server running on port 3000!"));
