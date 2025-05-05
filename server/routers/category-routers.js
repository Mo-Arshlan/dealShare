const express = require("express");
const categoryControllers = require("../controllers/category-controller");
const { requireSignIn, isAdmin } = require("../middlewares/auth-middleware");

// router object
const router = express.Router();

// create category
router.route('/create-category').post(requireSignIn, isAdmin, categoryControllers.createCategory);

// get All Category
router.route('/get-category').get(categoryControllers.getAllCategory);

// update category
router.route('/update-category/:id').put(requireSignIn, isAdmin, categoryControllers.updateCategory);

// delete category
router.route('/delete-category/:id').delete(requireSignIn, isAdmin, categoryControllers.deleteCategory);

module.exports = router;