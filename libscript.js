// array to store books
const myLibrary = [];

// book constructor
function Book(title, author, pages, published, read, adaptation) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.published = published;
  this.read = read;
  this.adaptation = adaptation;
  this.id = self.crypto.randomUUID();
  this.info = function () {
    return `${this.title} by ${this.author}, ${this.pages}, published on ${this.published}, ${this.read}, ${this.adaptation}.`;
  };
}

// add books to library array
function addBookToLibrary(title, author, pages, published, read, adaptation) {
  // take params, create a book then store it in the array
  myLibrary.push(new Book(title, author, pages, published, read, adaptation));
}

// manually add a few books to the array so the display can be seen
// test book 1
addBookToLibrary(
  "Fight Club",
  "Chuck Palahniuk",
  "208 pages",
  "August 17, 1996",
  "read",
  "movie"
);
// test book 2
addBookToLibrary(
  "American Gods",
  "Neil Gaiman",
  "465 pages",
  "June 19, 2001",
  "read",
  "tv show"
);
// test book 3
addBookToLibrary(
  "La Belle Sauvage",
  "Philip Pullman",
  "560 pages",
  "October 19, 2017",
  "unread",
  "none"
);

// create a function
// that loops through the array (1) (for...in loop (?))
// and displays each book on the page
// can be displayed in a table
// or in their own "card"

function displayBooks() {
  console.table(myLibrary); // full table of test books
  for (let i = 0; i < myLibrary.length; i++) {
    console.log(myLibrary[i]); // displaying individual book objects
  }
}

displayBooks();
