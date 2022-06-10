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
};

bookForm.addEventListener("submit", e => {
    e.preventDefault();
    let titleValue = titleInput.value;
    let authorValue = authorInput.value;
    let pagesValue = pagesInput.value;
    let isReadValue;
    for(let radioBtn of radioBtns) {
        if(radioBtn.checked) {
            isReadValue = radioBtn.value;
        }
    }
    console.log(titleValue)
    console.log(authorValue)
    console.log(pagesValue)
    console.log(isReadValue)
})