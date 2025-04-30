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

      // ❌ emoji
      const crossEmoji = `<div style="text-align: right; margin-left: 130px; display: inline;">
          <span style="cursor: pointer;" title="delete book">❌</span>
        </div>`;
      bookCard.insertAdjacentHTML("afterbegin", crossEmoji);
      const crossElement = bookCard.querySelector("span");

      // ❌ emoji event listener to remove selected card
      crossElement.addEventListener("click", function () {
        const idToDelete = bookCard.dataset.id;

        // remove selected book from the array
        const index = myLibrary.findIndex((book) => book.id === idToDelete);
        if (index !== -1) {
          myLibrary.splice(index, 1);
        }

        // remove selected book from DOM
        bookCard.remove();
      });

      // ✔️ emoji
      const checkEmoji = `<div style="text-align: left; margin-right: 130px; display: inline;">
          <span style="cursor: pointer;" title="toggle read/unread">✔️</span>
        </div>`;
      bookCard.insertAdjacentHTML("afterbegin", checkEmoji);
      const checkElement = bookCard.querySelector("span");

      // ✔️ emoji event listener to toggle read/unread
      checkElement.addEventListener("click", function () {
        console.log("hi!");
        book.toggle();
      });

      // adding book info to card
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
