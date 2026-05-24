// controllers/review.controller.js

import mongoose from "mongoose";
import Rating from "../models/rating.js";
import Review from "../models/review.js";
import { getDatabaseConnection } from "../config/database.js"

// =====================================
// CREATE REVIEW
// POST /reviews
// =====================================
export const createReview = async (req, res) => {
  try {
    const {
      productId,
      userId,
      title,
      comment
    } = req.body
    const review = await Review.create(req.body);

    return res.status(201).json({
      success: true,
      message: "Review created successfully",
      data: review
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getAllReviews = async (req, res) => {

  try {
    const userDb = await getDatabaseConnection({
      name: "user-service",
      uri: process.env.MONGODB_URI+`/user-service`
    })
    const reviews = await Review.aggregate([

      {
        $lookup: {
          from: "ratings",
          localField: "_id",
          foreignField: "reviewId",
          as: "ratings"
        }
      },

      {
        $sort: {
          createdAt: -1
        }
      }

    ]);

    return res.status(200).json({

      success: true,

      count: reviews.length,

      data: reviews
    });

  } catch (error) {

    return res.status(500).json({

      success: false,

      message: error.message
    });
  }
};
// =====================================
// GET REVIEWS BY PRODUCT ID
// GET /reviews/product/:productId
// =====================================
export const getReviewsByProductId = async (req, res) => {
  try {

    const { productId } = req.params;

    const reviews = await Review.aggregate([

      {
        $match: {
          productId: new mongoose.Types.ObjectId(productId),
          isActive: true
        }
      },

      {
        $lookup: {
          from: "ratings",
          localField: "_id",
          foreignField: "reviewId",
          as: "ratings"
        }
      },

      {
        $sort: {
          createdAt: -1
        }
      }

    ]);

    return res.status(200).json({

      success: true,

      count: reviews.length,

      data: reviews
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// =====================================
// UPDATE REVIEW
// PUT /reviews/:reviewId
// =====================================
export const updateReview = async (req, res) => {
  try {

    const { reviewId } = req.params;

    const updatedReview = await Review.findByIdAndUpdate(
      reviewId,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedReview) {
      return res.status(404).json({
        success: false,
        message: "Review not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Review updated successfully",
      data: updatedReview
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// =====================================
// DELETE REVIEW
// DELETE /reviews/:reviewId
// =====================================
export const deleteReview = async (req, res) => {
  try {

    const { reviewId } = req.params;

    const deletedReview = await Review.findByIdAndDelete(
      reviewId
    );

    if (!deletedReview) {
      return res.status(404).json({
        success: false,
        message: "Review not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Review deleted successfully"
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};