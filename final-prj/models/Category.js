const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true, 
        trim: true  // tự động xóa khoảng trắng thừa ở đầu và cuối chuỗi văn bản trước khi lưu vào cơ sở dữ liệu
    },
    description: {
        type: String,
        default: ''
    }
}, { timestamps: true });

module.export = mongoose.model('Category', CategorySchema);