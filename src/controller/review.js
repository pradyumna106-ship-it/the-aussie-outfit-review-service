// controllers/review.controller.js

import Rating from "../models/rating.js";
import Review from "../models/review.js";
import mongoose from "mongoose"
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
    } = req.body;

    if (
      !productId ||
      !userId ||
      !title ||
      !comment
    ) {
      return res.status(400).json({
        success: false,
        message:
          "one of the required value is missing",
        data: {
          productId,
          userId,
          title,
          comment
        }
      });
    }

    const review =
      await Review.create(req.body);

    return res.status(201).json({
      success: true,
      message:
        "Review created successfully",
      data: review
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getAllReviews = async (
  req,
  res
) => {

  try {

    const reviews =
      await Review.aggregate([

        {
          $lookup: {
            from: "ratings",
            localField: "_id",
            foreignField: "reviewId",
            as: "ratings"
          }
        },

        {
          $addFields: {

            rating: {
              $ifNull: [
                {
                  $arrayElemAt: [
                    "$ratings.rating",
                    0
                  ]
                },
                0
              ]
            }
          }
        },

        {
          $project: {
            ratings: 0
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

      message: {
        error: error?.message,
        body: req?.body
      }
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
          $addFields: {

            rating: {
              $ifNull: [
                {
                  $arrayElemAt: [
                    "$ratings.rating",
                    0
                  ]
                },
                0
              ]
            }
          }
        },

        {
          $project: {
            ratings: 0
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