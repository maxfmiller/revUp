var http = require('http');
const express = require('express');
const app = express();
const path = require('path')

app.use(express.json());
//static resource fetching

app.use(express.static(path.join(__dirname, '../client/public')));



//page requests 
//take client/views out, put in root. (root: ./client/views)

app.get('/', function(req, res) {
    res.sendFile('client/views/index.html', {root: './'}) ;
});
app.get('/signup', function(req, res) {
    res.sendFile('client/views/signup.html', {root: './'}) ;
});
app.get('/feed', function(req, res) {
    res.sendFile('client/views/feed.html', {root: './'}) ;
});


console.log(__dirname)

//user Reqs

let user = require('./models/user.js')

let userController = require('./controllers/userController.js')

let userRoute = require('./routes/userRoute.js')
app.use('/api/user', userRoute);

let userService = require('./services/userService.js')

//posting Reqs

let post = require('./models/post.js')

const postController = require('./controllers/postController.js')

let postService = require('./services/postService.js')


//POST API WORK 

const postRoute = require('./routes/postRoute');
const multer  = require('multer');

// setup multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads') // './uploads' is the folder where the images will be saved.
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)) // The images will be named with the current timestamp + the original file extension
  }
})

const upload = multer({ storage: storage });
app.use('/uploads', express.static('uploads'));

// middleware for parsing JSON data in the request body
app.use(express.json());

// use the post router for handling post-related API requests
app.use('/api/post', postRoute);

// Endpoint to create post with image
app.post('/api/post/create', upload.single('image'), postController.createPost);

// start the server and listen on the specified port
const port = 1337;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});