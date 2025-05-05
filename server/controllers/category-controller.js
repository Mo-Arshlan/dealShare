const { default: slugify } = require("slugify");
const categoryModel = require("../models/categoryModel");

//* create category
const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({ success: false, message: "Name is required" });
    }
    // checking if category already exist
    const existingCategory = await categoryModel.findOne({ name: name });
    if (existingCategory) {
      return res.status(200).send({
        success: false,
        message: "Category Already Exists",
      });
    }

    const category = await categoryModel.create({ name, slug: slugify(name) });
    res.status(201).send({
      success: true,
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Category",
      error,
    });
  }
};

//* get All category
const getAllCategory = async (req, res) => {
  try {
    const categories = await categoryModel.find({});
    res.status(200).send({
      success: true,
      message: "All category list",
      categories,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while getting categories",
      error,
    });
  }
};

//* update category
const updateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;

    const category = await categoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Category Updated Successfully",
      category,
    });
  } catch (error) {
    res.status(500).rend({
      success: false,
      message: "Error while updating category",
      error,
    });
  }
};

//* delete category
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await categoryModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while deleting category",
      error,
    });
  }
};

//* get Single category
const getSingleCategory = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    res.status(200).send({
      success: true,
      message: "Got single category successfully",
      category,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while getting category",
      error,
    });
  }
};

module.exports = {
  createCategory,
  getAllCategory,
  updateCategory,
  deleteCategory,
  getSingleCategory
};
