import { themeDarkMode } from "../js/theme.js";

document.addEventListener("DOMContentLoaded", () => {
  // Theme
  const toggleDarkMode = document.getElementById("toggleDarkMode");
  toggleDarkMode.addEventListener("click", () => {
    themeDarkMode();
  });

  // toggle card function
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      this.classList.toggle("is-active");
    });
  });

  // Hàm hiển thị dữ liệu đã lưu trữ
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  render_todos(todos);

  // Hàm tìm kiếm
  search_todos();

  // Hàm thêm việc làm
  add_todos();

  // Hàm chỉnh sửa và xóa card
  editCard();
  removeCard();
});

function search_todos() {
  // Lấy dữ liệu trong ds và dữ liệu người dùng nhập vào
  let user_search = document.querySelector("#search_todos");
  const back_search = document.querySelector("#back_search");

  document.querySelector("#search_todos").addEventListener("input", () => {
    const list_todos = JSON.parse(localStorage.getItem("todos")) || [];
    // So sánh
    let found_todos = list_todos.filter((todo) =>
      todo.title.toLowerCase().includes(user_search.value.toLowerCase())
    );

    // Hiển thị --> so sánh tìm được
    console.log(found_todos);
    render_todos(found_todos);
    // Hiển thị nút quay lại
    back_search.style.display = "block";
  });

  // Khi không còn focus nữa thì sẽ không hiển thị dữ liệu người dùng nhập vào nữa
  document.querySelector("#search_todos").addEventListener("focusout", () => {
    user_search.value = "";

    back_search.addEventListener("click", () => {
      render_todos(list_todos);
      // Xóa nút quay lại
      back_search.style.display = "none";
    });
  });
}

function add_todos() {
  // Truy cập form thêm todos
  const form_add_todos = document.getElementById("add_todos_form");

  // Thêm việc cần làm
  form_add_todos.addEventListener("submit", (e) => {
    e.preventDefault(); // ngăn form reload

    const new_todos_title = document.getElementById("add_new_todos_title");
    const new_todos_describe = document.getElementById(
      "add_new_todos_describe"
    );

    // Kiểm tra số lượng từ quy định cho tiêu đề
    if (new_todos_title.value.length > 20) {
      alert("Quá số từ quy định");
      new_todos_title.value = "";
      return;
    }

    const card_wrapper = document.getElementById("cards-wrapper");

    // Tạo thẻ
    const card = document.createElement("div");
    card.className = "card";
    card.dataset.id = Date.now();

    // Phần nội dung
    const content = document.createElement("div");
    content.className = "contentCard";

    const title = document.createElement("h3");
    title.className = "titleCard";
    title.textContent = new_todos_title.value;

    const desc = document.createElement("p");
    desc.className = "primaryContentCard";
    desc.textContent = new_todos_describe.value;

    content.appendChild(title);
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

    save_todos({
      id: card.dataset.id,
      title: new_todos_title.value,
      desc: new_todos_describe.value,
    });

    // Xóa nội dung người dùng vừa nhập trên input
    new_todos_title.value = "";
    new_todos_describe.value = "";

    // Lưu dữ liệu vào localStoge
    console.log("Thêm việc cần làm thành công");
  });
}

function render_todos(todos) {
  const card_wrapper = document.querySelector("#cards-wrapper");
  card_wrapper.innerHTML = "";

  todos.forEach((todo) => {
    const card = document.createElement("div");
    card.className = "card";
    card.dataset.id = todo.id;

    const content = document.createElement("div");
    content.className = "contentCard";

    const title = document.createElement("h3");
    title.className = "titleCard";
    title.textContent = todo.title;

    const desc = document.createElement("p");
    desc.className = "primaryContentCard";
    desc.textContent = todo.desc;

    content.appendChild(title);
    content.appendChild(desc);

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

    card.appendChild(content);
    card.appendChild(btnContainer);

    card_wrapper.appendChild(card);
  });

  console.log("Đã render dữ liệu");
}

function save_todos(todo) {
  let todos = JSON.parse(localStorage.getItem("todos")) || [];

  todos.push(todo);

  localStorage.setItem("todos", JSON.stringify(todos));

  console.log("đã lưu dữ liệu");
}

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

function editCard() {
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

        // Lưu vào trong localStorage
        const update_todos = JSON.parse(localStorage.getItem("todos")) || [];
        const id_todo = card.dataset.id;
        update_todos.forEach((todo) => {
          if (todo.id === id_todo) {
            todo.title = inputTitle.value;
            todo.desc = inputDesc.value;
          }
        });
        localStorage.setItem("todos", JSON.stringify(update_todos));
      });
    }
  });
}

function removeCard() {
  // Chức năng xóa card
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("deleted")) {
      const todos = JSON.parse(localStorage.getItem("todos")) || [];
      const card = e.target.closest(".card");
      // Xóa hiển thị của card
      e.target.closest(".card").remove();

      // Kiểm tra localStorage có dữ liệu không
      if (!todos) {
        return;
      }

      // Xóa dữ liệu trong localStorage
      const id_todo_remove = card.dataset.id;
      const list_new = todos.filter((todo) => todo.id !== id_todo_remove);
      localStorage.setItem("todos", JSON.stringify(list_new));
    }
  });
}
