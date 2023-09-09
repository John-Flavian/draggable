const gridContainer = document.querySelector(".gridContainer");
let empties;
let chooseFile;
let selected;
let parentOfFill;
let doesExist;
let swapElement;
let rows = 3;

const RowBtn = document.getElementById("addRows");
RowBtn.addEventListener("click", () => {
  rows++;
  renderGrid();
});

function generateRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgba(${r},${g},${b},0.868)`;
}

function renderGrid() {
  gridContainer.innerHTML = "";
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < rows; j++) {
      const emptyBox = document.createElement("div");
      const fillDiv = document.createElement("div");
      fillDiv.className = "filled";
      fillDiv.addEventListener("dragstart", dragStart);
      fillDiv.addEventListener("dragend", dragEnd);
      emptyBox.className = "empty";
      gridContainer.appendChild(emptyBox);
      emptyBox.appendChild(fillDiv);
    }
  }

  filledDivs = document.querySelectorAll(".filled");

  let id = 100;

  for (const filled of filledDivs) {
    const randomColor = generateRandomColor();
    filled.style.background = randomColor;
    const textCon = document.createElement("div");
    textCon.innerText = id;
    textCon.className = "text";
    filled.appendChild(textCon);
    id += 100;
  }

  empties = document.querySelectorAll(".empty");
  chooseFile = document.querySelectorAll(".file");

  for (const empty of empties) {
    empty.addEventListener("dragover", dragOver);
    empty.addEventListener("dragenter", dragEnter);
    empty.addEventListener("dragleave", dragLeave);
    empty.addEventListener("drop", dragDrop);
  }

  function dragStart() {
    selected = this;
    parentOfFill = selected.parentNode;
    setTimeout(() => (this.style.opacity = "0.2"), 100);
  }

  function dragEnd() {
    this.className = "filled";
    this.style.opacity = "1";
  }

  function dragOver(e) {
    e.preventDefault();
    if (!this.className.includes("hovered")) {
      this.className += " hovered";
    }
  }

  function dragEnter(e) {
    e.preventDefault();
    doesExist = true;
    const elements = this.querySelectorAll(".filled");
    swapElement = elements[0];
  }

  function dragLeave() {
    this.className = "empty";
  }

  function dragDrop() {
    this.className = "empty";
    selected.style.visibility = "visible";

    selected.style.transition = "transform 2s ease";
    swapElement.style.transition = "transform 2s ease";
    selected.style.transform = "translate(0)";
    swapElement.style.transform = "translate(0)";

    selected.style.visibility = "visible";
    parentOfFill.append(swapElement);
    parentOfFill.children[1].value = "";
    this.append(selected);
  }
}

renderGrid();
