const TeacherPosition = require('../models/TeacherPosition');

// 1.5 Tạo mới thông tin vị trí công tác (1đ)
exports.createPosition = async (req, res) => {
  try {
    const { name, code, des, isActive } = req.body;

    // Kiểm tra xem code đã tồn tại chưa (yêu cầu duy nhất)
    const positionExists = await TeacherPosition.findOne({ code });
    if (positionExists) {
      return res.status(400).json({ message: 'Mã vị trí công tác này đã tồn tại!' });
    }

    const newPosition = new TeacherPosition({ name, code, des, isActive });
    await newPosition.save();

    res.status(201).json({
      message: '🎉 Tạo vị trí công tác thành công!',
      position: newPosition
    });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server!', error: error.message });
  }
};

exports.getAllPositions = async (req, res) => {
  try {
    const positions = await TeacherPosition.find({ isDeleted: false });
    res.status(200).json(positions);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server!', error: error.message });
  }
};