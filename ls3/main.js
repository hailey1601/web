import express from 'express';
import axios from 'axios';

const app = express();
const PORT = 3000;

// API endpoint test lấy danh sách users thông qua axios gọi đến db.json (đang chạy ở port 3001)
app.get('/api/users', async (req, res) => {
  try {
    const response = await axios.get('http://localhost:3001/users');
    res.json({
      message: 'Lấy dữ liệu thành công!',
      data: response.data
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// API endpoint test lấy email theo ID của user
app.get('/api/users/:id/email', async (req, res) => {
  try {
    const userId = req.params.id;
    const response = await axios.get(`http://localhost:3001/users/${userId}`);
    
    res.json({
      message: 'Lấy email thành công!',
      email: response.data.email
    });
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return res.status(404).json({ error: 'Không tìm thấy user' });
    }
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Express server đang chạy tại http://localhost:${PORT}`);
});
