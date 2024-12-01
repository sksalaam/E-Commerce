const express = require("express");

const {
  addFeatureImage,
  getFeatureImages,
} = require("../../Controllers/Common/Feature-Controller");

const router = express.Router();

router.post("/add", addFeatureImage);
router.get("/get", getFeatureImages);

module.exports = router;