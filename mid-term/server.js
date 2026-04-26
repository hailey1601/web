const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Kết nối với MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mid-term-db';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ Đã kết nối thành công tới MongoDB!'))
  .catch((error) => console.error('❌ Lỗi kết nối MongoDB:', error));

// Import routes
const apiRoutes = require('./routes/apiRoutes');

// Route cơ bản
app.get('/', (req, res) => {
  res.send('Chào mừng đến với API mid-term!');
});

// Sử dụng routes
app.use('/', apiRoutes);

// Khởi động server
app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
});
