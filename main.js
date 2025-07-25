// Dark mode toggle
const toggleDarkModeBtn = document.getElementById("toggleDarkMode");
const body = document.body;

toggleDarkModeBtn.addEventListener("click", () => {
  body.classList.toggle("dark");
  toggleDarkModeBtn.textContent = body.classList.contains("dark")
    ? "☀️ Light Mode"
    : "🌓 Dark Mode";
});

// Hamburger menu toggle
const hamburgerBtn = document.getElementById("hamburgerBtn");
const navMenu = document.getElementById("navMenu");

hamburgerBtn.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});
