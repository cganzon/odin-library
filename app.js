const bookForm = document.querySelector("#book-form");
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#pages");
const radioBtns = document.querySelectorAll("input[name='read-status']");

let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
  console.log(myLibrary);
}

function getSelectedRadioBtn(buttons) {
  for (let button of buttons) {
    if (button.checked) {
      return button.value;
    }
  }
}

bookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let titleValue = titleInput.value;
  let authorValue = authorInput.value;
  let pagesValue = +pagesInput.value;
  let isReadValue = getSelectedRadioBtn(radioBtns);
  if (isReadValue === "read") {
    isReadValue = true;
  } else {
    isReadValue = false;
  }
  addBookToLibrary(titleValue, authorValue, pagesValue, isReadValue);
});
