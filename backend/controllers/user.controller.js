import User from "../models/user.model.js";
import AppError from "../utils/appError.js";
import { handleServerError } from "../utils/handleServerError.js";

// Getting the currently logged in user
export const getUser = async (req, res, next) => {
  if (!req.user) return next(new AppError(400, "You are not logged in"));

  res.status(200).json({ status: "success", user: req.user });
};
