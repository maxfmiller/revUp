const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const multer = require('multer');
const upload = multer({ dest: './uploads' }); 

// define routes for post-related API requests
router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);
router.post('/create', upload.single('image'), (req, res, next) => {
    console.log(req.body);
    console.log(req.file);
    next();
}, postController.createPost);
router.post('/create', upload.single('image'), postController.createPost);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);

module.exports = router;
console.log("[postRoute] initialized");