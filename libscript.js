// array to store books
const myLibrary = [];

// book constructor
function Book(title, author, pages, published, read, adaptation, bookCover) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.published = published;
  this.read = read;
  this.adaptation = adaptation;
  this.bookCover = bookCover || "images/placeholdercover.png";
  this.id = self.crypto.randomUUID(); // random uuid for each book
  this.info = function () {
    return `<div style="text-align: center;">
    <img src="${this.bookCover}" alt="${this.title}" class="stamp" style="width: 103px; height: 155px; margin-bottom: 10px;">
    <div>${this.title} by ${this.author}<br>${this.pages}<br>Published on ${this.published}<br>${this.read}<br>Has ${this.adaptation} adaptation</div>
    </div>`;
  };
}

// add books to library array
function addBookToLibrary(
  title,
  author,
  pages,
  published,
  read,
  adaptation,
  bookCover
) {
  // take params, create a book then store it in the array
  myLibrary.push(
    new Book(title, author, pages, published, read, adaptation, bookCover)
  );
}

// manually add a few books to the array so the display can be seen
// test book 1
addBookToLibrary(
  "Fight Club",
  "Chuck Palahniuk",
  "208 pages",
  "August 17, 1996",
  "Read",
  "a movie",
  "images/fightclubcover.jpg"
);
// test book 2
addBookToLibrary(
  "American Gods",
  "Neil Gaiman",
  "465 pages",
  "June 19, 2001",
  "Read",
  "a TV show",
  "images/americangodscover.jpg"
);
// test book 3
addBookToLibrary(
  "La Belle Sauvage",
  "Philip Pullman",
  "560 pages",
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
