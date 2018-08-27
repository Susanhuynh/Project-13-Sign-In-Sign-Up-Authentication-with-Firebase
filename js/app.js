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
    const firstname = document.getElementById("signup_txtfirst").value;
    const lastname = document.getElementById("signup_txtlast").value;
    const city = document.getElementById("signup_txtcity").value;
    const phone = document.getElementById("signup_txtphone").value;
    const postcode = document.getElementById("signup_txtpostcode").value;
    const streetaddress = document.getElementById("signup_txtstreet").value;

    data = {firstname, lastname, city, phone, postcode, streetaddress, email};
    var rootdata = firebase.database().ref().child("content/");
    rootdata.push(data);
    const promise = auth.createUserWithEmailAndPassword(email, pass);
    promise
    .catch( e => console.log(e.message));
  });

  //LOG OUT
  btnLogOut.addEventListener("click", () => {
    firebase.auth().signOut();
    mainpage.classList.add("hide");
  });

  // CHECK THE STATE AND UPDATE STATUS 
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
  });

  var btnEdit = `<button type="submit" class="btn btn-info edit">EDIT</button>`;
  var btnDelete = `<button type="submit" class="btn btn-danger deleteData">DELETE</button>`;

  //WORKING WITH TABLE - GET DATA FROM FIREBASE
  const tbody = document.querySelector("tbody");
  //   // Get content child of database
    var database = firebase.database().ref().child("content");
    database.on("child_added", function(snap){
      
      //Loop through each list in content
      var tr = document.createElement("tr");
      var id = (snap.key).toString();
      var contentRef = firebase.database().ref().child("content");
      var childTest = contentRef.child(id);
      childTest.on("value" , function(snap){
        var result = Object.keys(snap.val()).map(function(key) {
            return [key, snap.val()[key]];
      });
      for(var n = 0; n<= 6; n++){
          var td = document.createElement("td");
          td.innerHTML = result[n][1];
          tr.appendChild(td);
      };
      
      tr.id = id;
      //Append rows to the table
      tbody.appendChild(tr);
      });
    });
}());