const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
 
  //return res.send(JSON.stringify(books,null,4));
  new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve("Books promise resolved after 3 seconds");
    },3000)})
    .then((msg) => {
      console.log(msg);
      return res.send(JSON.stringify(books,null,4));
    });
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {

  new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve("book details by isbn promise resolved after 3 seconds");
    },3000)})
    .then((msg) => {
      console.log(msg);
      const isbn = req.params.isbn;
      const match = books[isbn] || {"message" : "No match found"} ;
      return res.send(JSON.stringify(match));
    });
  //Write your code here
  // const isbn = req.params.isbn;
  // const match = books[isbn] || {"message" : "No match found"} ;
  // return res.send(JSON.stringify(match));
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {

  new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve("book details bu author promise resolved after 3 seconds");
    },3000)})
    .then((msg) => {
      console.log(msg);
      const author = req.params.author;
      let match = {"message" : "No match found"};
      for(const isbn in books){
        if(author == books[isbn].author){
          match = books[isbn];
          break;
        }
      }
      return res.send(JSON.stringify(match));
    });
  //Write your code here
  // const author = req.params.author;
  // let match = {"message" : "No match found"};
  // for(const isbn in books){
  //   if(author == books[isbn].author){
  //     match = books[isbn];
  //     break;
  //   }
  // }
  // return res.send(JSON.stringify(match));
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve("book details by title promise resolved after 3 seconds");
    },3000)})
    .then((msg) => {
      console.log(msg);
      const title = req.params.title;
      let match = {"message" : "No match found"};
      for(const isbn in books){
        if(title == books[isbn].title){
          match = books[isbn];
          break;
        }
      }
      return res.send(JSON.stringify(match));
    });


  //Write your code here
  // const title = req.params.title;
  // let match = {"message" : "No match found"};
  // for(const isbn in books){
  //   if(title == books[isbn].title){
  //     match = books[isbn];
  //     break;
  //   }
  // }
  // return res.send(JSON.stringify(match));
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});

  //return res.status(200).json({message: "Yet to be implemented"});
  const isbn = req.params.isbn;
  res.send(books[isbn]["reviews"])
});

module.exports.general = public_users;
