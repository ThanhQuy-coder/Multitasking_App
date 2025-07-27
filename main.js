document.addEventListener("DOMContentLoaded", () => {
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

  // Hàm chuyển trang chung
  document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("click", (e) => {
      const target = card.dataset.url;
      window.location.href = target;
    });
  });
});
