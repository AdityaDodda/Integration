const express = require('express');
const multer = require('multer');
const router = express.Router();
const Blog = require('../models/Blog');

// Set up multer for image uploads (define here)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads'); // Save to 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Generate a unique filename
  },
});

const upload = multer({ storage: storage });

// Get all blogs
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch blogs' });
  }
});

// Get a specific blog
router.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch blog' });
  }
});

// Create a new blog with image upload
router.post('/', upload.single('image'), async (req, res) => {
  console.log('Request Body:', req.body);
  console.log('Uploaded File:', req.file);
  try {
    const { title, sections } = req.body;
    const parsedSections = JSON.parse(sections);
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const blog = new Blog({
      title,
      sections: parsedSections,
      imageUrl,
      comments: [],
    });

    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    console.error('Error creating blog:', err.message);
    res.status(500).json({ error: 'Failed to create blog', details: err.message });
  }
});

// Add a comment to a blog
router.post('/:id/comments', async (req, res) => {
  const { comment } = req.body;
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    blog.comments.push(comment);
    await blog.save();
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add comment' });
  }
});

module.exports = router;