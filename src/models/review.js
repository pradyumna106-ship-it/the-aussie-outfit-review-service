// models/review.js

import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
      index: true
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },

    title: {
      type: String,
      trim: true,
      default: null
    },

    comment: {
      type: String,
      required: true,
      trim: true
    },
    images: {
      type: [String],
      default: []
    },

    likes: {
      type: Number,
      default: 0
    },

    dislikes: {
      type: Number,
      default: 0
    },

    isVerifiedPurchase: {
      type: Boolean,
      default: false
    },

    isApproved: {
      type: Boolean,
      default: true
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true,
    collection: "reviews"
  }
);

const Review = mongoose.model(
  "Review",
  reviewSchema
);

export default Review;