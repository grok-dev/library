let myLibrary = [
  {
    title: "The Lord of the Rings",
    author: "J. R. R. Tolkien",
    pages: 1178,
    read: false,
  },
];

class Book {
  constructor(title, author, pages, read = false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

function generateLibrary(library) {
  let container = document.querySelector(".library-main");

  for (let i = 0; i < library.length; i++) {
    let newDiv = document.createElement("div");
    newDiv.className = "book-card";
    newDiv.id = "book-card-" + i;

    newDiv.innerHTML = `
    <p class="book-title">${library[i].title}</p>
    <p class="book-author">${library[i].author}</p>
    <p class="book-pages">${library[i].pages} pages</p>
    <button onclick="toggleRead(${i})" id="book-${i}" class="book-button">Unread</button>
    <button onclick="delBook(${i})" id="del-${i}" class="book-button del-button">Remove</button>
    `;

    container.appendChild(newDiv);

    // Updates button color on creation
    updateColor(i);
  }
}

function addBookToLibrary(title, author, pages) {
  let book = new Book(title, author, pages);

  myLibrary.push(book);

  regenerateLibraryDisplay();

  return;
}

function updateColor(i) {
  let item = myLibrary[i];
  let domItem = document.getElementById("book-" + i);

  if (item.read == true) {
    domItem.style.backgroundColor = "green";
    domItem.innerHTML = "Read";
  } else {
    domItem.style.backgroundColor = "red";
    domItem.innerHTML = "Not Read";
  }

  return;
}

function regenerateLibraryDisplay() {
  let cards = document.querySelectorAll(".book-card");

  for (let i = 0; i < cards.length; i++) {
    cards[i].remove();
  }

  generateLibrary(myLibrary);
}

function toggleRead(i) {
  let item = myLibrary[i];

  if (item.read == true) {
    item.read = false;
  } else {
    item.read = true;
  }

  // Updates button color on click
  updateColor(i);

  return;
}

function delBook(num) {
  let domElement = document.getElementById("book-card-" + num);

  domElement.remove();
  myLibrary.splice(num, 1);
}

// click handling for new book
const newBookButton = document.querySelector("#new-book-button");

newBookButton.addEventListener("click", displayBookForm, false);

function displayBookForm(event) {
  let popUpForm = document.querySelector("#pop-up-form");

  return (popUpForm.style.display = "grid");
}

// Submit pop up
const popUpForm = document.querySelector("#pop-up-form");

popUpForm.addEventListener("submit", popUpSubmit, false);

function popUpSubmit(event) {
  event.preventDefault();

  let title = document.getElementById("title");
  let author = document.getElementById("author");
  let pages = document.getElementById("pages");

  addBookToLibrary(title.value, author.value, pages.value);

  title.value = "";
  author.value = "";
  pages.value = "";

  closePopUp();
}

// Close pop up
const popUpCloseButton = document.querySelector("#close-pop-up-button");

popUpCloseButton.addEventListener("click", closePopUp, false);

function closePopUp() {
  let popUpForm = document.querySelector("#pop-up-form");

  return (popUpForm.style.display = "none");
}

// Script starts here
generateLibrary(myLibrary);

console.log(myLibrary);
