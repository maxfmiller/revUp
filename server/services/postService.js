const sqlite3 = require('sqlite3').verbose();
const Database = require('../db/db.js');

const db = new Database('../db/revUp.sqlite');

// Service functions for interacting with the database

const createPost = async (title, body, author, imagePath) => {
  let result;
  await new Promise((resolve, reject) => {
    db.db.run('INSERT INTO posts (title, body, author, imagePath) VALUES (?, ?, ?, ?)', 
      [title, body, author, imagePath], function(err) {
      if (err) {
        reject(err);
      } else {
        resolve(this);
      }
    });
  }).then((res) => {
    result = res;
  }).catch((err) => {
    throw new Error(`Failed to create post: ${err.message}`);
  });

  const newPost = {
    id: result.lastID,
    title,
    body,
    author,
    imagePath
  };

  return newPost;
};

const getAllPosts = async () => {
  let posts;
  await new Promise((resolve, reject) => {
    db.db.all('SELECT * FROM posts', (err, rows) => {
      if (err) {
        reject(err);
      }
      resolve(rows);
    });
  }).then((rows) => {
    posts = rows;
  }).catch((err) => {
    throw new Error(`Failed to fetch posts: ${err.message}`);
  });

  return posts;
};

const getPostById = async (id) => {
  let post;
  await new Promise((resolve, reject) => {
    db.db.get('SELECT * FROM posts WHERE id = ?', [id], (err, row) => {
      if (err) {
        reject(err);
      }
      resolve(row);
    });
  }).then((row) => {
    post = row;
  }).catch((err) => {
    throw new Error(`Failed to fetch post: ${err.message}`);
  });

  return post;
};

const updatePost = async (id, title, body, author, imagePath) => {
  await new Promise((resolve, reject) => {
    db.db.run('UPDATE posts SET title = ?, body = ?, author = ?, imagePath = ? WHERE id = ?', 
      [title, body, author, imagePath, id], function(err) {
      if (err) {
        reject(err);
      } else {
        resolve(this);
      }
    });
  }).catch((err) => {
    throw new Error(`Failed to update post: ${err.message}`);
  });

  const updatedPost = await getPostById(id);
  return updatedPost;
};

const deletePost = async (id) => {
  await new Promise((resolve, reject) => {
    db.db.run('DELETE FROM posts WHERE id = ?', [id], function(err) {
      if (err) {
        reject(err);
      } else {
        resolve(this);
      }
    });
  }).catch((err) => {
    throw new Error(`Failed to delete post: ${err.message}`);
  });

  return true;
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost
};

console.log("[postService] initialized");

