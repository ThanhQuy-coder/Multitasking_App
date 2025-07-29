import { themeDarkMode } from "./js/theme.js";

document.addEventListener("DOMContentLoaded", () => {
  const theme = document.querySelector("#toggleDarkMode");
  theme.addEventListener("click", themeDarkMode);

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
