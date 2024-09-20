const express = require('express');

const {handleImageUpload} = require("../../Controllers/Admin/ProductsController");

const {upload} = require("../../Helpers/Cloudinary");

const router = express.Router();

router.post('/upload-image', upload.single('my_file'), handleImageUpload);

module.exports = router;