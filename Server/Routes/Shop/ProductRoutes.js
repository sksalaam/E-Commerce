const express = require("express");

const {
  getFilteredProducts,
  getProductDetails,
} = require("../../Controllers/Shop/ProductController");

const router = express.Router();

router.get("/get", getFilteredProducts);
router.get("/get/:id", getProductDetails);

module.exports = router;