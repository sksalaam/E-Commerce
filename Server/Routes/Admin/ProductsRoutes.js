const express = require('express');

const {handleImageUpload, deleteProduct, editProduct, fetchAllProducts, addProduct} = require("../../Controllers/Admin/ProductsController");

const {upload} = require("../../Helpers/Cloudinary");

const router = express.Router();

router.post('/upload-image', upload.single('my_file'), handleImageUpload);
router.post('/add', addProduct);
router.put('/edit/:id', editProduct);
router.delete('/delete/:id', deleteProduct); 
router.get('/get', fetchAllProducts);

module.exports = router;