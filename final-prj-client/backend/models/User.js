const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'shop', 'customer'],
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'banned'],
    default: 'active'
  },
  // Nhúng Profile trực tiếp vào đây, tùy thuộc vào role nào thì điền thông tin đó
  customerProfile: {
    fullName: String,
    phone: String,
    address: String
  },
  storeProfile: {
    storeName: { type: String, unique: true, sparse: true }, // sparse để tránh lỗi trùng lặp khi để trống
    logo: String,
    phone: String,
    address: String
  }
}, { timestamps: true }); // Tự động tạo trường createdAt và updatedAt

module.exports = mongoose.model('User', UserSchema);