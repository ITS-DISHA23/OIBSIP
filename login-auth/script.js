// ---------------- REGISTER ----------------
function register() {
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;

  if (email === "" || password === "") {
    alert("Please fill all fields");
    return;
  }

  const user = {
    email: email,
    password: password
  };

  localStorage.setItem("user", JSON.stringify(user));
  alert("Registration successful!");
  window.location.href = "index.html";
}

// ---------------- LOGIN ----------------
function login() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const storedUser = JSON.parse(localStorage.getItem("user"));

  if (!storedUser) {
    alert("No user found. Please register.");
    return;
  }

  if (email === storedUser.email && password === storedUser.password) {
    localStorage.setItem("loggedIn", "true");
    window.location.href = "dashboard.html";
  } else {
    alert("Invalid credentials");
  }
}

// ---------------- LOGOUT ----------------
function logout() {
  localStorage.removeItem("loggedIn");
  window.location.href = "index.html";
}

// ---------------- PROTECT DASHBOARD ----------------
if (window.location.pathname.includes("dashboard.html")) {
  const isLoggedIn = localStorage.getItem("loggedIn");
  if (!isLoggedIn) {
    window.location.href = "index.html";
  }
}
