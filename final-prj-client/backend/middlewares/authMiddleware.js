const jwt = require('jsonwebtoken');

// 1. Middleware kiểm tra xem người dùng đã đăng nhập chưa (Token có hợp lệ không)
const verifyToken = (req, res, next) => {
  // Lấy token từ header "Authorization" (Dạng: Bearer <token>)
  const authHeader = req.header('Authorization');
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Truy cập bị từ chối, bạn cần đăng nhập trước!' });
  }

  try {
    // Giải mã token bằng chuỗi bí mật trong .env
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // Lưu thông tin giải mã (userId, role) vào req để các hàm sau sử dụng
    next(); // Cho phép đi tiếp vào hàm xử lý chính
  } catch (error) {
    res.status(403).json({ message: 'Token không hợp lệ hoặc đã hết hạn!' });
  }
};

// 2. Middleware kiểm tra phân quyền theo vai trò (Role)
const checkRole = (rolesAllowed) => {
  return (req, res, next) => {
    // req.user được lấy từ middleware verifyToken ở trên
    if (!rolesAllowed.includes(req.user.role)) {
      return res.status(403).json({ message: 'Bạn không có quyền thực hiện hành động này!' });
    }
    next();
  };
};

module.exports = { verifyToken, checkRole };