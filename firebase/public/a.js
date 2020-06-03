

function sendEmailLoginLink()
{
  a_send_link_btn.disable = true;
  const email = a_email.value;
  var actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be whitelisted in the Firebase Console.
    url: location.href,
    handleCodeInApp: true
  };

  firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings)
  .then(function() {
    a_msg.innerText = "Login link sent to email."
    localStorage.setItem("email", email);
  })
  .catch(function(error)
  {
    console.log(error);

  });
}

function logout()
{
  firebase.auth().signOut()
  .then(function() {
    a_msg.innerHTML = "logged out";
    a_send_link_btn.disable = false;
    a_logging_in.style.display = "block";
    a_logged_in.style.display = "none";
  })
  .catch(function(error) {
    console.log(error);
  })
}

function loginPageLoad()
{
  let email = localStorage.getItem("email");
  if (!email) {
    email = window.prompt("Please provide your email for confirmation");
  }

  firebase.auth().signInWithEmailLink(email, location.href)
  .then(function(result) {
    localStorage.removeItem("email");
  })
  .catch(function(error) {
    console.log(error);
  })

  a_msg.innerHTML = "logged in";
  a_logging_in.style.display = "none";
  a_logged_in.style.display = "block";
  a_logout_btn.addEventListener('click', logout);
}

function loggedOutPageLoad() {
  a_msg.innerHTML = "logged out";
  a_logging_in.style.display = "block";
  a_send_link_btn.addEventListener('click', sendEmailLoginLink);
}

function loggedInPageLoad()
{
  a_msg.innerHTML = "logged in";
  a_logged_in.style.display = "block";
  a_logout_btn.addEventListener('click', logout);
}





document.addEventListener('DOMContentLoaded', f);
function f() {
  a_msg.innerHTML = "loaded";
  const auth = firebase.auth();
  if (auth.isSignInWithEmailLink(location.href)) {
    loginPageLoad();
  }
  else if (auth.currentUser === null) {
    loggedOutPageLoad();
  }
  else
  {
    loggedInPageLoad();
  }

  try {
    let app = firebase.app();
    let features = ['auth', 'database', 'messaging', 'storage'].filter(feature => typeof app[feature] === 'function');
    document.getElementById('load').innerHTML = `Firebase SDK loaded with ${features.join(', ')}`;
  } catch (e) {
    console.error(e);
    document.getElementById('load').innerHTML = 'Error loading the Firebase SDK, check the console.';
  }
};