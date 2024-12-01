const express = require("express");

const { searchProducts } = require("../../Controllers/Shop/Search-Controller");

const router = express.Router();

router.get("/:keyword", searchProducts);

module.exports = router;