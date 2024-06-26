//! GETTING ELEMENTS
var mainContainer = document.querySelector(".mainContainer");
var welcomeContainer = document.querySelector(".welcomeContainer");
//  SIGNUP ELEMENTS
var signUpContainer = document.querySelector(".signUpContainer");
var signUpBtn = signUpContainer.querySelector(".signUpBtn");
var showSignUp = document.querySelector(".signUp");
//  LOGIN ELEMENTS
var logInContainer = document.querySelector(".logInContainer");
var logInBtn = logInContainer.querySelector(".logInBtn");
var showLogIn = document.querySelector(".logIn");
// DISPLAY DATA ELEMENTS
var displayContainer = document.querySelector(".displayContainer");
var displayUserName = displayContainer.querySelector("#displayUserName");
var displayEmail = displayContainer.querySelector("#displayEmail");
var displayPassword = displayContainer.querySelector("#displayPassword");
var displayAddress = displayContainer.querySelector("#displayAddress");
// OTHERS
var runCodoe = true; // FLAG TO CHECK EMPTY INPUT
//!PROGRAME TO CHECK PASSWORD STATUS IN SIGNUP FORM
var capitalLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var smallLetters = "abcdefghijklmnopqrstuvwxyz";
var numbers = "0123456789";
var symbols = " !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";
var storPassword = "";
function checkPasswordStatus() {
  var newPassword = signUpContainer.querySelector("#newPassword");
  storPassword = newPassword.value;
  var smallLettersFlag = false;
  var capitalLettersFlag = false;
  var numbersFlag = false;
  var symbolsFlag = false;
  for (var i = 0; i < storPassword.length; i++) {
    char = storPassword[i];
    if (capitalLetters.includes(char)) capitalLettersFlag = true;
    if (smallLetters.includes(char)) smallLettersFlag = true;
    if (numbers.includes(char)) numbersFlag = true;
    if (symbols.includes(char)) symbolsFlag = true;
  }
  showPasswordStatus(
    capitalLettersFlag,
    smallLettersFlag,
    numbersFlag,
    symbolsFlag
  );
}
//! FUNCTION TO SHOW STRENTH OF PASSWORD IN SINGUP FORM
function showPasswordStatus(capsFlag, smallsFlag, numsFlag, symsFlag) {
  var newPassword = signUpContainer.querySelector("#newPassword");
  var strength = capsFlag + smallsFlag + numsFlag + symsFlag;
  //? conditional statements
  if (strength === 4) {
    newPassword.style.border = "2px solid green";
  } else if (strength === 3) {
    newPassword.style.border = "2px solid yellow";
  } else if (strength === 2) {
    newPassword.style.border = "2px solid orange";
  } else if (strength === 1) {
    newPassword.style.border = "2px solid red";
  } else {
    newPassword.style.border = "none";
  }
}
showPasswordStatus();
//! FUNCTION TO SIGN UP
function signUp() {
  //* INPUTS OF SIGN UP
  var inputs = signUpContainer.querySelectorAll("input");
  var signingUserName = signUpContainer.querySelector("#signingUserName");
  var signingEmail = signUpContainer.querySelector("#signingEmail");
  var newPassword = signUpContainer.querySelector("#newPassword");
  var confirmPassword = signUpContainer.querySelector("#confirmPassword");
  var signingAddress = signUpContainer.querySelector("#signingAddress");
  //* ENSURES NO INPUT FIELD IS EMPTY BEFORE PROCEEDING.
  for (var i = 0; i < inputs.length; i++) {
    if (inputs[i].value == "") {
      runCodoe = false;
    }
  }
  //* IF NO INPUT IS EMPTY CODE WILL BE EXECUTED
  if (runCodoe) {
    var signUpDataCollection =
      JSON.parse(localStorage.getItem("dataCollection")) ?? []; // COLLECTION OF USER DATA'S OBJECTS / ARRAY OF OBJECTS
    //* ENSURES THE SAME EMAIL CANNOT BE USED MORE THAN ONCE.
    for (var i = 0; i < signUpDataCollection.length; i++) {
      for (var key in signUpDataCollection[i]) {
        if (signUpDataCollection[i][key] == signingEmail.value) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "The email already exist!",
          });
          return false;
        }
      }
    }
    //* ENSURES THE NEW PASSWORD AND CONFIRM PASSWORD FEILDS MATCHS.
    if (newPassword.value != confirmPassword.value) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "password is not correct!",
      });
      return false;
    }

    //* COLLECTING DATA IN THE OBJECT
    var signUpData = {
      userName: signingUserName.value,
      email: signingEmail.value,
      userNewPassword: newPassword.value,
      userConfirmPassword: confirmPassword.value,
      userSigningAddress: signingAddress.value,
    };
    //* SENDING THE OBJECT TO THE ARRYA
    signUpDataCollection.push(signUpData);
    localStorage.setItem(
      "dataCollection",
      JSON.stringify(signUpDataCollection)
    );
    console.log(localStorage.getItem("dataCollection"));
    //* EMPTY ALL INPUTS
    inputs.forEach((val) => {
      val.value = "";
      showPasswordStatus();
    });
    //* SHOWING ALERT FOR SUCCESSFULLY SIGNING UP
    Swal.fire({
      title: "Thank You!",
      text: "You have Signed Up!",
      icon: "success",
    });
    hideSignUpForm();
  }
  //* IF ANY INUT IS EMPTY WARNING WILL BE GIVEN TO THE USER
  else {
    Swal.fire({
      icon: "warning",
      title: "sorry...",
      text: "please enter complete detail!",
    });
    runCodoe = true;
  }
}
//! FUNCTION TO ENSURE PASSWORD WILL CONTAIN MINIMUM 8 CHARACTERS
function validateLengthOfPassword() {
  var newPassword = signUpContainer.querySelector("#newPassword");
  if (newPassword.value.length < 8) {
    Swal.fire({
      icon: "warning",
      title: "sorry...",
      text: "please enter minimam 8 characters!",
    });
  }
}
//! FUNTION TO HIDE FORM AFTER SIGNING UP
function hideSignUpForm() {
  setTimeout(() => {
    showSignUpForm();
    signUpContainer.classList.add("d-none");
    welcomeContainer.classList.replace("d-none", "d-flex");
  }, 2000);
}
//! DISPLAYING SIGNUP FORM IF IT IS HIDEN & HIDING IF IT IS DISPLAYED
function showSignUpForm() {
  if (signUpContainer.classList.contains("d-none")) {
    signUpContainer.classList.replace("d-none", "d-block");
    logInContainer.classList.replace("d-block", "d-none");
    mainContainer.classList.replace("vh", "per");
    welcomeContainer.classList.add("d-none");
  } else {
    signUpContainer.classList.replace("d-block", "d-none");
    mainContainer.classList.replace("per", "vh");
  }
}

//! DISPLAYING LOGIN FORM IF IT IS HIDEN AND HIDING SIGNUP FORM & HIDING LOGIN IF IT IS DISPLAYED
function showLogInForm() {
  if (logInContainer.classList.contains("d-none")) {
    logInContainer.classList.replace("d-none", "d-block");
    signUpContainer.classList.replace("d-block", "d-none");
    displayContainer.classList.replace("d-block", "d-none");
    welcomeContainer.classList.add("d-none");
    mainContainer.classList.replace("per", "vh");
  } else {
    logInContainer.classList.replace("d-block", "d-none");
  }
}

function logIn() {
  //* LOG IN ELEMENTS
  var inputs = logInContainer.querySelectorAll("input");
  var logInEmail = logInContainer.querySelector("#logInEmail").value;
  var logInPassword = logInContainer.querySelector("#logInPassword").value;
  // var logInAddress = logInContainer.querySelector("#logInAddress").value;
  //* ENSURES NO INPUT FIELD IS EMPTY BEFORE PROCEEDING.
  for (var i = 0; i < inputs.length; i++) {
    if (inputs[i].value == "") {
      runCodoe = false;
    }
  }
  //* IF NO INPUT IS EMPTY CODE WILL BE EXECUTED
  if (runCodoe) {
    var signUpDataCollection =
      JSON.parse(localStorage.getItem("dataCollection")) ?? []; // COLLECTION OF USER DATA'S OBJECTS / ARRAY OF OBJECTS
    var emailFlag = false;
    var passwordFlag = false;

    for (var i = 0; i < signUpDataCollection.length; i++) {
      if (signUpDataCollection[i].email == logInEmail) {
        emailFlag = true;
        if (signUpDataCollection[i].userConfirmPassword == logInPassword) {
          displayUserName.value = signUpDataCollection[i].userName;
          displayEmail.value = signUpDataCollection[i].email;
          displayPassword.value = signUpDataCollection[i].userConfirmPassword;
          displayAddress.value = signUpDataCollection[i].userSigningAddress;
          passwordFlag = true;
          break;
        }
        break;
      }
    }
    if (emailFlag && passwordFlag) {
      Swal.fire({
        title: "congratulation!",
        text: "You are loged In!",
        icon: "success",
      });
      logInContainer.classList.replace("d-block", "d-none");
      displayContainer.classList.replace("d-none", "d-block");
    } else if (emailFlag && !passwordFlag) {
      Swal.fire({
        title: "sorry!",
        text: "The password is incorrect",
        icon: "error",
      });
    } else if (!emailFlag) {
      Swal.fire({
        title: "sorry!",
        text: "The user is not found",
        icon: "error",
      });
    }
    inputs.forEach((val) => {
      val.value = "";
    });
    console.log(signUpDataCollection);
  } //* IF ANY INUT IS EMPTY WARNING WILL BE GIVEN TO THE USER
  else {
    Swal.fire({
      icon: "warning",
      title: "sorry...",
      text: "please enter complete detail!",
    });
    runCodoe = true;
  }
}

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
