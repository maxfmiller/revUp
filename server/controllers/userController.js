const userService = require('../services/userService');

console.log("[userController] initialized");

exports.loginUser = async (req, res) => {
  try {
    const user = await userService.loginUser(req.body.email, req.body.password);
    if (user) {
      res.status(200).json({ message: "Logged in successfully", user: user });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const newUser = await userService.createUser(req.body.firstName, req.body.lastName, req.body.email, req.body.password);
    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateUserEmail = async (req, res) => {
  try {
    await userService.updateUserEmail(req.params.id, req.body.email);
    res.status(200).json({ message: `Email updated for user with ID ${req.params.id}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await userService.deleteUser(req.params.id);
    res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.searchUserByName = async (req, res) => {
  try {
    const users = await userService.searchUserByName(req.params.name);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// update a user
exports.updateUser = async (req, res) => {
  const id = parseInt(req.params.id);
  const { firstName, lastName, email, password } = req.body;
  
  // Validate required fields
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({message: "All fields are required."});
  }
  
  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({message: "Invalid email format."});
  }

  try {
    const updatedUser = await userService.updateUser(id, firstName, lastName, email, password);
    if (updatedUser) {
      res.json({ message: "User updated successfully.", user: updatedUser });
    } else {
      res.status(404).json({ message: `User with ID ${id} not found.` });
    }
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};
