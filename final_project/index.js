const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

let users = [{username:"tony",password:"tony"}]; // NEW

const app = express();

app.use(express.json());

app.use("/customer",session({secret:"fingerprint_customer",resave: true, saveUninitialized: true}))

// NEW
const authenticatedUser = (username,password)=>{
  let validusers = users.filter((user)=>{
    return (user.username === username && user.password === password)
  });
  if(validusers.length > 0){
    return true;
  } else {
    return false;
  }
}


app.use("/customer/auth/*", function auth(req,res,next){
  //Write the authenication mechanism here
  // NEW
//   const username = req.body.username;
//   const password = req.body.password;
// console.log(username,password)
//   if (!username || !password) {
//       return res.status(404).json({message: "Error logging in"});
//   }

//   if (authenticatedUser(username,password)) {
//     let accessToken = jwt.sign({
//       data: password
//     }, 'access', { expiresIn: 60 * 60 });

//     req.session.authorization = {
//       accessToken,username
//   }
//   return res.status(200).send("User successfully logged in");
//   } else {
//     return res.status(208).json({message: "Invalid Login. Check username and password"});
// }
let token = req.session.authorization;
   if(token) {
       token = token['accessToken'];
       jwt.verify(token, "access",(err,user)=>{
           if(!err){
               req.user = user;
               next();
           }
           else{
               return res.status(403).json({message: "Customer not authenticated"})
           }
        });
    } else {
        return res.status(403).json({message: "Customer not logged in"})
    }
});

const doesExist = (username)=>{
  let userswithsamename = users.filter((user)=>{
    return user.username === username
  });
  if(userswithsamename.length > 0){
    return true;
  } else {
    return false;
  }
}

app.post("/register", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!doesExist(username)) { 
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "User successfully registered. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});    
    }
  } 
  return res.status(404).json({message: "Unable to register user."});
});



 
const PORT = 10000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT,()=>console.log("Server is running"));
