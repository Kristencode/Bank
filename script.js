document.getElementById("btn").addEventListener("click", function () {
  // Get values from the input fields
  let Fname = document.getElementById("fName").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let cPwd = document.getElementById("cPwd").value;
  let empty = document.getElementById("empty");

  if (password !== cPwd) {
    empty.innerText = "Password does not match";
    empty.style.color = "red";
    return;
  }

  // Check if the values are not empty
  if (Fname && email && password && cPwd) {
    // Save values to localStorage
    localStorage.setItem("name", Fname);
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);
    localStorage.setItem("ConfirmPwd", cPwd);

    empty.innerText = `${Fname}  registration successful please Login`;
    empty.style.color = "Green";

    setTimeout(function () {
      window.location.replace("");
    });
  } else {
    empty.innerText = "Fill all fields";
    empty.style.color = "red";
  }
});

// login function

document.getElementById("btn").addEventListener("click", function () {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let newp = document.getElementById("Newp");

  Savedemail = localStorage.getItem("email");
  Savedpassword = localStorage.getItem("password");

  if (email === "" || password === "") {
    newp.innerText = "Email or password cant be empty!";
    newp.style.color = "red";
    return;
  }

  if (email !== Savedemail || password !== Savedpassword) {
    newp.innerText = "Email or Password doesnt exist!";
    newp.style.color = "red";
    return;
  } else {
    if (Savedemail === email && Savedpassword === password) {
      setTimeout(function () {
        window.location.replace("bank.html"), 3000;
      });
    }
  }
});

// bank logic

// TO DEPOSIT

// Deposit Functionality
