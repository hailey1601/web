const User = require('../models/User');
const Teacher = require('../models/Teacher');

const generateUniqueTeacherCode = async () => {
  let isUnique = false;
  let code = '';
  while (!isUnique) {
    code = Math.floor(1000000000 + Math.random() * 9000000000).toString();
    const existingTeacher = await Teacher.findOne({ code });
    if (!existingTeacher) {
      isUnique = true;
    }
  }
  return code;
};

exports.createTeacher = async (req, res) => {
  try {
    const { 
      name, email, phoneNumber, address, identity, dob,
      teacherPositions, degrees, startDate, endDate, isActive 
    } = req.body;
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ message: 'Email này đã được sử dụng!' });
    }

    const newUser = new User({
      name,
      email,
      phoneNumber,
      address,
      identity,
      dob,
      role: 'TEACHER'
    });
    await newUser.save();

    const teacherCode = await generateUniqueTeacherCode();

    const newTeacher = new Teacher({
      userId: newUser._id,
      code: teacherCode,
      startDate,
      endDate,
      teacherPositions,
      degrees,
      isActive
    });
    await newTeacher.save();

    res.status(201).json({
      message: '🎉 Tạo thông tin giáo viên thành công!',
      teacher: newTeacher
    });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server!', error: error.message });
  }
};

exports.getTeachersWithPagination = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const totalTeachers = await Teacher.countDocuments({ isDeleted: false });

    const teachers = await Teacher.find({ isDeleted: false })
      .populate('userId')
      .populate('teacherPositions')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.status(200).json({
      data: teachers,
      pagination: {
        totalItems: totalTeachers,
        totalPages: Math.ceil(totalTeachers / limit),
        currentPage: page,
        limit: limit
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server!', error: error.message });
  }
};