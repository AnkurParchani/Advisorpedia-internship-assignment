import express from "express";
import cors from "cors";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import hpp from "hpp";
import rateLimit from "express-rate-limit";
import helmet from "helmet";

import AppError from "./utils/appError.js";
import postRoutes from "./routes/post.route.js";
import userRoutes from "./routes/user.route.js";

const app = express();

// Important packages
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// To accept JSON data from postman
app.use(express.json());

// To Implement security
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());
app.use(helmet({ contentSecurityPolicy: false }));

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "Too many request, try again after some time",
});
app.use("/", limiter);

// Using public directory
app.use(express.static("public"));

// APIs to all different routes
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("*", (req, res, next) => {
  next(new AppError(400, `Can't find ${req.originalUrl} on this server!`));
});

// Error handling middleware for appError
app.use((err, req, res, next) => {
  err.status = err.status || "fail";
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message || "Something went wrong, try again later!",
  });
});

// Sending to server.js
export default app;
