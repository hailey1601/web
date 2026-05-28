const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const { verifyToken, checkRole } = require("../middlewares/authMiddleware");

// Khóa bảo vệ: Bắt buộc đăng nhập và phải là khách hàng (customer)
router.use(verifyToken, checkRole(["customer"]));

// 1. Thêm vào giỏ hàng: POST /api/cart
router.post("/", cartController.addToCart);

// 2. Xem giỏ hàng: GET /api/cart
router.get("/", cartController.getCart);

// 3. Cập nhật số lượng: PUT /api/cart
router.put("/", cartController.updateCartQuantity);

// 4. Xóa sản phẩm khỏi giỏ: DELETE /api/cart/:itemId
router.delete("/:itemId", cartController.removeFromCart);

module.exports = router;