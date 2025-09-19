import { themeDarkMode } from "../js/theme.js";

document.addEventListener("DOMContentLoaded", () => {
  // theme
  const theme = document.querySelector("#toggleDarkMode");
  theme.addEventListener("click", () => {
    themeDarkMode();
  });

  // history & p
  let p = document.createElement("p");
  let history = JSON.parse(localStorage.getItem("calcHistory") || "[]");
  let history_display = document.querySelector("#history-display");

  // State & Logic
  let currentInput = "0";
  let previousValue = null;
  let operator = null;

  //   Hiển thị
  const displayElement = document.querySelector("#displayId");
  const notification = document.querySelector("#notification");

  // Gọi lịch sử khi tải trang xong
  function displayHistory() {
    console.log(typeof history);
    if (Object.keys(history).length === 0) {
      p.className = "btn-history-cal";
      p.textContent = "Lịch sử trống";
      history_display.prepend(p);
    }

    for (let obj of history) {
      let p = document.createElement("p");
      p.className = "btn-history-cal";
      p.textContent = obj;
      history_display.append(p);
    }
  }

  displayHistory();

  // Xóa lịch sử
  document.querySelector("#del-history").addEventListener("click", () => {
    localStorage.clear();
    console.log("đã xóa toàn bộ localStorage");
    history = [];
    history_display.innerHTML = '<p class="btn-history-cal">Lịch sử trống</p>';
  });

  // Phân tích biểu thức
  function parseExpression(expr) {
    console.log(expr);
    const parts = expr.replace(/\s/g, "").split("=");
    console.log(parts);
    currentInput = +parts[1];
    previousValue = null;
    operator = null;
    displayElement.textContent = `${parts[1]}`;
  }

  // Chọn phần lịch sử tương ứng
  const items = document.querySelectorAll(".btn-history-cal");
  history_display.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-history-cal")) {
      parseExpression(e.target.textContent);
    }
  });

  function updateDisplay(value) {
    if (value.toString().length > 20) {
      displayElement.textContent = Number(value).toExponential(4);
    } else {
      displayElement.textContent = value;
    }
  }

  function displayNotification(value) {
    notification.textContent = value;
    setTimeout(() => {
      notification.textContent = "";
    }, 3000);
  }

  //   Hàm xử lý số
  function handleNumber(num) {
    if (currentInput === "0") {
      currentInput = num;
    } else {
      currentInput += num;
    }
    updateDisplay(currentInput);
  }

  //   Hàm xử lý phép toán
  function handleOperator(op) {
    if (currentInput === "") return;
    previousValue = currentInput;
    operator = op;
    currentInput = "";
    updateDisplay(`${previousValue} ${operator}`);
  }

  //   Hàm xử lý hành động
  function handleAction(action) {
    switch (action) {
      case "ac":
        currentInput = "0";
        previousValue = null;
        operator = null;
        updateDisplay(0);
        break;
      case "+/-":
        if (currentInput === "0" || currentInput === 0) return;
        if (!currentInput.includes("-") && currentInput !== "") {
          currentInput = "-" + currentInput;
        } else {
          currentInput = currentInput.slice(1);
        }
        updateDisplay(currentInput);
        break;
      case ".":
        if (!currentInput.includes(".")) currentInput += ".";
        updateDisplay(currentInput);
        break;
      case "del":
        currentInput = currentInput.slice(0, -1);
        updateDisplay(currentInput);
        break;
      case "=":
        calculator();
        break;
      default:
        console.log("không tìm thấy action");
    }
  }

  // Hàm lưu lịch sử tính toán
  function addHistory(expr, result) {
    // Lưu vào Local storage
    history.unshift(`${expr} = ${result}`);
    localStorage.setItem("calcHistory", JSON.stringify(history));
    history_display.textContent = "";
    displayHistory();
  }

  //   Hàm tính toán
  function calculator() {
    currentInput = +currentInput;
    previousValue = +previousValue;
    let result = 0;
    console.log(currentInput);
    switch (operator) {
      case "+":
        result = previousValue + currentInput;
        break;
      case "-":
        result = previousValue - currentInput;
        break;
      case "*":
        result = previousValue * currentInput;
        break;
      case "/":
        if (currentInput === 0) {
          displayNotification("Error");
          result = "error";
          break;
        }
        result = previousValue / currentInput;
        break;
      case "%":
        if (currentInput === 0) {
          displayNotification("Error");
          result = "error";
          break;
        }
        result = previousValue % currentInput;
        break;
    }
    if (isFinite(result)) {
      addHistory(`${previousValue} ${operator} ${currentInput}`, result);
      result = Number(result.toFixed(2));
      currentInput = result;
      updateDisplay(result);
    }
  }

  // Nhập dữ liệu từ bàn phím
  document.addEventListener("keydown", (e) => {
    const key = e.key;

    if (!isNaN(key)) handleNumber(key);
    else if (["+", "-", "*", "/", "%"].includes(key)) handleOperator(key);
    else if (key === "Enter" || key === "=") handleAction("=");
    else if (key === "Backspace") handleAction("del");
    else if (key === ".") handleAction(".");
    else if (key.toLowerCase() === "c") handleAction("ac");

    // console.log(`currrentInput: ${currentInput}, type: ${typeof currentInput}`);
    // console.log(`previousValue: ${previousValue}`);
    // console.log(`operator: ${operator}`);
  });

  //Phần lấy thông tin
  const block = document.querySelector(".block");
  block.addEventListener("click", (e) => {
    const li = e.target.dataset;
    console.log(li);
    currentInput = currentInput.toString();

    if (li) {
      if (li.number) {
        handleNumber(li.number);
      }

      if (li.action) {
        handleAction(li.action);
      }

      if (li.operator) {
        handleOperator(li.operator);
      }
    } else {
      console.log("Không tìm thấy li");
    }

    // console.log(`currrentInput: ${currentInput}, type: ${typeof currentInput}`);
    // console.log(`previousValue: ${previousValue}`);
    // console.log(`operator: ${operator}`);
  });
});
