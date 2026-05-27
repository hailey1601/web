const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const teacherRoutes = require('./routes/teacherRoutes');
const positionRoutes = require('./routes/positionRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Khai báo kết nối các Routes ứng với yêu cầu đề bài
app.use('/api/teachers', teacherRoutes);
app.use('/api/teacher-positions', positionRoutes);

// Kiểm tra trạng thái server
app.get('/', (req, res) => {
  res.send('Teacher Management System API is running...');
});

// Kết nối database
const PORT = process.env.PORT || 8080;
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('🎉 Kết nối thành công tới MongoDB Compass!');
    app.listen(PORT, () => {
      console.log(`Server đang chạy ổn định trên cổng ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Lỗi kết nối MongoDB:', err.message);
  });