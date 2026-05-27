const Cart = require("../models/Cart");
const Product = require("../models/Product");

// Thêm sản phẩm vào giỏ
exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const customerId = req.user.userId;

    const product = await Product.findOne({ _id: productId, status: "active" });
    if (!product)
      return res.status(404).json({ message: "Sản phẩm không tồn tại!" });

    if (product.stock < quantity)
      return res.status(400).json({ message: "Số lượng tồn kho không đủ!" });

    let cart = await Cart.findOne({ customer: customerId });

    if (!cart) {
      cart = new Cart({ customer: customerId, items: [] });
    }

    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity, price: product.price });
    }

    await cart.save();
    res.status(200).json({ message: "Đã thêm vào giỏ hàng!", cart });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server!", error: error.message });
  }
};

// Xem giỏ hàng
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ customer: req.user.userId }).populate(
      "items.product",
      "name price image"
    );

    if (!cart) return res.status(200).json({ items: [], total: 0 });

    const total = cart.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    res.status(200).json({ cart, total });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server!", error: error.message });
  }
};

// Xóa item khỏi giỏ
exports.removeFromCart = async (req, res) => {
  try {
    const { itemId } = req.params;
    const cart = await Cart.findOne({ customer: req.user.userId });

    if (!cart) return res.status(404).json({ message: "Giỏ hàng trống!" });

    cart.items = cart.items.filter((item) => item._id.toString() !== itemId);
    await cart.save();

    res.status(200).json({ message: "Đã xóa sản phẩm khỏi giỏ hàng!", cart });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server!", error: error.message });
  }
};

// Cập nhật số lượng sản phẩm (+/-) ngay trong giỏ hàng
exports.updateCartQuantity = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const customerId = req.user.userId;

    if (quantity < 1) {
      return res
        .status(400)
        .json({ message: "Số lượng sản phẩm phải lớn hơn hoặc bằng 1!" });
    }

    // 1. Kiểm tra tồn kho của sản phẩm xem có đủ để cập nhật không
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Sản phẩm không tồn tại!" });
    }
    if (product.stock < quantity) {
      return res.status(400).json({
        message: `Số lượng tồn kho không đủ (Hiện còn: ${product.stock})!`,
      });
    }

    // 2. Tìm giỏ hàng của khách
    const cart = await Cart.findOne({ customer: customerId });
    if (!cart)
      return res.status(404).json({ message: "Không tìm thấy giỏ hàng!" });

    // 3. Tìm sản phẩm trong mảng items để cập nhật số lượng mới
    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity = quantity;
      await cart.save();
      return res.status(200).json({ message: "Đã cập nhật số lượng!", cart });
    } else {
      return res
        .status(404)
        .json({ message: "Sản phẩm không có trong giỏ hàng!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Lỗi server!", error: error.message });
  }
};
