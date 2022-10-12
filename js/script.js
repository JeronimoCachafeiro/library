let myLibrary = [];
const libraryDisplay = document.querySelector(".library");
const newBookSection = document.querySelector(".new-book-section");
const newBookButton = document.querySelector(".new-book-btn");

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.readStatus = function () {
  return this.read === "true".toLowerCase() ? "already read." : "not read yet.";
};

Book.prototype.info = function () {
  return `${this.title} by ${this.author}, ${this.pages} pages, ${this.readStatus()}`;
};

Book.prototype.toggleRead = function () {
  this.read === "true" ? this.read = "false" : this.read = "true";
  displayBooks();
  console.log(this.read);
}
function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  console.log(myLibrary);
}

function displayBooks() {
  libraryDisplay.innerHTML = "";
  for (let i = 0; i < myLibrary.length; i++) {
    const bookCard = document.createElement("div");
    bookCard.setAttribute("data-index", i);
    bookCard.classList.add("book");
    libraryDisplay.appendChild(bookCard);

    const bookInfo = document.createElement("p");
    bookInfo.textContent = myLibrary[i].info();
    bookCard.appendChild(bookInfo);

    const bookRemoveButton = document.createElement("button");
    bookRemoveButton.classList.add("remove-button");
    bookRemoveButton.textContent = "Remove";
    bookCard.appendChild(bookRemoveButton);

    const bookReadButton = document.createElement("button");
    bookReadButton.classList.add("read-button");
    bookReadButton.textContent = "Read";
    bookCard.appendChild(bookReadButton);
  }
}

function displayNewBookForm() {
  const form = document.createElement("div");
  form.classList.add("new-book-form");
  newBookSection.appendChild(form);

  const titleLabel = document.createElement("label");
  titleLabel.setAttribute("for", "title");
  titleLabel.textContent = "Title:";
  form.appendChild(titleLabel);
  const titleInput = document.createElement("input");
  titleInput.setAttribute("type", "text");
  titleInput.setAttribute("id", "title");
  titleInput.setAttribute("name", "title");
  form.appendChild(titleInput);

  const authorLabel = document.createElement("label");
  authorLabel.setAttribute("for", "author");
  authorLabel.textContent = "Author:";
  form.appendChild(authorLabel);
  const authorInput = document.createElement("input");
  authorInput.setAttribute("type", "text");
  authorInput.setAttribute("id", "author");
  authorInput.setAttribute("name", "author");
  form.appendChild(authorInput);

  const pagesLabel = document.createElement("label");
  pagesLabel.setAttribute("for", "pages");
  pagesLabel.textContent = "Pages:";
  form.appendChild(pagesLabel);
  const pagesInput = document.createElement("input");
  pagesInput.setAttribute("type", "text");
  pagesInput.setAttribute("id", "pages");
  pagesInput.setAttribute("name", "pages");
  form.appendChild(pagesInput);

  const readLabel = document.createElement("label");
  readLabel.setAttribute("for", "read");
  readLabel.textContent = "Read:";
  form.appendChild(readLabel);
  const readInput = document.createElement("input");
  readInput.setAttribute("type", "text");
  readInput.setAttribute("id", "read");
  readInput.setAttribute("name", "read");
  form.appendChild(readInput);

  const submit = document.createElement("button");
  submit.classList.add("submit");
  submit.textContent = "Submit";
  form.appendChild(submit);
}

function removeBook(book) {
  book.parentElement.remove();
  myLibrary.splice(book.dataset.index, 1);
  console.log(myLibrary);
}

addBookToLibrary("The Hobbit", "Tolkien", 400, "true");
displayBooks();

newBookButton.addEventListener("click", displayNewBookForm);

newBookSection.addEventListener("click", function (e) {
  if (e.target.matches(".submit")) {
    const newBookTitle = document.querySelector("#title").value;
    const newBookAuthor = document.querySelector("#author").value;
    const newBookPages = document.querySelector("#pages").value;
    const newBookRead = document.querySelector("#read").value;
    addBookToLibrary(newBookTitle, newBookAuthor, newBookPages, newBookRead);
    displayBooks();
    const newBookForm = document.querySelector(".new-book-form");
    newBookSection.removeChild(newBookForm);
  }
});

libraryDisplay.addEventListener("click", function (e) {
  if (e.target.matches(".remove-button")) {
    removeBook(e.target);
  } else if (e.target.matches(".read-button")) {
    myLibrary[e.target.parentElement.dataset.index].toggleRead();
    console.log(myLibrary);
  }
});
