// routes/rating.routes.js

import express from "express";

import {
  createOrUpdateRating,
  getRatingsByProductId,
  deleteRating
} from "../controller/rating.js";

const router = express.Router();


// CREATE OR UPDATE RATING
router.post(
  "/",
  createOrUpdateRating
);


// GET PRODUCT RATINGS
router.get(
  "/product/:productId",
  getRatingsByProductId
);


// DELETE RATING
router.delete(
  "/:ratingId",
  deleteRating
);


export default router;