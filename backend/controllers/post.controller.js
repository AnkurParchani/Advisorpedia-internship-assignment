import { faker } from "@faker-js/faker";
import AppError from "../utils/appError.js";
import { handleServerError } from "../utils/handleServerError.js";

// Getting all the posts
export const getPosts = (req, res, next) => {
  try {
    if (!req.params.pageId)
      return next(new AppError(400, "Provide the pageId"));

    // Generating random posts using faker js
    const posts = [];
    for (let i = 0; i < 10; i++) {
      posts.push({
        pageId: req.params.pageId,
        name: faker.person.fullName(),
        title: faker.lorem.sentence(),
        body: faker.lorem.paragraph(),
      });
    }

    res.status(200).json({ status: "success", posts });
  } catch (err) {
    return handleServerError(err, next);
  }
};
