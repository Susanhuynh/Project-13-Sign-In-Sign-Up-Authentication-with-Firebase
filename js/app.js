(function(){

  const config = {
    apiKey: "AIzaSyA8GgsUmREJG_hEMqmzEzcXrYr7E_oiZwc",
    authDomain: "listemail-50834.firebaseapp.com",
    databaseURL: "https://listemail-50834.firebaseio.com",
    projectId: "listemail-50834",
    storageBucket: "listemail-50834.appspot.com",
    messagingSenderId: "841096976228"
  };
  firebase.initializeApp(config);

  // Get elements for SIGN IN
  const signintxtEmail = document.getElementById("signin_txtEmail");
  const signintxtPassword = document.getElementById("signin_txtPassword");
  const btnSignIn = document.getElementById("btnSignIn");
  const changeToSU = document.getElementById("changeToSU");
  const signinform = document.getElementById("signinform");

  // Get elements for SIGN UP
  const signuptxtEmail = document.getElementById("signup_txtEmail");
  const signuptxtPassword = document.getElementById("signup_txtPassword");
  const btnSignUp = document.getElementById("btnSignUp");
  const changeToSI = document.getElementById("changeToSI");
  const signupform = document.getElementById("signupform");

    // Get elements for LOG OUT
  const btnLogOut = document.getElementById("btnLogOut");
  const mainpage = document.getElementById("mainpage");

  //CHANGE FORM 
  changeToSU.addEventListener("click", () => {
      signinform.classList.add("hide");
      signupform.classList.remove("hide");
  });

  changeToSI.addEventListener("click", () => {
    signupform.classList.add("hide");
    signinform.classList.remove("hide");
  });

  //SIGN IN
  btnSignIn.addEventListener("click", () => {
      const email = signintxtEmail.value;
      const pass = signintxtPassword.value;
      const promise = firebase.auth().signInWithEmailAndPassword(email, pass);
      promise
      .catch(e => console.log(e.message));
  });

    //SIGN UP
  btnSignUp.addEventListener("click", () => {
    const email = signuptxtEmail.value;
    const pass = signuptxtPassword.value;
    const auth = firebase.auth();

    const promise = auth.createUserWithEmailAndPassword(email, pass);
    promise
    .catch( e => console.log(e.message))
  });

  //LOG OUT
  btnLogOut.addEventListener("click", () => {
    firebase.auth().signOut();
    mainpage.classList.add("hide");
  });

  firebase.auth().onAuthStateChanged(firebaseUser => {
      if(firebaseUser){
          signintxtEmail.value = "";
          signintxtPassword.value = "";
          mainpage.classList.remove("hide");
          if(signinform.classList.contains("hide")){
            signupform.classList.add("hide");
          } else {
            signinform.classList.add("hide");
          }
      } else {
          signupform.classList.remove("hide");
      }
  })
}());