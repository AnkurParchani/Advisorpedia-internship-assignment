import AppError from "./appError.js";

// For any kind of server side error
export const handleServerError = (err, next) => {
  console.error(err);
  return next(
    new AppError(500, "Something went wrong, please try again later!")
  );
};
