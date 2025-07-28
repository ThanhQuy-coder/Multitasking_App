document.addEventListener("DOMContentLoaded", () => {
  // State & Logic
  let currentInput = "0";
  let previousValue = null;
  let operator = null;

  //   Hiển thị
  const displayElement = document.querySelector("#display");
  const notification = document.querySelector("#notification");

  function updateDisplay(value) {
    displayElement.textContent = value;
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

  //   Hàm tính toán
  function calculator() {
    currentInput = +currentInput;
    previousValue = +previousValue;
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
      result = Number(result.toFixed(2));
      currentInput = result;
      updateDisplay(result);
    }
  }

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

    console.log(`currrentInput: ${currentInput}, type: ${typeof currentInput}`);
    console.log(`previousValue: ${previousValue}`);
    console.log(`operator: ${operator}`);
  });
});

/**
 * 1. Lịch sử tính toán
 * 2. Theme UI
 * 3. Test độ dài của display
 * 4. Nhập từ bàn phím
 * 5. Tương tác được với bàn phím
 * 6. Sáng tạo
 */
