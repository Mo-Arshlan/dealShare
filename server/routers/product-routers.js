const express = require("express");
const productControllers = require("../controllers/product-controller");
const { requireSignIn, isAdmin } = require("../middlewares/auth-middleware");

// router object
const router = express.Router();

// create product
router.route('/create-product').post(requireSignIn, isAdmin,  productControllers.createProduct);

// get all Product
router.route('/get-product').get(productControllers.getAllProduct);

// update product
router.route('/update-product/:id').put(requireSignIn, isAdmin, productControllers.updateProduct);

// delete product
router.route('/delete-product/:id').delete(requireSignIn, isAdmin, productControllers.deleteProduct);

module.exports = router;