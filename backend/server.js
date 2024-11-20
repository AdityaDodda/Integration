const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const jobRoutes = require('./routes/jobRoutes.js');
const practiceRoutes = require('./routes/practiceRoutes.js');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Job & Practice Routes
app.use('/api/jobs', jobRoutes);
app.use('/api/practice',practiceRoutes);

// Connect to jobboard database
mongoose.connect('mongodb://localhost:27017/jobboard', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to jobboard MongoDB'))
  .catch((err) => console.error('Error connecting to jobboard database:', err));

// Connect to blogging database
mongoose.connect('mongodb://localhost:27017/blogging', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to blogging MongoDB'))
  .catch((err) => console.error('Error connecting to blogging database:', err));

// Blog Schema
const BlogSchema = new mongoose.Schema({
  title: String,
  sections: [
    {
      sectionTitle: String,
      sectionContent: String,
    },
  ],
  imageUrl: String,
  comments: [String],
});

const Blog = mongoose.model('Blog', BlogSchema);

// Set up Multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

// Routes
// Get all blogs
app.get('/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve blogs', details: err.message });
  }
});

// Get a specific blog
app.get('/blogs/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve blog', details: err.message });
  }
});

// Create a new blog with image upload
app.post('/blogs', upload.single('image'), async (req, res) => {
  console.log('Request Body:', req.body);
  console.log('Uploaded File:', req.file);
  try {
    const { title, sections } = req.body;
    let parsedSections = [];
    try {
      parsedSections = JSON.parse(sections);
    } catch (parseErr) {
      return res.status(400).json({ error: 'Invalid sections format. Must be a valid JSON string.' });
    }

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
app.post('/blogs/:id/comments', async (req, res) => {
  const { comment } = req.body;
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    blog.comments.push(comment);
    await blog.save();
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add comment', details: err.message });
  }
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
