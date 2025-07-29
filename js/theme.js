export function themeDarkMode() {
  // Dark mode toggle
  const toggleDarkModeBtn = document.getElementById("toggleDarkMode");
  //   console.log(toggleDarkModeBtn);
  const body = document.body;
  body.classList.toggle("dark");
  const isDark = body.classList.contains("dark");
  toggleDarkModeBtn.textContent = body.classList.contains("dark")
    ? "☀️ Light Mode"
    : "🌓 Dark Mode";
  // Lưu theme vào localStorage
  localStorage.setItem("theme", isDark ? "dark" : "light");
}

// Áp dụng theme khi tải trang
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme") || "light"; // Mặc định là light
  const body = document.body;
  body.classList.toggle("dark", savedTheme === "dark");
  const toggleDarkModeBtn = document.getElementById("toggleDarkMode");
  toggleDarkModeBtn.textContent =
    savedTheme === "dark" ? "☀️ Light Mode" : "🌓 Dark Mode";
});
