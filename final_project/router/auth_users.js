const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [{
  "username": "user1",
  "password": "password"
},
{
  "username": "user2",
  "password": "password"
}];



const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid

}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
let validusers = users.filter((user)=>{
  return (user.username === username && user.password === password)
});
if(validusers.length > 0){
  return true;
} else {
  return false;
}
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  // return res.status(300).json({message: "Yet to be implemented"});
  const username = req.body.username;
  const password = req.body.password;
  console.log(username,password);
  if (!username || !password) {
      return res.status(404).json({message: "Error logging in"});
  }

  if (authenticatedUser(username,password)) {
    let accessToken = jwt.sign({
      data: password
    }, 'access', { expiresIn: 60 });

    req.session.authorization = {
      accessToken,username
  }
  return res.status(200).send("User successfully logged in");
  } else {
    return res.status(208).json({message: "Invalid Login. Check username and password"});
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});
  const isbn = req.params.isbn;
  const review = req.body.review;
  const username = req.session.authorization.username;
  console.log(isbn,review,username)
  books[isbn].reviews[username] = review;
  res.send(books[isbn]["reviews"]);
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
  // Update the code here
  //res.send("Yet to be implemented")//This line is to be replaced with actual return value
  const isbn = req.params.isbn;
  const username = req.session.authorization.username;
  if (books[isbn].reviews[username]){
      delete books[isbn].reviews[username]
      res.send(`Review for isbn ${isbn} deleted.`);
  }else{
    res.send(`Review for isbn ${isbn} not found.`);
  }
  
});



module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
