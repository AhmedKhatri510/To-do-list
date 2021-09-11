"use strict";

const inputList = document.querySelector(".input-list");
const btnAdd = document.querySelector(".input-add");
const listContainer = document.querySelector(".container");
const itemArr = [];
//if there is something in input list then take it value and render it the container

const renderList = function () {
  if (!inputList.value) return;

  console.log(inputList.value);

  const item = `
  <div class="item">
    <input type="text" disabled class="input__item" value="${inputList.value}"/>
    <button class="btn--edit">EDIT</button>
    <button class="btn--remove">REMOVE</button>
  </div>
  `;

  itemArr.push(item);
  localStorage.setItem("items", itemArr);
  listContainer.insertAdjacentHTML("beforeend", item);
};

const editNRemove = function (e) {
  //if classlist is btn-edit then toggle the disability of input field
  if (e.target.classList[0] === "btn--edit") {
    const inputElement = e.target?.parentElement?.children[0];
    inputElement.disabled = !inputElement.disabled;
  }

  if (e.target.classList[0] === "btn--remove") {
    const parentElement = e.target?.parentElement;
    parentElement.remove();
  }
};

const checkForEnter = function (e) {
  if (e.keyCode !== 13) return;

  renderList();
};

//event handlers
inputList.addEventListener("keyup", checkForEnter);
btnAdd.addEventListener("click", renderList);
listContainer.addEventListener("click", editNRemove);
