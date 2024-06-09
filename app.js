//! GETTING ELEMENTS
var signUpContainer = document.querySelector(".signUpContainer");
var signUpBtn = signUpContainer.querySelector(".signUpBtn");
var logInContainer = document.querySelector(".logInContainer");
var logInBtn = logInContainer.querySelector(".logInBtn");
var singUpDataCollection = []; //! COLLECTION OF USER DATA'S OBJECTS / ARRAY OF OBJECTS
var capitalLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var smallLetters = "abcdefghijklmnopqrstuvwxyz";
var numbers = "0123456789";
var specialCharacters = " !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";
var runCodoe = true; //! FLAG TO CHECK EMPTY INPUT
//! FUNCTION TO SIGN UP FORM
function signUp() {
  //! INPUTS OF SIGN UP
  var inputs = signUpContainer.querySelectorAll("input");
  var signingUserName = signUpContainer.querySelector("#signingUserName");
  var signingEmail = signUpContainer.querySelector("#signingEmail");
  var newPassword = signUpContainer.querySelector("#newPassword");
  var confirmPassword = signUpContainer.querySelector("#confirmPassword");
  var signingAddress = signUpContainer.querySelector("#signingAddress");
  //! CHECKING THE IS THERE ANY EMPTY INPUT & UPDATING THE 'runCode' ACCORDING TO THE RESULT
  for (var i = 0; i < inputs.length; i++) {
    if (inputs[i].value == "") {
      runCodoe = false;
    }
  }
  //! IF NO INPUT IS EMPTY CODE WILL BE EXECUTED
  if (runCodoe) {
    //! MAKING SURE SAME EMAIL WILL NOT BE ACCEPTED
    for (var i = 0; i < singUpDataCollection.length; i++) {
      for (var key in singUpDataCollection[i]) {
        if (singUpDataCollection[i][key] == signingEmail.value) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "The email already exist!",
          });
          return false;
        }
      }
    }
    //! MAKING SURE NEW PASSWORD & CONFIRM PASSWORD BOTH ARE SMAE
    if (newPassword.value != confirmPassword.value) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "password is not correct!",
      });
      return false;
    }
    //! COLLECTING DATA IN THE OBJECT
    var signUpData = {
      userName: signingUserName.value,
      email: signingEmail.value,
      userNewPassword: newPassword.value,
      userConfirmPassword: confirmPassword.value,
      userSigningAddress: signingAddress.value,
    };
    //! SENDING THE OBJECT TO THE ARRYA
    singUpDataCollection.push(signUpData);
    //! EMPTY ALL INPUTS
    inputs.forEach((val) => {
      val.value = "";
    });
  }
  //! IF ANY INUT IS EMPTY WARNING WILL BE GIVEN TO THE USER
  else {
    Swal.fire({
      icon: "warning",
      title: "sorry...",
      text: "please enter complete detail!",
    });
    runCodoe = true;
  }
}

/*function logIn() {
  // LOG IN ELEMENTS
  var logInUserName = logInContainer.querySelector("#logInUserName");
  var logInEmail = logInContainer.querySelector("#logInEmail");
  var logInPassword = logInContainer.querySelector("#logInPassword");
  var logInAddress = logInContainer.querySelector("#logInAddress");
}*/

// *** ASSIGNMENT ***
//! 1. create a signup page
//!     1.1. perform the functionality of signup
//!         1. get the approprite data from the user
//!         2. set that data in the object
//!         3. push that object in the array
//!         4. ##condition 1##  once you are creating a new password so must check that password with the if else conditon as a name confirm password
//!         5. ## condition 2##  : If the user email exist so do not allow to set that email in another object or other values

//! 2. Login
//!     1. get the value of email and password from user
//!     2. check that value is exist in any of the object of array so user can see his/her complete details of his object in the screen
