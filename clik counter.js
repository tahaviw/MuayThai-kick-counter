let saveEl = document.getElementById("save-el")
let countEl = document.getElementById("Ecrant")


let count = 0

function clickment() {
    count += 1
    countEl.textContent = count

}


function save() {

    let countStr = count + " - "
    saveEl.textContent += countStr
    count = 0
    countEl.innerText = 0

}

const refreshBtn = document.getElementById("refresh-btn");

function handleClick() {
    count = 0;
    countEl.textContent = 0;
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

function openGreeting(name) {
  greetingText.innerHTML = "Welcome, <strong>" + escapeHTML(name) + "</strong>! Ready to kick some serious rounds today?";
  greetingModal.classList.add("show");
  greetingModal.setAttribute("aria-hidden", "false");
}

function closeGreeting() {
  greetingModal.classList.remove("show");
  greetingModal.setAttribute("aria-hidden", "true");
}

loginForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const username = usernameInput.value.trim();
  const password = passwordInput.value;

  if (!username || !password) return;

  localStorage.setItem("muaythai_user", username);
  localStorage.setItem("muaythai_pass", password);

  loginForm.reset();
  openGreeting(username);
});

greetingClose.addEventListener("click", closeGreeting);
greetingBtn.addEventListener("click", closeGreeting);
greetingModal.addEventListener("click", function (event) {
  if (event.target === greetingModal) closeGreeting();
});
