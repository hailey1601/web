const Category = require("../models/Category");
const Product = require("../models/Product");

exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const categoryExists = await Category.findOne({ name });
    if (categoryExists)
      return res
        .status(400)
        .json({ message: "This category is already exist!" });
    const newCategory = new Category({ name, description });
    await newCategory.save();
    res.status(201).json({ message: "Successful create a new category!" });
  } catch (error) {
    res.status(500).json({ message: "Error serve!", error: error.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { categoryId, name, description, price, stock, image } = req.body;
    const category = await Category.findById(categoryId);
    if (!category)
      return res.status(400).json({ message: "This category is not valid." });
    const newProduct = new Product({
      store: req.user.userId,
      category: categoryId,
      name,
      description,
      price,
      stock,
      image,
    });
    await newProduct.save();
    res
      .status(201)
      .json({ message: "Successful upload product! Waiting for Admin" });
  } catch (error) {
    res.status(500).json({ message: "Error server!", error: error.message });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error server!", error: error.message });
  }
};

exports.getAllActiveProducts = async (req, res) => {
  try {
    const products = await Product.find({ status: "active" })
      .populate("store", "email")
      .populate("category", "name");
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Error server!", error: error.message });
  }
};

exports.approveProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { status: "active" },
      { new: true }
    );
    if (!updatedProduct)
      return res.status(404).json({ message: "Không tìm thấy sản phẩm này!" });
    res
      .status(200)
      .json({
        message: "Đã duyệt sản phẩm thành công!",
        product: updatedProduct,
      });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server!", error: error.message });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("store", "email")
      .populate("category", "name");
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server!", error: error.message });
  }
};
