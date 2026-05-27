const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
  try {
    const { email, password, role, fullName, storeName, phone, address } =
      req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    if (!["customer", "shop", "admin"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let newUserParams = {
      email,
      password: hashedPassword,
      role,
    };

    if (role === "customer") {
      newUserParams.customerProfile = {
        fullName: fullName || "New member",
        phone: phone || "Not provided",
        address: address || "Not provided",
      };
    } else if (role === "shop") {
      if (!storeName) {
        return res.status(400).json({
          success: false,
          message: "Store name is required",
        });
      }
      newUserParams.storeProfile = {
        storeName,
        logo: "",
        phone: phone || "Not provided",
        address: address || "Not provided",
      };
    }

    const newUser = new User(newUserParams);
    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const jwt = require("jsonwebtoken");

// Hàm xử lý Đăng nhập
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Kiểm tra xem user có tồn tại không
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Email hoặc mật khẩu không chính xác!" });
    }

    // 2. Kiểm tra xem tài khoản có đang bị khóa (banned) không
    if (user.status === "banned") {
      return res
        .status(403)
        .json({ message: "Tài khoản của bạn đã bị khóa bởi Admin!" });
    }

    // 3. Kiểm tra mật khẩu
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Email hoặc mật khẩu không chính xác!" });
    }

    // 4. Tạo mã JWT Token
    // Mã này sẽ hết hạn sau 30 ngày (30d)
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '30d' } 
    );

    // 5. Trả về kết quả cho client
    res.status(200).json({
      message: "🎉 Đăng nhập thành công!",
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        profile:
          user.role === "customer" ? user.customerProfile : user.storeProfile,
      },
    });
  } catch (error) {
    console.error("Lỗi đăng nhập:", error);
    res.status(500).json({ message: "Lỗi server hệ thống!" });
  }
};
