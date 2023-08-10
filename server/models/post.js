console.log("[post] initialized");

class Post {
    constructor(id, title, body, author) {
      this.id = id;
      this.title = title;
      this.body = body;
      this.author = author;
    }
  }
  
  module.exports = Post;
  