// array to store books
const myLibrary = [];

// book constructor
function Book(title, author, pages, published, status, adaptation, cover) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.published = published;
  this.status = status;
  this.adaptation = adaptation;
  this.cover = cover || "images/placeholdercover.png";
  this.id = self.crypto.randomUUID(); // random uuid for each book
  this.info = function () {
    return `<div style="text-align: center;">
    <img src="${this.cover}" alt="${this.title}" class="stamp" style="width: 103px; height: 155px; margin-bottom: 10px;">
    <div>${this.title} by ${this.author}<br>${this.pages} pages<br>Published on ${this.published}<br>${this.status}<br>Has ${this.adaptation} adaptation</div>
    </div>`;
  };
}

// add books to library array
function addBookToLibrary(
  title,
  author,
  pages,
  published,
  status,
  adaptation,
  cover
) {
  // take params, create a book then store it in the array
  myLibrary.push(
    new Book(title, author, pages, published, status, adaptation, cover)
  );
}

// manually add a few books to the array so the display can be seen
// test book 1
addBookToLibrary(
  "Fight Club",
  "Chuck Palahniuk",
  "208",
  "August 17, 1996",
  "Read",
  "a movie",
  "images/fightclubcover.jpg"
);
// test book 2
addBookToLibrary(
  "American Gods",
  "Neil Gaiman",
  "465",
  "June 19, 2001",
  "Read",
  "a TV show",
  "images/americangodscover.jpg"
);
// test book 3
addBookToLibrary(
  "La Belle Sauvage",
  "Philip Pullman",
  "560",
  "October 19, 2017",
  "Unread",
  "no",
  "images/labellecover.jpg"
);

// loop through array to display library
function displayBooks() {
  for (const book of myLibrary) {
    const bookCard = document.createElement("div");
    bookCard.classList.add("bookCard");
    bookCard.insertAdjacentHTML("beforeend", `<p>${book.info()}</p>`);
    bookContainer.appendChild(bookCard);
  }
}

displayBooks();

// modal and form
const showButton = document.getElementById("addBook");
const bookInput = document.getElementById("bookInput");
const outputBox = document.querySelector("output");
const selectEl = bookInput.querySelector("select");
const confirmBtn = bookInput.querySelector("#confirmBtn");

// bookInput opens modal
showButton.addEventListener("click", () => {
  bookInput.showModal();
});

// cancel closes dialog without submitting
bookInput.addEventListener("close", (e) => {
  outputBox.value =
    bookInput.returnValue === "default"
      ? "No return value."
      : `ReturnValue: ${bookInput.returnValue}.`; // check for "default" rather than empty string
});

// prevent confirm from the default behavior of submitting the form, and close the dialog with the `close()` method, which triggers the "close" event
confirmBtn.addEventListener("click", (event) => {
  event.preventDefault(); // don't submit to server
  bookInput.close(selectEl.value); // Have to send the select box value here
});
