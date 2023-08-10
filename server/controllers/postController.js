const postService = require('../services/postService');

// controller functions for handling post-related API requests
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await postService.getAllPosts();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await postService.getPostById(req.params.id);
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: `Post with ID ${req.params.id} not found.` });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createPost = async (req, res) => {
  const { title, body, author } = req.body;
  const imagePath = req.file.path; // get the path of uploaded file

  // Validate required fields
  if (!title || !body || !author || !imagePath) {
    return res.status(400).json({message: "All fields including image are required."});
  }

  try {
    const post = await postService.createPost(title, body, author, imagePath);
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.updatePost = async (req, res) => {
  const id = parseInt(req.params.id);
  const { title, body, author } = req.body;
  
  // Validate required fields
  if (!title || !body || !author) {
    return res.status(400).json({message: "All fields are required."});
  }

  try {
    const updatedPost = await postService.updatePost(id, title, body, author);
    if (updatedPost) {
      res.json({ message: "Post updated successfully.", post: updatedPost });
    } else {
      res.status(404).json({ message: `Post with ID ${id} not found.` });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const deleted = await postService.deletePost(req.params.id);
    if (deleted) {
      res.status(200).json({ message: 'Post deleted successfully.' });
    } else {
      res.status(404).json({ message: `Post with ID ${req.params.id} not found.` });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

console.log("[postController] initialized");
