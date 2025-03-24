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

  // Deposit Money
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
      showMessage("You must repay existing loan first!", "red");
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

// register

let userEmail = localStorage.getItem("loggedInUser");
let user = JSON.parse(localStorage.getItem(userEmail));

document.getElementById("balance").innerText = user.balance;
document.getElementById("loan").innerText = user.loan;

function updateUser() {
  localStorage.setItem(userEmail, JSON.stringify(user));
  document.getElementById("balance").innerText = user.balance;
  document.getElementById("loan").innerText = user.loan;
}

document.getElementById("depositBtn").addEventListener("click", function () {
  let amount = Number(document.getElementById("amount").value);
  user.balance += amount;
  updateUser();
});

document.getElementById("loanBtn").addEventListener("click", function () {
  let amount = Number(document.getElementById("amount").value);
  user.loan += amount;
  user.balance += amount;
  updateUser();
});

document.getElementById("repayBtn").addEventListener("click", function () {
  let amount = Number(document.getElementById("amount").value);
  if (user.loan >= amount) {
    user.loan -= amount;
    user.balance -= amount;
    updateUser();
  }
});

document.getElementById("logoutBtn").addEventListener("click", function () {
  localStorage.removeItem("loggedInUser");
  window.location.href = "login.html";
});
