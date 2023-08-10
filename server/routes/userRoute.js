const userController = require('../controllers/userController');
console.log("[userRoute] initialized");

var express = require('express');
const router = express.Router();

router.get('', userController.getAllUsers); // Route to get all users
router.get('/:id', userController.getUser); // Route to get a single user by ID
router.post('/signup', userController.createUser); // Route to create a new user
router.post('/login', userController.loginUser); // Route to login a user
router.put('/:id', userController.updateUser); // Route to update an existing user by ID
router.delete('/:id', userController.deleteUser); // Route to delete existing user by ID
router.get('/:name', userController.searchUserByName); // route to search user by full name
router.patch('/:id/email', userController.updateUserEmail); // route to update user email

module.exports = router;
