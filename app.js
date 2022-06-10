const bookForm = document.querySelector("#book-form");
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#pages");
const radioBtns = document.querySelectorAll("input[name='read-status']");
const booksContainer = document.querySelector(".books-container");

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
  displayBooks(myLibrary);
}

function getSelectedRadioBtn(buttons) {
  for (let button of buttons) {
    if (button.checked) {
      return button;
    }
  }
}

function displayBooks(array) {
    booksContainer.textContent = "";
    for(let book of array) {
        const card = document.createElement("div");
        const bookTitle = document.createElement("h3");
        const bookAuthor = document.createElement("p");
        const bookPages = document.createElement("p");
        const bookReadStatus = document.createElement("p");
        bookTitle.textContent = book.title;
        bookAuthor.textContent = `By ${book.author}`;
        bookPages.textContent = `${book.pages.toString()} pages`;
        bookReadStatus.textContent = book.read ? "Completed" : "Not read yet";
        card.append(bookTitle, bookAuthor, bookPages, bookReadStatus);
        booksContainer.append(card);
    }
}

bookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let titleValue = titleInput.value;
  let authorValue = authorInput.value;
  let pagesValue = +pagesInput.value;
  let isReadValue = getSelectedRadioBtn(radioBtns).value;
  if (isReadValue === "read") {
    isReadValue = true;
  } else {
    isReadValue = false;
  }
  addBookToLibrary(titleValue, authorValue, pagesValue, isReadValue);
});
