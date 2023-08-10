document.addEventListener('DOMContentLoaded', function() {
    const newPostForm = document.getElementById('newPostForm');
  

    //new post creation
    if (newPostForm) {
        newPostForm.addEventListener('submit', function(event) {
            event.preventDefault();
          
            const title = document.getElementById('title').value;
            const body = document.getElementById('body').value;
            const author = document.getElementById('author').value;
            const image = document.getElementById('image').files[0]; // Get the file from the input
          
            const formData = new FormData();
            formData.append('title', title);
            formData.append('body', body);
            formData.append('author', author);
            formData.append('image', image); // Append the file
          
            fetch('/api/post/create', {
              method: 'POST',
              body: formData
            })
            .then(response => response.json())
            .then(data => {
              if (data.id) {
                console.log(`Created post with ID ${data.id}`);
              } else if (data.error) {
                console.log(data.error);
              }
            })
            .catch(error => console.error('Error:', error));
          });
    }

    // Fetch and display posts
  fetchPosts();

  function fetchPosts() {
    fetch('/api/post')
      .then(response => response.json())
      .then(posts => displayPosts(posts))
      .catch(error => console.error('Error:', error));
  }

  function displayPosts(posts) {
    const postList = document.getElementById('postList');
    postList.innerHTML = ''; // Clear previous posts
  
    posts.forEach(post => {
      const listItem = document.createElement('li');
      const title = document.createElement('h3');
      const body = document.createElement('p');
    
      title.textContent = post.title;
      body.textContent = post.body;
    
      listItem.appendChild(title);
      listItem.appendChild(body);
    
      postList.appendChild(listItem);
    });
  }
});
  