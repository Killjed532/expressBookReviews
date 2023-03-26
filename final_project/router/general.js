const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


const listBooks = (req, res) => {
  const promise = new Promise((resolve, reject) => {
    if (books) {
      resolve(Object.values(books));
    } else {
      reject(new Error("No books found."));
    }
  });

  promise
      .then((booksArray) => {
        res.send(booksArray);
      })
      .catch((error) => {
        res.status(404).send(error.message);
      });
};
const listISBN = (req, res) => {
  const promise = new Promise((resolve, reject) => {
    if (books) {
      resolve(Object.values(books[isbn]));
    } else {
      reject(new Error("ISBN Not found."));
    }
  });

  promise
    .then((booksArray) => {
      res.send(booksArray);
    })
    .catch((error) => {
      res.status(404).send(error.message);
    });
};
const listAuthor = (req, res) => {
  const promise = new Promise((resolve, reject) => {
    if (books) {
      resolve(Object.values(books[author]));
    } else {
      reject(new Error("ISBN Not found."));
    }
  });

  promise
    .then((booksArray) => {
      res.send(booksArray);
    })
    .catch((error) => {
      res.status(404).send(error.message);
    });
};
const listTitle = (req, res) => {
  const promise = new Promise((resolve, reject) => {
    if (books) {
      resolve(Object.values(books[title]));
    } else {
      reject(new Error("ISBN Not found."));
    }
  });

  promise
    .then((booksArray) => {
      res.send(booksArray);
    })
    .catch((error) => {
      res.status(404).send(error.message);
    });
};

public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!isValid(username)) {
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "User successfully registred. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});
    }
  }
  return res.status(404).json({message: "Unable to register user."});
});


// Get the book list available in the shop
public_users.get('/',(req, res) => {
  //Write your code here
  listBooks;
  return res.send(JSON.stringify({books},null,4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',(req, res) => {
  let isbn = [];
  for (let book in books) {
    isbn.push(books[book].isbn);
  }
  res.send(isbn);
  const isbn1 =req.params.isbn;
  for(let i=1;i<=10;i++){
    res.send(books[i][isbn1]);
  }
  listISBN;
 });

// Get book details based on author
public_users.get('/author/:author', (req, res) => {
  //Write your code here
  let authors = [];
  for (let key in books) {
    if (books.hasOwnProperty(key)) {
      authors.push(books[key].author);
    }
  }
  res.send(authors);
  listAuthor;
});

// Get all books based on title
public_users.get('/title/:title', (req, res) => {
  //Write your code here
  let title = [];
  for (let key in books) {
    if (books.hasOwnProperty(key)) {
      title.push(books[key].title);
    }
  }
  res.send(title);
  listTitle;
});

//  Get book review
public_users.get('/review/:isbn', (req, res) => {
  //Write your code here
  const isbn = req.params.isbn;
  const book = Object.values(books).find(b => b.isbn === isbn);
  if (book) {
    const review = book.reviews;
    res.send(review);
  } else {
    res.send(`No book found with ISBN ${isbn}`);
  }
});

module.exports.general = public_users;

/*
let title = [];
  for (let key in books) {
    if (books.hasOwnProperty(key)) {
      title.push(books[key].title);
    }
  }
  res.send(title);*/
