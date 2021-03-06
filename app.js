const bookForm = document.querySelector("#book-form");
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#pages");
const radioBtns = document.querySelectorAll("input[name='read-status']");
const booksContainer = document.querySelector(".books-container");

let myLibrary = [];

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  changeReadStatus() {
    this.read = !this.read;
  }
}

const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);
myLibrary.push(theHobbit);
displayBooks(myLibrary);

function addBookToLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
  displayBooks(myLibrary);
  resetInputs();
}

function getSelectedRadioBtn(buttons) {
  for (let button of buttons) {
    if (button.checked) {
      return button;
    }
  }
}

function resetInputs() {
  titleInput.value = "";
  authorInput.value = "";
  pagesInput.value = "";
  radioBtns.forEach((button) => {
    button.checked = false;
  });
}

function createBookCard(book, index) {
  const card = document.createElement("div");
  const bookTitle = document.createElement("h3");
  const bookAuthor = document.createElement("p");
  const bookPages = document.createElement("p");
  const bookReadStatus = document.createElement("p");
  const deleteBtn = document.createElement("button");
  const readStatusBtn = document.createElement("button");

  bookTitle.textContent = book.title;
  bookAuthor.textContent = `Author: ${book.author}`;
  bookPages.textContent = `Pages: ${book.pages.toString()}`;
  bookReadStatus.textContent = book.read ? "Completed" : "Not read yet";

  readStatusBtn.textContent = "Change read status";
  readStatusBtn.setAttribute("data-num", index);
  readStatusBtn.classList.add("read-status-btn");
  deleteBtn.textContent = "Remove book";
  deleteBtn.setAttribute("data-num", index);
  deleteBtn.classList.add("delete-btn");
  card.classList.add("card");

  card.append(
    bookTitle,
    bookAuthor,
    bookPages,
    bookReadStatus,
    readStatusBtn,
    deleteBtn
  );
  booksContainer.append(card);
}

function displayBooks(array) {
  booksContainer.textContent = "";
  for (let i = 0; i < array.length; i++) {
    createBookCard(array[i], i);
  }
}

function deleteBook(deleteIndex) {
  myLibrary = myLibrary.filter((book, index) => index !== deleteIndex);
  displayBooks(myLibrary);
}

function updateBookReadStatus(bookIndex) {
  const foundBook = myLibrary.find((book, index) => index === bookIndex);
  foundBook.changeReadStatus();
  displayBooks(myLibrary);
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

booksContainer.addEventListener("click", (e) => {
  if (e.target.matches("button")) {
    const bookIndex = +e.target.getAttribute("data-num");
    if (e.target.classList.contains("delete-btn")) {
      deleteBook(bookIndex);
    } else if (e.target.classList.contains("read-status-btn")) {
      updateBookReadStatus(bookIndex);
    }
  }
});
