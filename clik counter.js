let saveEl = document.getElementById("save-el")
let countEl = document.getElementById("Ecrant")


let count = 0
let savedRounds = []

function clickment() {
    count += 1
    countEl.textContent = count

}


function save() {
    if (count > 0) savedRounds.push(count)
    saveEl.textContent = "Tours: " + savedRounds.join(" - ")
    count = 0
    countEl.innerText = 0

}

const refreshBtn = document.getElementById("refresh-btn");

function handleClick() {
    count = 0;
    countEl.textContent = 0;
    savedRounds = [];
    saveEl.textContent = "Tours:";
}

// The same as onclick = "function()" on html
//refreshBtn.addEventListener("click", handleClick);

const video = document.getElementById('cameraFeed');
const cameraNav = document.querySelector('nav');

async function openCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
    await video.play().catch(() => {});
    cameraNav.classList.add('show');
  } catch (error) {
    alert('Camera access denied or not available!');
    console.error(error);
  }
}

/* ── Login: save to localStorage + custom greeting popup ── */

const loginForm = document.getElementById("login-form");
const usernameInput = document.getElementById("usrname");
const passwordInput = document.getElementById("psw");

const loginModal = document.getElementById("login-modal");
const loginClose = document.getElementById("login-close");
const loginSkip = document.getElementById("login-skip");

const greetingModal = document.getElementById("greeting-modal");
const greetingText = document.getElementById("greeting-text");
const greetingClose = document.getElementById("modal-close");
const greetingBtn = document.getElementById("modal-btn");

function escapeHTML(value) {
  return value.replace(/[&<>"']/g, function (char) {
    return {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }[char];
  });
}

function openModal(modal) {
  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
}

function closeModal(modal) {
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
}

function openLogin() {
  openModal(loginModal);
}

function closeLogin() {
  closeModal(loginModal);
}

function openGreeting(name) {
  greetingText.innerHTML = "Welcome, <strong>" + escapeHTML(name) + "</strong>! Ready to kick some serious rounds today?";
  openModal(greetingModal);
}

function closeGreeting() {
  closeModal(greetingModal);
}

loginForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const username = usernameInput.value.trim();
  const password = passwordInput.value;

  if (!username || !password) return;

  localStorage.setItem("muaythai_user", username);
  localStorage.setItem("muaythai_pass", password);

  loginForm.reset();
  closeLogin();
  openGreeting(username);
});

loginClose.addEventListener("click", closeLogin);
loginSkip.addEventListener("click", closeLogin);
loginModal.addEventListener("click", function (event) {
  if (event.target === loginModal) closeLogin();
});

greetingClose.addEventListener("click", closeGreeting);
greetingBtn.addEventListener("click", closeGreeting);
greetingModal.addEventListener("click", function (event) {
  if (event.target === greetingModal) closeGreeting();
});

/* Open the login popup once at startup */
document.addEventListener("DOMContentLoaded", openLogin);
