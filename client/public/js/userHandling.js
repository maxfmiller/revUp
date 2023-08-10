//signup submission

if(signUpForm) {
signUpForm.addEventListener('submit', function(event) {
  event.preventDefault();
  
  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  fetch('/api/user/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      firstName,
      lastName,
      email,
      password
    })
  })
  .then(response => response.json())
  .then(data => {
    if (data.message) {
      console.log(data.message);
    } else if (data.error) {
      console.log(data.error);
    }
  })
  .catch(error => console.error('Error:', error));
});
}

//login submission

const emailInput = document.getElementById('login-email');
const passwordInput = document.getElementById('login-password');

if(signInForm && emailInput && passwordInput) {
    signInForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const email = emailInput.value;
        const password = passwordInput.value;

        fetch('api/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.token) {
                console.log(data.token);
            } else if (data.error) {
                console.log(data.error);
            }
        })
        .catch(error => console.error('Error:', error));
    });
}

//user list display and functionality

window.onload = function() {
  fetchUsers();
};

function fetchUsers() {
  fetch('http://localhost:1337/api/user')
      .then(response => response.json())
      .then(users => displayUsers(users))
      .catch(error => console.error('Error:', error));
}

function displayUsers(users) {
  const userList = document.getElementById('userList');
  
  if(userList) {
    users.forEach(user => {
        console.log('Current user:', user);
        const listItem = document.createElement('li');
        const anchor = document.createElement('a');
        anchor.href = "#";
        anchor.textContent = `${user.firstName} ${user.lastName}`;
        anchor.addEventListener('click', () => {
            console.log('Signing in as user:', user);
            signInAsUser(user.ID);
        });
        listItem.appendChild(anchor);
        userList.appendChild(listItem);
    });
  }
}

function signInAsUser(userId) {
  fetch(`http://localhost:1337/api/user/${userId}`)
      .then(response => {
          if (response.ok) {
              return response.text();
              console.log(`Signing in as user with ID: ${userId}`);
          } else {
              throw new Error(`No data returned from API for user ID: ${userId}`);
          }
      })
      .then(text => {
          console.log('Raw response:', text);
          const user = JSON.parse(text);
          console.log('Parsed user:', user);
          localStorage.setItem('currentUser', JSON.stringify(user));
          console.log('Stored user:', localStorage.getItem('currentUser'));
          window.location.href = './feed';
      })
      .catch(error => console.error('Error:', error));
      console.log(`Signing in as user with ID: ${userId}`);
}

const loggedin = document.getElementById('loggedin');


//Welcome Banner

if(loggedin) {
  function logindisplay() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if(currentUser) {
      console.log('blee');
      console.log(currentUser.ID);
      loggedin.textContent = `Welcome ${currentUser.firstName} ${currentUser.lastName}`;
    } else {
      console.log('No user found in local storage');
    }
  }
  
  logindisplay();
} else {
  console.log('No element with id "loggedin" found');
}
