require('dotenv').config()
const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');

const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));

//express session
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}));

//passport
app.use(passport.initialize());
app.use(passport.session());


//Mongoose structure
mongoose.connect("mongodb://localhost:27017/userDB", {useNewUrlParser: true});

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

//Passport-Local Mongoose will add the hashed password and the salt value.
userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model('User', userSchema);

// CHANGE: USE "createStrategy" INSTEAD OF "authenticate"
passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

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
app.get('/secrets', function(req,res){
  if(req.isAuthenticated()){
    res.render('secrets');
  } else {
    res.redirect('/login');
  }
})

app.get('/logout', function(req,res){
  req.logout();
  res.redirect('/')
})

//POST request for register and login
app.post('/register', function(req,res){
  //method that comes from passport local mongoose. creates a new user on User model. 
 User.register({username: req.body.username}, req.body.password, function(err, user){  
   if (err){
     console.log(err);
     res.redirect('/register');
   } else {
     passport.authenticate('local')(req, res, function(){ //function that redirects to secrets page
       res.redirect('/secrets');
     })
   }
 })
});
app.post('/login', function(req,res){
 const user = new User({
   username: req.body.username,
   password: req.body.password
 });
 //method coming from passport local mongoose. called on the req, it automatically checks if user shows in the DB
 req.login(user, function(err){
   if(err){
     console.log(err);
   }else{
     passport.authenticate('local')(req, res, function(){
       res.redirect('/secrets');
     })
   }
 })
});


const port = 3000
app.listen(port, () => console.log("app started on port " + port));