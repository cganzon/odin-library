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

Book.prototype.changeReadStatus = function () {
  this.read = !this.read;
};

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
  for (let i = 0; i < array.length; i++) {
    const card = document.createElement("div");
    const bookTitle = document.createElement("h3");
    const bookAuthor = document.createElement("p");
    const bookPages = document.createElement("p");
    const bookReadStatus = document.createElement("p");
    const deleteBtn = document.createElement("button");
    const readStatusBtn = document.createElement("button");

    bookTitle.textContent = array[i].title;
    bookAuthor.textContent = `By ${array[i].author}`;
    bookPages.textContent = `${array[i].pages.toString()} pages`;
    bookReadStatus.textContent = array[i].read ? "Completed" : "Not read yet";
    deleteBtn.textContent = "X";
    deleteBtn.setAttribute("data-num", i);
    deleteBtn.classList.add("delete-btn");
    readStatusBtn.textContent = "Change read status";
    readStatusBtn.setAttribute("data-num", i);
    readStatusBtn.classList.add("read-status-btn");
    card.append(
      bookTitle,
      bookAuthor,
      bookPages,
      bookReadStatus,
      deleteBtn,
      readStatusBtn
    );
    booksContainer.append(card);
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
