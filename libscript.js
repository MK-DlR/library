// array to store books
const myLibrary = [];

// book constructor
function Book(title, author, pages, read) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.uuid = self.crypto.randomUUID();
  // console.log(this.uuid);
  this.info = function () {
    return `${this.title} by ${this.author}, ${this.pages}, ${read}`;
  };
}

// add book to library array
function addBookToLibrary() {
  myLibrary.push(theHobbit.info()); // temporary test value
  console.log(myLibrary);
}

// example book
const theHobbit = new Book(
  "The Hobbit",
  "J.R.R. Tolkien",
  "295 pages",
  "not read yet"
);

//console.log(theHobbit.info());
addBookToLibrary(); // output: Array [ "The Hobbit by J.R.R. Tolkien, 295 pages, not read yet" ]
