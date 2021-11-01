const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const app = express();
const bcrypt = require("bcrypt");
const saltRounds = 10; // how many times we run salt rounds and hash passwords to make slower the hashing generator processs

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));


//Mongoose structure
mongoose.connect("mongodb://localhost:27017/userDB", {useNewUrlParser: true});

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const User = new mongoose.model('User', userSchema);


//GET requests for homepage, login and register
app.get('/', function(req,res){
  res.render('home');
});
app.get('/login', function(req,res){
  res.render('login');
});
app.get('/register', function(req,res){
  res.render('register');
});

//POST request for register and login
app.post('/register', function(req,res){
  //everything goes inside the next bcrypt hash function. 
  bcrypt.hash(req.body.password, saltRounds, function(err, hash){ // uses bcrypt to hash password with the defined number of saltrounds
    const newUser = new User({
      email: req.body.username,
      password: hash
    });
    newUser.save(function(err){
      if(err){
        console.log(err);
      }else{
        res.render('secrets');
      }
    });
  });

});
app.post('/login', function(req,res){
  const username = req.body.username;
  const password = req.body.password;
  User.findOne({email: username}, function(err,foundUser){
    if(err){
      console.log(err)
    } else {
      if(foundUser){
        bcrypt.compare(password, foundUser.password, function(err, result){ // uses bcrypt to compare password with the hashed password
           if(result === true){
             console.log("user accessed")
            res.render("secrets");
           } else {
             console.log("Incorrect password")
           }
        });
      } else{
        console.log("no such user")
      }
    }
  });
});


const port = 3000
app.listen(port, () => console.log("app started on port " + port));