// controllers/review.controller.js

import Review from "../models/review.js";


// =====================================
// CREATE REVIEW
// POST /reviews
// =====================================
export const createReview = async (req, res) => {
  try {

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


// =====================================
// GET REVIEWS BY PRODUCT ID
// GET /reviews/product/:productId
// =====================================
export const getReviewsByProductId = async (req, res) => {
  try {

    const { productId } = req.params;

    const reviews = await Review.find({
      productId,
      isActive: true
    })
      .sort({ createdAt: -1 });

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