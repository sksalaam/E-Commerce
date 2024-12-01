const express = require("express");

const {
  addFeatureImage,
  getFeatureImages,
  deleteFeatureImage
} = require("../../Controllers/Common/Feature-Controller");

const router = express.Router();

router.post("/add", addFeatureImage);
router.get("/get", getFeatureImages);

router.delete("/delete/:id", deleteFeatureImage);

module.exports = router;