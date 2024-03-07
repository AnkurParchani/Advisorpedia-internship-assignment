import jwt from "jsonwebtoken";

import AppError from "../utils/appError.js";
import User from "../models/user.model.js";
import { handleServerError } from "../utils/handleServerError.js";

// For Signup request
export const signup = async (req, res, next) => {
  try {
    // Checking if the terms and conditions is checked
    if (!req.body.checkTermsAndConditions)
      return next(new AppError(400, "Please accept out terms and conditions"));

    // If both passwords do not match
    if (req.body.password !== req.body.passwordConfirm)
      return next(
        new AppError(400, "Password and Password Confirm do not match")
      );

    // Gathering all user's data
    const userData = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
    };

    const user = await User.create(userData);

    // Creating the token for the user
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.status(200).json({
      status: "success",
      token,
      user: user._id,
    });
  } catch (err) {
    // Handling for duplicate email
    if (err.code === 11000) {
      return next(new AppError(400, "Email already exists"));
    } else {
      return handleServerError(err, next);
    }
  }
};

// For login request
export const login = async (req, res, next) => {
  // If there's no email or password provided
  if (!req.body.email || !req.body.password)
    return next(new AppError(400, "Please provide both email and password"));

  // Finding the user with the provided credentials
  const user = await User.findOne({
    email: req.body.email,
  }).select("+password");

  // Checking password
  const correct =
    user && (await user.checkCredentials(req.body.password, user.password));

  //   If user is not found OR password does not match
  if (!correct) return next(new AppError(401, "Incorrect email or password"));

  //   If the user is found then making token for the logged in user
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.status(200).json({
    status: "success",
    token,
    user: user._id,
    role: user.role,
    isLoggedIn: true,
  });
};

// Checking if the user is logged in or not
export const protect = async (req, res, next) => {
  // Getting the token
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // if (!token) return next(new AppError(401, "User unauthorized"));
    if (!token) return next(new AppError(400, "Login first to continue"));

    //   Decoding the jwt token
    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);

    //   Getting the user from the decoded Id
    req.user = await User.findOne({ _id: decode.userId });

    if (!req.user)
      return next(
        new AppError(500, "We don't have your account on our database.")
      );

    next();
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      return next(new AppError(401, "Token expired, login again"));
    } else {
      return handleServerError(err, next);
    }
  }
};
