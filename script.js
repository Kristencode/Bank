document.addEventListener("DOMContentLoaded", function () {
  // Select elements
  let balanceElement = document.getElementById("balance");
  let loanElement = document.getElementById("loan");
  let amountInput = document.getElementById("amount");
  let errorElement = document.getElementById("error");

  let depositBtn = document.getElementById("deposit");
  let withdrawBtn = document.getElementById("withdraw");
  let takeLoanBtn = document.getElementById("take-loan");
  let repayLoanBtn = document.getElementById("repay-loan");
  let sendMoneyBtn = document.getElementById("send-money");

  // Load saved data
  let balance = parseFloat(localStorage.getItem("balance")) || 0;
  let loan = parseFloat(localStorage.getItem("loan")) || 0;
  updateUI();

  // Deposit 
  depositBtn.addEventListener("click", function () {
    let amount = getAmount();
    if (amount > 0) {
      balance += amount;
      saveData();
      updateUI();
      showMessage("Deposited $" + amount, "green");
    }
  });

  // Withdraw Money
  withdrawBtn.addEventListener("click", function () {
    let amount = getAmount();
    if (amount > 0 && amount <= balance) {
      balance -= amount;
      saveData();
      updateUI();
      showMessage("Withdrew $" + amount, "red");
    } else {
      showMessage("Insufficient balance!", "red");
    }
  });

  // Take Loan
  takeLoanBtn.addEventListener("click", function () {
    let amount = getAmount();
    if (amount > 0 && loan === 0) {
      loan += amount;
      balance += amount;
      saveData();
      updateUI();
      showMessage("Loan of $" + amount + " granted", "yellow");
    } else {
      showMessage("repay existing loan first!", "red");
    }
  });

  // Repay Loan
  repayLoanBtn.addEventListener("click", function () {
    let amount = getAmount();
    if (amount > 0 && loan > 0) {
      if (amount >= loan) {
        balance -= loan;
        loan = 0;
        showMessage("Loan fully repaid!", "green");
      } else {
        loan -= amount;
        balance -= amount;
        showMessage("Partially repaid $" + amount, "green");
      }
      saveData();
      updateUI();
    } else {
      showMessage("No loan to repay!", "red");
    }
  });

  // Send Money
  sendMoneyBtn.addEventListener("click", function () {
    let amount = getAmount();
    if (amount > 0 && amount <= balance) {
      balance -= amount;
      saveData();
      updateUI();
      showMessage("Sent $" + amount, "blue");
    } else {
      showMessage("Insufficient balance!", "red");
    }
  });

  // Helper Functions
  function getAmount() {
    let amount = parseFloat(amountInput.value);
    if (isNaN(amount) || amount <= 0) {
      showMessage("Enter a valid amount!", "red");
      return 0;
    }
    return amount;
  }

  function saveData() {
    localStorage.setItem("balance", balance);
    localStorage.setItem("loan", loan);
  }

  function updateUI() {
    balanceElement.textContent = balance.toFixed(2);
    loanElement.textContent = loan.toFixed(2);
  }

  function showMessage(msg, color) {
    errorElement.textContent = msg;
    errorElement.style.color = color;
    setTimeout(() => (errorElement.textContent = ""), 3000);
  }
});



// registration begins here
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
      window.location.replace("login.html");
    }, 3000);
  } else {
    empty.innerText = "Fill all fields";
    empty.style.color = "red";
  }
});

// // login function

document.getElementById("loginButton").addEventListener("click", function () {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let Newp = document.getElementById("Newp");

  // retriev data stored in registration
  let savedEmail = localStorage.getItem("email");
  let savedPassword = localStorage.getItem("password");

  // Check if input are empty
  if (!email || !password) {
    Newp.innerText = "Please, input email/password!";
    Newp.style.color = "red";
    return;
  }

  if (!savedEmail) {
    Newp.innerText = "Account doesn't exist!";
    Newp.style.color = "red";
    return;
  }

  if (email !== savedEmail) {
    Newp.innerText = "Account doesn't exist!";
    Newp.style.color = "red";
    return;
  }

  if (password !== savedPassword) {
    Newp.innerText = "Incorrect password!";
    Newp.style.color = "red";
    return;
  }

  Newp.innerText = "Login successful!";
  Newp.style.color = "green";

  setTimeout(function () {
    window.location.replace("bank.html");
  }, 3000);
});
