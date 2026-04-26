const express = require('express');
const router = express.Router();
const crypto = require('crypto');

const User = require('../models/User');
const Post = require('../models/Post');

// [POST] /users/register
router.post('/users/register', async (req, res) => {
    try {
        const { userName, email, password } = req.body;

        if (!userName || !email || !password) {
            return res.status(400).json({ message: "userName, email và password là bắt buộc" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email đã tồn tại trên hệ thống" });
        }

        const newUser = new User({ userName, email, password });
        await newUser.save();

        res.status(201).json({ message: "Đăng ký thành công", user: { userName, email } });
    } catch (error) {
        res.status(500).json({ message: "Lỗi hệ thống", error: error.message });
    }
});

// [POST] /users/login
router.post('/users/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email, password });
        if (!user) {
            return res.status(401).json({ message: "Email hoặc mật khẩu không chính xác" });
        }

        const randomString = crypto.randomBytes(8).toString('hex');

        const apiKey = `mern-${user._id}-${user.email}-${randomString}`;

        user.apiKey = apiKey;
        await user.save();

        res.status(200).json({
            message: "Đăng nhập thành công",
            apiKey: apiKey
        });
    } catch (error) {
        res.status(500).json({ message: "Lỗi hệ thống" });
    }
});

// [POST] /posts
router.post('/posts', async (req, res) => {
    try {
        const { apiKey } = req.query;
        const { content } = req.body;

        if (!apiKey) {
            return res.status(401).json({ message: "Vui lòng cung cấp apiKey" });
        }

        const user = await User.findOne({ apiKey });
        if (!user) {
            return res.status(403).json({ message: "apiKey không hợp lệ hoặc phiên làm việc hết hạn" });
        }

        if (!content) {
            return res.status(400).json({ message: "Nội dung bài viết (content) là bắt buộc" });
        }
        const newPost = new Post({
            userId: user._id,
            content: content,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        await newPost.save();
        res.status(201).json({ message: "Tạo bài viết thành công", post: newPost });
    } catch (error) {
        res.status(500).json({ message: "Lỗi hệ thống" });
    }
});

// [PUT] /posts/:id
router.put('/posts/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { apiKey } = req.query;
        const { content } = req.body;

        const user = await User.findOne({ apiKey });
        if (!user) {
            return res.status(403).json({ message: "Bạn không có quyền thực hiện hành động này" });
        }
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({ message: "Bài viết không tồn tại" });
        }
        if (post.userId.toString() !== user._id.toString()) {
            return res.status(403).json({ message: "Bạn không thể sửa bài viết của người khác" });
        }
        post.content = content || post.content;
        post.updatedAt = new Date();
        await post.save();

        res.status(200).json({ message: "Cập nhật thành công", post });
    } catch (error) {
        res.status(500).json({ message: "Lỗi hệ thống" });
    }
});

module.exports = router;
