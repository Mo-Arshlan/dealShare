const { default: slugify } = require("slugify");
const productModel = require("../models/productModel");

//* create product
const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      category,
      oPrice,
      dPrice,
      imageUrl,
      dealUrl,
      dealEndTime,
    } = req.body;

    if (!name) return res.status(400).send({ message: "Name is required" });

    if (!category)
      return res.status(400).send({ message: "Category is required" });

    if (!description)
      return res.status(400).send({ message: "Description is required" });

    if (!oPrice)
      return res.status(400).send({ message: "Original Price is required" });

    if (!dPrice)
      return res.status(400).send({ message: "Deal Price is required" });

    if (!imageUrl)
      return res.status(400).send({ message: "Image Url is required" });

    if (!dealUrl)
      return res.status(400).send({ message: "Deal Url is required" });

    if (dealEndTime && isNaN(Date.parse(dealEndTime))) {
      return res.status(400).send({ message: "Invalid deal end time" });
    }

    const product = new productModel({ ...req.body, slug: slugify(name) });

    await product.save();
    res.status(201).send({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in creating Product",
      error,
    });
  }
};

//* get all product
const getAllProduct = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      totalCount: products.length,
      message: "All products",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting products",
      error,
    });
  }
};

//* update product
const updateProduct = async (req, res) => {
  try {
    const {id} = req.params;
    const {
      name,
      description,
      category,
      oPrice,
      dPrice,
      imageUrl,
      dealUrl,
      dealEndTime,
    } = req.body;

    if (!name) return res.status(400).send({ message: "Name is required" });

    if (!category)
      return res.status(400).send({ message: "Category is required" });

    if (!description)
      return res.status(400).send({ message: "Description is required" });

    if (!oPrice)
      return res.status(400).send({ message: "Original Price is required" });

    if (!dPrice)
      return res.status(400).send({ message: "Deal Price is required" });

    if (!imageUrl)
      return res.status(400).send({ message: "Image Url is required" });

    if (!dealUrl)
      return res.status(400).send({ message: "Deal Url is required" });

    if (dealEndTime && isNaN(Date.parse(dealEndTime))) {
      return res.status(400).send({ message: "Invalid deal end time" });
    }

    const product = await productModel.findByIdAndUpdate(
      id,
      { ...req.body, slug: slugify(name) },
      { new: true }
    );
    await product.save();
    res.status(201).send({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in updating Product",
      error,
    });
  }
};

//* delete product
const deleteProduct = async (req, res) => {
  try {
    const {id} = req.params;
    await productModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Product deleted successfully"
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in deleting Product",
      error,
    });
  }
}

module.exports = { createProduct, getAllProduct, updateProduct, deleteProduct };
