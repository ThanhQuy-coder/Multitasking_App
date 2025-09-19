import { themeDarkMode } from "../js/theme.js";

document.addEventListener("DOMContentLoaded", () => {
  // Theme
  const toggleDarkMode = document.getElementById("toggleDarkMode");
  toggleDarkMode.addEventListener("click", () => {
    themeDarkMode();
  });
});
