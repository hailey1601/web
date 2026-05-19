const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Import middleware vừa viết
const { verifyToken, checkRole } = require('../middlewares/authMiddleware');

// Tuyến đường không cần đăng nhập
router.post('/register', authController.register);
router.post('/login', authController.login);

// Tuyến đường bí mật THỬ NGHIỆM: Chỉ Admin mới được vào xem
router.get('/admin-dashboard', verifyToken, checkRole(['admin']), (req, res) => {
  res.status(200).json({ message: 'Chào mừng Sếp Admin đã đăng nhập vào hệ thống!' });
});

module.exports = router;