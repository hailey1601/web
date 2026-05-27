const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

// Thực hiện đặt hàng và thanh toán (Checkout)
exports.checkoutOrder = async (req, res) => {
  try {
    const customerId = req.user.userId;

    // 1. Tìm giỏ hàng hiện tại của khách
    const cart = await Cart.findOne({ customer: customerId }).populate(
      "items.product"
    );
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        message: "Giỏ hàng của bạn đang trống, không thể thanh toán!",
      });
    }

    let totalAmount = 0;
    const orderItems = [];

    // 2. Vòng lặp kiểm tra kho và chuẩn bị dữ liệu đơn hàng
    for (const item of cart.items) {
      const product = item.product;

      if (!product || product.status !== "active") {
        return res
          .status(404)
          .json({ message: `Sản phẩm ${product?.name || ""} đã ngừng bán!` });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `Sản phẩm ${product.name} không đủ số lượng trong kho! (Còn lại: ${product.stock})`,
        });
      }

      // Tính tổng tiền cộng dồn
      totalAmount += product.price * item.quantity;

      // Đẩy vào mảng lưu trữ đơn hàng (Sửa lại trường priceAtPurchase cho khớp với Model Order của bạn)
      orderItems.push({
        product: product._id,
        quantity: item.quantity,
        priceAtPurchase: product.price,
      });
    }

    // ============================================================
    // 💡 BƯỚC 3: SỬA ĐOẠN NÀY ĐỂ TRỪ KHO CHẮC CHẮN CHẠY TỰ ĐỘNG
    // ============================================================
    for (const item of cart.items) {
      // Ép chuỗi ID rõ ràng để MongoDB tìm chính xác đối tượng sản phẩm
      const productIdString = item.product._id.toString();
      const quantityPurchased = item.quantity;

      console.log(
        `🔄 Đang tiến hành trừ kho sản phẩm: ${item.product.name} | Số lượng mua: ${quantityPurchased}`
      );

      // Thực hiện trừ số lượng tồn kho và đợi xử lý xong xuôi (await) bằng phương thức $inc
      await Product.findByIdAndUpdate(
        productIdString,
        {
          $inc: { stock: -quantityPurchased }, // Dấu trừ (-) để tự động giảm số lượng trong DB
        },
        { new: true } // Đảm bảo cập nhật xong mới chuyển sang vòng lặp kế tiếp
      );
    }

    // 4. Khởi tạo đơn hàng mới vào cơ sở dữ liệu (Đồng bộ totalAmount cho khớp Model)
    const newOrder = new Order({
      customer: customerId,
      items: orderItems,
      totalAmount: totalAmount, // Đồng bộ tên trường dữ liệu tổng tiền theo đúng Model Order.js
      shippingAddress:
        req.body.shippingAddress || "Địa chỉ nhận hàng mặc định của khách",
    });
    await newOrder.save();

    // 5. Làm trống giỏ hàng sau khi đặt thành công
    cart.items = [];
    await cart.save();

    res.status(201).json({
      message:
        "🎉 Đặt hàng công nghệ thành công! Đơn hàng của bạn đang chờ xử lý.",
      order: newOrder,
    });
  } catch (error) {
    console.error("Lỗi Checkout chi tiết:", error); // Log ra console để dễ nhìn nếu có lỗi phát sinh
    res
      .status(500)
      .json({ message: "Lỗi server khi thanh toán!", error: error.message });
  }
};

// Lấy danh sách đơn hàng của khách hàng hiện tại
exports.getUserOrders = async (req, res) => {
  try {
    const customerId = req.user.userId;
    const orders = await Order.find({ customer: customerId })
      .populate("items.product", "name price image")
      .sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({
      message: "Lỗi server khi lấy danh sách đơn hàng!",
      error: error.message,
    });
  }
};

// 1. Lấy TOÀN BỘ đơn hàng trên hệ thống (Dành cho Admin hoặc Vendor quản lý)
exports.getAllOrders = async (req, res) => {
  try {
    // Nếu là Admin thì xem được hết, nếu sau này phân quyền Vendor thì chỉ xem đơn của Shop đó
    const orders = await Order.find()
      .populate("customer", "name email") // Lấy thêm thông tin người mua
      .populate("items.product", "name price image")
      .sort({ createdAt: -1 });

    const formattedOrders = orders.map(o => {
      const obj = o.toObject();
      obj.totalAmount = obj.totalPrice; // Đảm bảo khớp với trường totalAmount mà AdminDashboard.js đang render
      return obj;
    });

    res.status(200).json(formattedOrders);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Lỗi khi lấy danh sách đơn hàng tổng!",
        error: error.message,
      });
  }
};

// 2. Thay đổi trạng thái đơn hàng (Duyệt đơn: pending -> confirmed -> shipping...)
exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body; // Chuỗi trạng thái mới truyền lên: 'confirmed', 'shipping', 'delivered', hoặc 'cancelled'

    // Kiểm tra xem trạng thái truyền lên có hợp lệ với mảng enum trong Model không
    const validStatuses = [
      "pending",
      "confirmed",
      "shipping",
      "delivered",
      "cancelled",
    ];
    if (!validStatuses.includes(status)) {
      return res
        .status(400)
        .json({ message: "Trạng thái đơn hàng không hợp lệ!" });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status: status },
      { new: true }
    ).populate("customer", "name email");

    if (!updatedOrder) {
      return res
        .status(404)
        .json({ message: "Không tìm thấy đơn hàng để cập nhật!" });
    }

    res.status(200).json({
      message: `🎯 Đã chuyển trạng thái đơn hàng sang: ${status}`,
      order: updatedOrder,
    });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Lỗi khi cập nhật trạng thái đơn hàng!",
        error: error.message,
      });
  }
};
