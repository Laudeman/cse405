document.addEventListener('DOMContentLoaded', f);

function sendEmailLoginLink()
{

  var actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be whitelisted in the Firebase Console.
    url: 'https://www.example.com/finishSignUp?cartId=1234',
    // This must be true.
    handleCodeInApp: true,
    iOS: {
      bundleId: 'com.example.ios'
    },
    android: {
      packageName: 'com.example.android',
      installApp: true,
      minimumVersion: '12'
    },
    dynamicLinkDomain: 'example.page.link'
  };

  firebase.auth().sendSignInLinkToEmail(a_email, actionCodeSettings)
  .then(function() {
    window.localStorage.setItem('emailForSignIn', email);
  })
  .catch(function(error)
  {

  });
}

function f() {
  a_send_link_btn.addEventListener('click', sendEmailLoginLink);
  a_logout_btn.addEventListener('click', logout);
  a_msg.innerHTML = "loaded";
  a_logging_in.style.display = "block";

  try {
    let app = firebase.app();
    let features = ['auth', 'database', 'messaging', 'storage'].filter(feature => typeof app[feature] === 'function');
    document.getElementById('load').innerHTML = `Firebase SDK loaded with ${features.join(', ')}`;
  } catch (e) {
    console.error(e);
    document.getElementById('load').innerHTML = 'Error loading the Firebase SDK, check the console.';
  }
};
function login()
{
  const email = a_email.value;
  a_msg.innerHTML = "logged in";
  a_logging_in.style.display = "none";
  a_logged_in.style.display = "block";
}

function logout()
{
  a_msg.innerHTML = "logged out";
  a_logging_in.style.display = "block";
  a_logged_in.style.display = "none";
}

