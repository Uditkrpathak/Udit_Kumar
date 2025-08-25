import Blog from '../models/Blog.js';
import cloudinary from '../config/cloudinary.js';

export const createBlog = async(req, res) => {

    const { title, content } = req.body;
    if (!title || !content || !req.file)
        return res.status(400).json({
            error: 'Title, content and image are required',
            success: false
        });

    try {
        const uploadedImage = await cloudinary.uploader.upload(req.file.path, {
            folder: 'Blogs',
        });

        const blog = await Blog.create({
            title,
            content,
            imageURL: uploadedImage.secure_url,
            authorId: req.user._id,
        });

        res.status(201).json(blog);
    } catch {
        res.status(500).json({
            error: 'Error while creating the blog',
            success: false,
        });
    }
};

export const getAllBlogs = async(req, res) => {
    try {
        const blogs = await Blog.find().populate('authorId', 'name email').sort({ createdAt: -1 });
        res.json(blogs);
    } catch {
        res.status(500).json({
                error: 'Error fetching blogs',
                success: false,
            }

        );
    }
};

export const getBlogById = async(req, res) => {
    try {
        const blogs = await Blog.findById(req.params.id).populate('authorId', 'name email');
        if (!blogs) {
            return res.status(404).json({
                error: 'Blog not found',
                success: false,
            });
        }
        res.json(blogs);
    } catch {
        res.status(500).json({
            error: 'Server error while fetching the blog',
            success: false,
        });
    }
};