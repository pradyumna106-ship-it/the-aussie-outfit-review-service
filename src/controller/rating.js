// controllers/rating.controller.js

import Rating from "../models/rating.js";


// =====================================
// CREATE OR UPDATE RATING
// POST /ratings
// =====================================
export const createOrUpdateRating = async (req, res) => {
  try {

    const {
      productId,
      userId,
      rating
    } = req.body;

    let existingRating = await Rating.findOne({
      productId,
      userId
    });

    // UPDATE EXISTING RATING
    if (existingRating) {

      existingRating.rating = rating;

      await existingRating.save();

      return res.status(200).json({
        success: true,
        message: "Rating updated successfully",
        data: existingRating
      });
    }

    // CREATE NEW RATING
    const newRating = await Rating.create({
      productId,
      userId,
      rating
    });

    return res.status(201).json({
      success: true,
      message: "Rating created successfully",
      data: newRating
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// =====================================
// GET PRODUCT RATINGS
// GET /ratings/product/:productId
// =====================================
export const getRatingsByProductId = async (req, res) => {
  try {

    const { productId } = req.params;

    const ratings = await Rating.find({
      productId,
      isActive: true
    });

    // Calculate average rating
    const totalRatings = ratings.length;

    const averageRating =
      totalRatings > 0
        ? ratings.reduce(
            (sum, item) => sum + item.rating,
            0
          ) / totalRatings
        : 0;

    return res.status(200).json({
      success: true,
      totalRatings,
      averageRating: Number(
        averageRating.toFixed(1)
      ),
      data: ratings
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


// =====================================
// DELETE RATING
// DELETE /ratings/:ratingId
// =====================================
export const deleteRating = async (req, res) => {
  try {

    const { ratingId } = req.params;

    const deletedRating =
      await Rating.findByIdAndDelete(
        ratingId
      );

    if (!deletedRating) {
      return res.status(404).json({
        success: false,
        message: "Rating not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Rating deleted successfully"
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};