// routes/review.routes.js

import express from "express";

import {
  createReview,
  getReviewsByProductId,
  updateReview,
  deleteReview,
  getAllReviews
} from "../controller/review.js";

const router = express.Router();


// CREATE REVIEW
router.route("/")
  .post(createReview)
  .get(getAllReviews);

// GET REVIEWS BY PRODUCT ID
router.get("/product/:productId", getReviewsByProductId);


// UPDATE REVIEW
router.route("/:reviewId").put(updateReview).delete(deleteReview);


export default router;