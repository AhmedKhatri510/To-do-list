"use strict";

const inputList = document.querySelector(".input-list");
const btnAdd = document.querySelector(".input-add");
const listContainer = document.querySelector(".container");
let itemArr = [];
//if there is something in input list then take it value and render it the container

const renderItem = function (input) {
  const item = `
  <div class="item" >
    <input type="text" disabled class="input__item" value="${input}"/>
    <button class="btn--edit">EDIT</button>
    <button class="btn--remove">REMOVE</button>
  </div>
  `;

  listContainer.insertAdjacentHTML("beforeend", item);
};

const renderListNStore = function () {
  if (!inputList.value) return;

  renderItem(inputList.value);
  itemArr.push(inputList.value);
  localStorage.setItem("items", itemArr);
};

//check if there is data in local storage if it is then render it.
window.addEventListener("load", function () {
  if (this.localStorage.getItem("items") === "") return;

  itemArr = JSON.stringify(this.localStorage.getItem("items"))
    .slice(1, -1)
    .split(",");

  itemArr.forEach((item) => {
    renderItem(item);
  });
});

let preVal;
let currEvent;
const editNRemove = function (e) {
  //if classlist is btn-edit then toggle the disability of input field
  if (e.target.classList[0] === "btn--edit") {
    const inputElement = e.target?.parentElement?.children[0];

    if (
      inputElement.disabled === false &&
      inputElement.getAttribute("data-dis") === "0"
    ) {
      inputElement.setAttribute("data-dis", "1");
      const idx = itemArr.indexOf(preVal);
      itemArr[idx] = e.target?.parentElement.children[0].value;
      localStorage.setItem("items", itemArr);
    }

    if (inputElement.disabled) {
      e.target.parentElement.children[0].setAttribute("data-dis", "0");
      preVal = e.target.parentElement.children[0].value;
    }

    inputElement.disabled = !inputElement.disabled;

    //find the index of
  }

  if (e.target.classList[0] === "btn--remove") {
    const parentElement = e.target?.parentElement;
    // console.log(e.target?.parentElement.children[0]);
    const idx = itemArr.indexOf(e.target?.parentElement.children[0].value);
    itemArr.splice(idx, 1);

    localStorage.setItem("items", itemArr);
    parentElement.remove();
  }
};

const checkForEnter = function (e) {
  if (e.keyCode !== 13) return;

  renderListNStore();
};

//event handlers
inputList.addEventListener("keyup", checkForEnter);
btnAdd.addEventListener("click", renderListNStore);
listContainer.addEventListener("click", editNRemove);
