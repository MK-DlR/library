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
    return `${this.title} by ${this.author}, ${this.pages}, ${this.read}, ${this.movie}.`;
  };
}

// add books to library array
function addBookToLibrary(title, author, pages, published, read, adaptation) {
  // take params, create a book then store it in the array
  myLibrary.push(new Book(title, author, pages, published, read, adaptation));
  console.table(myLibrary);
}
