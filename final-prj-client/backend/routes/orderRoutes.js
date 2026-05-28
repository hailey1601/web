const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const { verifyToken, checkRole } = require("../middlewares/authMiddleware");

// 1. Tạo đơn hàng (Checkout) - Bắt buộc là khách hàng (customer)
router.post(
  "/checkout",
  verifyToken,
  checkRole(["customer"]),
  orderController.checkoutOrder
);

// 2. Admin lấy TOÀN BỘ đơn hàng (Để hiển thị Dashboard) - Bắt buộc là Admin
router.get(
  "/",
  verifyToken,
  checkRole(["admin"]),
  orderController.getAllOrders
);

// 3. Admin duyệt và thay đổi trạng thái đơn hàng - Bắt buộc là Admin
router.put(
  "/:orderId/status",
  verifyToken,
  checkRole(["admin"]),
  orderController.updateOrderStatus
);

// 4. Khách hàng xem danh sách đơn hàng của họ - Bắt buộc là khách hàng (customer)
router.get(
  "/my-orders",
  verifyToken,
  checkRole(["customer"]),
  orderController.getUserOrders
);

module.exports = router;
