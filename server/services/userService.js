const sqlite3 = require('sqlite3').verbose();
const Database = require('../db/db.js');

const db = new Database('../db/revUp.sqlite');

// Validate required fields and email format

const validateUser = (firstName, lastName, email, password) => {
    if (!firstName || !lastName || !email || !password) {
      throw new Error("All fields are required.");
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("Invalid email format.");
    }
  };

const createUser = async (firstName, lastName, email, password) => {
    try {
        validateUser(firstName, lastName, email, password);
        let result;
        await new Promise((resolve, reject) => {
            db.db.run(`INSERT INTO users (firstName, lastName, email, password) VALUES (?, ?, ?, ?)`,
                [firstName, lastName, email, password], function(err) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(this);
                    }
                });
        }).then((res) => {
            result = res;
        }).catch((err) => {
            throw new Error(`Failed to create user: ${err.message}`);
        });

        const newUser = {
            id: result.lastID,
            firstName,
            lastName,
            email,
            password
        };
        return newUser;
    } catch (error) {
        throw new Error(`Failed to create user: ${error.message}`);
    }
};

const loginUser = async (email, password) => {
    try {
        let user;
        await new Promise((resolve, reject) => {
            db.db.get(`SELECT * FROM users WHERE email = ?`, [email], function(err, row) {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        }).then((res) => {
            user = res;
        }).catch((err) => {
            throw new Error(`Failed to login: ${err.message}`);
        });

        if (user && user.password === password) {
            const {password, ...userWithoutPassword} = user;
            return userWithoutPassword;  // Return user data without password
        }
        return null;
    } catch (error) {
        throw new Error(`Failed to login: ${error.message}`);
    }
};
const getAllUsers = async () => {
    let users = [];
    await new Promise((resolve, reject) => {
        db.db.all(`SELECT * FROM users`, [], (err, rows) => {
            if (err) {
                reject(err);
            }
            resolve(rows);
        });
    }).then((rows) => {
        users = rows;
    }).catch((err) => {
        throw new Error(`Failed to get users: ${err.message}`);
    });
    return users;
};

const getUserById = async (id) => {
    let user = null;
    await new Promise((resolve, reject) => {
        db.db.get(`SELECT * FROM users WHERE id = ?`, [id], (err, row) => {
            if (err) {
                reject(err);
            }
            resolve(row);
        });
    }).then((row) => {
        user = row;
    }).catch((err) => {
        throw new Error(`Failed to get user: ${err.message}`);
    });
    return user;
};

const updateUserEmail = async (id, email) => {
    await new Promise((resolve, reject) => {
        db.db.run(`UPDATE users SET email = ? WHERE id = ?`, [email, id], function(err) {
            if (err) {
                reject(err);
            } else {
                resolve(this);
            }
        });
    }).catch((err) => {
        throw new Error(`Failed to update user email: ${err.message}`);
    });
};

const deleteUser = async (id) => {
    await new Promise((resolve, reject) => {
        db.db.run(`DELETE FROM users WHERE id = ?`, [id], function(err) {
            if (err) {
                reject(err);
            } else {
                resolve(this);
            }
        });
    }).catch((err) => {
        throw new Error(`Failed to delete user: ${err.message}`);
    });
};

const searchUserByName = async (name) => {
    let users = [];
    await new Promise((resolve, reject) => {
        db.db.all(`SELECT * FROM users WHERE LOWER(firstName || ' ' || lastName) LIKE ?`, [`%${name.toLowerCase()}%`], (err, rows) => {
            if (err) {
                reject(err);
            }
            resolve(rows);
        });
    }).then((rows) => {
        users = rows;
    }).catch((err) => {
        throw new Error(`Failed to search users: ${err.message}`);
    });
    return users;
};

const updateUser = async (id, firstName, lastName, email, password) => {
    let result;
    await new Promise((resolve, reject) => {
        db.db.run(`UPDATE users SET firstName = ?, lastName = ?, email = ?, password = ? WHERE id = ?`,
            [firstName, lastName, email, password, id], function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this);
                }
            });
    }).then((row) => {
        result = row;
    }).catch((err) => {
        throw new Error(`Failed to update user: ${err.message}`);
    });

    if (result.changes > 0) {
        const updatedUser = {
            id,
            firstName,
            lastName,
            email,
            password
        };
        return updatedUser;
    } else {
        return null;
    }
};

   

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUserEmail,
  deleteUser,
  updateUser,
  loginUser
};

console.log("[userService] initialized");
