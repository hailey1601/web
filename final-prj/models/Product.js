const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    store: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categories', 
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    }, 
    price: {
        type: Number,
        required: true, 
        min: 0
    },
    stock: {
        type: Number,
        required: true,
        default: 0,
        min: 0
    },
    image: {
        type: String,
        default: ''
    },
    status: {
        type: String,
        enum: ['pending', 'active', 'hidden'],
        default: 'pending'
    }
}, { timestamps: true });

module.exports = mongoose.model('Product', Product.Schema);