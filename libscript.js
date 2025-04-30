// array to store books
const myLibrary = [];

// book constructor
function Book(title, author, pages, published, stats, adaptation, cover) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.published = published;
  this.stats = stats;
  this.adaptation = adaptation;
  this.cover = cover || "images/placeholdercover.png";
  this.id = self.crypto.randomUUID(); // random uuid for each book
  this.info = function () {
    return `<div style="text-align: center;">
    <img src="${this.cover}" alt="${this.title}" class="stamp" style="width: 103px; height: 155px; margin-bottom: 10px;">
    <div>${this.title} by ${this.author}<br>${this.pages} pages<br>Published on ${this.published}<br>${this.stats}<br>Has ${this.adaptation} adaptation</div>
    </div>`;
  };
}

// add books to library array
function addBookToLibrary(
  title,
  author,
  pages,
  published,
  stats,
  adaptation,
  cover
) {
  // take params, create a book then store it in the array
  myLibrary.push(
    new Book(title, author, pages, published, stats, adaptation, cover)
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

// wait for DOM to be fully loaded before displaying books
document.addEventListener("DOMContentLoaded", function () {
  // get the book container element
  const bookContainer = document.getElementById("bookContainer");
  if (!bookContainer) {
    console.error("bookContainer element not found!");
    return;
  }

  // get other necessary elements
  const showButton = document.getElementById("addBook");
  const bookInput = document.getElementById("bookInput");
  const outputBox = document.querySelector("output");
  const confirmBtn = document.querySelector("#confirmBtn");
  const userInputForm = document.getElementById("userInput"); // store the form reference once

  // check if all elements exist
  if (!showButton) console.error("addBook button not found!");
  if (!bookInput) console.error("bookInput dialog not found!");
  if (!outputBox) console.error("output element not found!");
  if (!confirmBtn) console.error("confirmBtn button not found!");
  if (!userInputForm) console.error("userInput form not found!");

  // loop through array to display library
  function displayBooks() {
    // clear existing books first to avoid duplicates
    bookContainer.innerHTML = "";

    // add each book to the container
    for (const book of myLibrary) {
      const bookCard = document.createElement("div");
      bookCard.classList.add("bookCard");
      bookCard.dataset.id = book.id;

      // create icon bar
      const iconBar = document.createElement("div");
      iconBar.classList.add("icon-bar");

      // ✔️ icon
      const bookIcon = document.createElement("span");
      bookIcon.title = "toggle read/unread";
      bookIcon.style.cursor = "pointer";
      bookIcon.innerHTML = `<img src="${
        book.stats === "Read"
          ? "images/book-open-variant.svg"
          : "images/book-open-variant-outline.svg"
      }" class="${book.stats === "Read" ? "book-bold" : "book-outline"}">`;

      bookIcon.addEventListener("click", function () {
        book.toggle();
      });

      // ❌ icon
      const crossIcon = document.createElement("span");
      crossIcon.title = "delete book";
      crossIcon.style.cursor = "pointer";
      crossIcon.innerHTML = `<img src="images/alpha-x-box-outline.svg" class="cross" height="25px" width="auto">`;

      crossIcon.addEventListener("click", function () {
        const idToDelete = bookCard.dataset.id;
        const index = myLibrary.findIndex((book) => book.id === idToDelete);
        if (index !== -1) {
          myLibrary.splice(index, 1);
        }
        bookCard.remove();
      });

      iconBar.appendChild(bookIcon);
      iconBar.appendChild(crossIcon);
      bookCard.appendChild(iconBar);

      // book info
      bookCard.insertAdjacentHTML("beforeend", `<p>${book.info()}</p>`);
      bookContainer.appendChild(bookCard);
    }

    console.log("Books displayed:", myLibrary.length); // debugging
  }

  // toggle book's read/unread status

  Book.prototype.toggle = function () {
    if (this.stats === "Read") {
      this.stats = "Unread";
      console.log("read --> unread");
    } else if (this.stats === "Unread") {
      this.stats = "Read";
      console.log("unread --> read");
    } else {
      console.log("Error");
    }
    displayBooks();
  };

  // display initial books
  displayBooks();

  // bookInput opens modal
  showButton.addEventListener("click", () => {
    bookInput.showModal();
  });

  // cancel closes dialog without submitting
  bookInput.addEventListener("close", (e) => {
    // make sure form exists before resetting
    if (userInputForm) {
      userInputForm.reset(); // clear form input
    } else {
      console.error("Cannot reset form - userInput form not found!");
    }
  });

  // handle form submission
  confirmBtn.addEventListener("click", (event) => {
    event.preventDefault(); // don't submit to server

    // collect form data
    const title = document.getElementById("title")?.value || "Untitled";
    const author = document.getElementById("author")?.value || "Unknown";
    const pages = document.getElementById("pages")?.value || "0";
    const published = document.getElementById("published")?.value || "Unknown";
    const stats = document.getElementById("stats")?.value || "Unread";
    const adaptation = document.getElementById("adaptation")?.value || "no";
    const coverInput = document.getElementById("cover");
    let coverPath = "images/placeholdercover.png"; // default cover

    console.log("Form data collected:", {
      title,
      author,
      pages,
      published,
      stats,
      adaptation,
    });

    // cover file upload
    if (coverInput && coverInput.files && coverInput.files[0]) {
      coverPath = URL.createObjectURL(coverInput.files[0]);
    }

    // add book with the collected data
    addBookToLibrary(
      title,
      author,
      pages,
      published,
      stats,
      adaptation,
      coverPath
    );

    console.log("Book added to library, new count:", myLibrary.length);

    // redisplay all books
    displayBooks();

    // close dialog
    bookInput.close("default");
  });
});

console.table(myLibrary);
