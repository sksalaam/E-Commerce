const express = require("express");

const {
  addProductReview,
  getProductReviews,
} = require("../../Controllers/Shop/Review-Controller");

const router = express.Router();

router.post("/add", addProductReview);
router.get("/:productId", getProductReviews);

module.exports = router;