const lists = document.querySelectorAll(".list");
const boardBtn = document.querySelector(".add_board-btn");

function addTask() {
  const btn = document.querySelector(".add_btn");
  const addBtn = document.querySelector(".add_item-btn");
  const cancelBtn = document.querySelector(".cancel_item-btn");
  const textarea = document.querySelector(".textarea");
  const form = document.querySelector(".form");

  let value;

  btn.addEventListener("click", () => {
    form.style.display = "block";
    btn.style.display = "none";
    addBtn.style.display = "none";
    textarea.addEventListener("input", (e) => {
      value = e.target.value;
      if (value) {
        addBtn.style.display = "block";
      } else {
        addBtn.style.display = "none";
      }
    });
  });

  cancelBtn.addEventListener("click", () => {
    textarea.value = "";
    value = "";
    form.style.display = "none";
    btn.style.display = "block";
  });

  addBtn.addEventListener("click", () => {
    const newItem = document.createElement("div");
    const newItemSpan = document.createElement("span");
    newItem.classList.add("list_item");
    newItemSpan.classList.add("list_item-span");
    newItemSpan.innerHTML = "&#215;";
    newItem.draggable = true;
    newItem.textContent = value;
    lists[0].append(newItem);
    newItem.append(newItemSpan);

    textarea.value = "";
    value = "";
    form.style.display = "none";
    btn.style.display = "block";

    dragAndDrop();
  });
}

addTask();

function addBoard() {
  const boards = document.querySelector(".boards");
  const board = document.createElement("div");
  const deleteItem = document.createElement("span");
  board.classList.add("boards_item");
  board.innerHTML = ` <span contenteditable="true" class="title">Введіть назву</span>
          <div class="list"></div>`;
  deleteItem.classList.add("list_item-delete");
  deleteItem.innerHTML = "&#215;";
  boards.append(board);
  board.append(deleteItem);
  changeTitle();
  dragAndDrop();
  console.log(board);
  board.addEventListener("click", (e) => {
    const deleteSpan = e.target.classList.contains("list_item-delete");
    if (deleteSpan) {
      board.remove();
    }
  });
}

boardBtn.addEventListener("click", addBoard);

function changeTitle() {
  const titles = document.querySelectorAll(".title");
  titles.forEach((title) => {
    title.addEventListener("click", (e) => (e.target.textContent = ""));
  });
}

changeTitle();
let dragItem = null;
function dragAndDrop() {
  const listItems = document.querySelectorAll(".list_item");
  const lists = document.querySelectorAll(".list");
  for (let i = 0; i < listItems.length; i++) {
    const item = listItems[i];

    item.addEventListener("dragstart", () => {
      dragItem = item;

      setTimeout(() => {
        item.style.display = "none";
      }, 0);
    });
    item.addEventListener("dragend", () => {
      dragItem = null;

      setTimeout(() => {
        item.style.display = "block";
      }, 0);
    });
    item.addEventListener("click", (e) => {
      const deleteItem = e.target.classList.contains("list_item-span");
      if (deleteItem) {
        item.remove();
      }
    });
    for (let index = 0; index < lists.length; index++) {
      const list = lists[index];
      list.addEventListener("dragover", (e) => e.preventDefault());
      list.addEventListener("dragenter", (e) => {
        e.preventDefault();
        list.style.backgroundColor = "rgba(0, 0, 0, 0.3)";
      });
      list.addEventListener("dragleave", (e) => {
        e.preventDefault();
        list.style.backgroundColor = "rgba(0, 0, 0, 0)";
      });
      list.addEventListener("drop", (e) => {
        e.preventDefault();
        list.style.backgroundColor = "rgba(0, 0, 0, 0)";
        list.append(dragItem);
      });
    }
  }
}

dragAndDrop();
