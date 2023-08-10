
// Scroll to Bottom Button

var scrollToBottomBtn = document.getElementById("scroll-to-bottom-btn");

if (scrollToBottomBtn !== null) {
  scrollToBottomBtn.addEventListener("click", function() {
  
    // Get the current scroll position
    var currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;

    // Calculate the distance to the bottom of the page
    var distanceToBottom = document.documentElement.scrollHeight - window.innerHeight - currentScrollPosition;

    // Calculate the duration of the animation based on the distance to the bottom
    var duration = Math.min(Math.max(distanceToBottom / 3, 500), 1500);

    // Scroll to the bottom of the page with a smooth animation
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
      duration: duration
    });
    scrollToBottomBtn.remove();
  });
}
//Home Return Function

const headerlogo = document.getElementById("header-logo")

headerlogo.onclick = function() {
  window.location.href='http://localhost:1337/';
}

//Sign In/Up Modal Handling

const signInButton = document.getElementById("signInButton");
const signInModal = document.getElementById("signInModal");
const closeSignIn = document.getElementById("signInClose");
const signInForm = document.getElementById("signInForm");

if(signInButton) {
signInButton.onclick = function() {
  signInModal.style.display = "block";
}
  }

  if(closeSignIn) {
closeSignIn.onclick = function() {
  signInModal.style.display = "none";
}
  }

  if(signInModal) {
window.onclick = function(event) {
  if (event.target == signInModal) {
    signInModal.style.display = "none";
  } else if (event.target == signUpModal) {
    signUpModal.style.display = "none";
  }
}
  }

//Sign Up Function

  const signUpButton = document.getElementById("waitlist");
const signUpModal = document.getElementById("signUpModal");
const closeSignUp = document.getElementById("signUpClose");
const signUpForm = document.getElementById("signUpForm");

if(signUpButton) {
  signUpButton.onclick = function() {
      signUpModal.style.display = "block";
  }
}

if(closeSignUp) {
  closeSignUp.onclick = function() {
      signUpModal.style.display = "none";
  }
}

if(signInForm) {
  signInForm.addEventListener("submit", function(event) {
      event.preventDefault(); // prevent form from submitting and showing data in URL
  });
}

if(signUpForm) {
  signUpForm.addEventListener("submit", function(event) {
      event.preventDefault(); // prevent form from submitting and showing data in URL
  });
}






