const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');

const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));


//Mongoose structure
mongoose.connect("mongodb://localhost:27017/userDB", {useNewUrlParser: true});

const userSchema = {
  email: String,
  password: String,
};
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
const port = 3000
app.listen(port, () => console.log("app started on port " + port))