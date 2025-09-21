import { themeDarkMode } from "../js/theme.js";

document.addEventListener("DOMContentLoaded", () => {
  // Truy cập form thêm todos
  const form_add_todos = document.getElementById("add_todos_form");

  // Theme
  const toggleDarkMode = document.getElementById("toggleDarkMode");
  toggleDarkMode.addEventListener("click", () => {
    themeDarkMode();
  });

  // Thêm việc cần làm
  form_add_todos.addEventListener("submit", (e) => {
    e.preventDefault(); // ngăn form reload

    const new_todos_tittle = document.getElementById("add_new_todos_tittle");
    const new_todos_describe = document.getElementById(
      "add_new_todos_describe"
    );

    // Kiểm tra số lượng từ quy định cho tiêu đề
    if (new_todos_tittle.value.length > 20) {
      alert("Quá số từ quy định");
      new_todos_tittle.value = "";
      return;
    }

    const card_wrapper = document.getElementById("cards-wrapper");

    // Tạo thẻ
    const card = document.createElement("div");
    card.className = "card";

    // Phần nội dung
    const content = document.createElement("div");
    content.className = "contentCard";

    const tittle = document.createElement("h3");
    tittle.className = "titleCard";
    tittle.textContent = new_todos_tittle.value;

    const desc = document.createElement("p");
    desc.className = "primaryContentCard";
    desc.textContent = new_todos_describe.value;

    content.appendChild(tittle);
    content.appendChild(desc);

    // Phần nút chức năng dưới thẻ
    const btnContainer = document.createElement("div");
    btnContainer.className = "container-cards_function";

    const button_adjust = document.createElement("button");
    button_adjust.className = "adjust";
    button_adjust.textContent = "🖉";

    const button_deleted = document.createElement("button");
    button_deleted.className = "deleted";
    button_deleted.textContent = "🗑";

    btnContainer.appendChild(button_adjust);
    btnContainer.appendChild(button_deleted);

    // Ghép content và btnContainer
    card.appendChild(content);
    card.appendChild(btnContainer);

    card_wrapper.appendChild(card);

    // Xóa nội dung người dùng vừa nhập trên input
    new_todos_tittle.value = "";
    new_todos_describe.value = "";
    console.log("Thêm việc cần làm thành công");
  });

  /**
   * Đây là phần chỉnh sửa thẻ tuy nhiên không thể chỉnh sửa dữ liệu mới
   * Cách khác phục sử dụng Event Delegation bên dưới
   */
  //
  // document.querySelectorAll(".card").forEach((card) => {
  //   const container_cards_function = card.querySelector(
  //     ".container-cards_function"
  //   );
  //   const btnEdit = card.querySelector(".adjust");
  //   const titleEl = card.querySelector(".titleCard");
  //   const descEl = card.querySelector(".primaryContentCard");

  //   btnEdit.addEventListener("click", () => {
  //     // Tạm ẩn
  //     container_cards_function.style.display = "none";

  //     // tạo input thay thế text hiện tại
  //     const inputTitle = document.createElement("input");
  //     inputTitle.className = "inputTitle";
  //     inputTitle.type = "text";
  //     inputTitle.value = titleEl.textContent;

  //     const inputDesc = document.createElement("textarea");
  //     inputDesc.rows = 3; // số dòng hiển thị
  //     inputDesc.style.resize = "vertical";
  //     inputDesc.value = descEl.textContent;
  //     inputDesc.className = "inputDesc";

  //     // tạo nút lưu
  //     const btnSave = document.createElement("button");
  //     btnSave.className = "save_adjust";
  //     btnSave.textContent = "Lưu";

  //     // clear nội dung cũ
  //     card.querySelector(".contentCard").innerHTML = "";
  //     card.querySelector(".contentCard").append(inputTitle, inputDesc, btnSave);

  //     // khi bấm lưu
  //     btnSave.addEventListener("click", () => {
  //       titleEl.textContent = inputTitle.value;
  //       descEl.textContent = inputDesc.value;

  //       // đưa lại nội dung vào card
  //       card.querySelector(".contentCard").innerHTML = "";
  //       card.querySelector(".contentCard").append(titleEl, descEl);

  //       // Đưa trở lại
  //       container_cards_function.style.display = "flex";
  //     });
  //   });
  // });

  // Sử dụng event delegation phần chỉnh sửa card
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("adjust")) {
      const card = e.target.closest(".card");
      const container_cards_function = card.querySelector(
        ".container-cards_function"
      );
      const titleEl = card.querySelector(".titleCard");
      const descEl = card.querySelector(".primaryContentCard");

      // Tạm ẩn
      container_cards_function.style.display = "none";

      // tạo input thay thế text hiện tại
      const inputTitle = document.createElement("input");
      inputTitle.className = "inputTitle";
      inputTitle.type = "text";
      inputTitle.value = titleEl.textContent;

      const inputDesc = document.createElement("textarea");
      inputDesc.rows = 3; // số dòng hiển thị
      inputDesc.style.resize = "vertical";
      inputDesc.value = descEl.textContent;
      inputDesc.className = "inputDesc";

      // tạo nút lưu
      const btnSave = document.createElement("button");
      btnSave.className = "save_adjust";
      btnSave.textContent = "Lưu";

      // clear nội dung cũ
      card.querySelector(".contentCard").innerHTML = "";
      card.querySelector(".contentCard").append(inputTitle, inputDesc, btnSave);

      // khi bấm lưu
      btnSave.addEventListener("click", () => {
        titleEl.textContent = inputTitle.value;
        descEl.textContent = inputDesc.value;

        // đưa lại nội dung vào card
        card.querySelector(".contentCard").innerHTML = "";
        card.querySelector(".contentCard").append(titleEl, descEl);

        // Đưa trở lại
        container_cards_function.style.display = "flex";
      });
    }
  });

  // Chức năng xóa thẻ card
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("deleted")) {
      e.target.closest(".card").remove();
    }
  });
});
