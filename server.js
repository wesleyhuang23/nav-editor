var express = require('express');
var app = express();

var port = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// var configDB = require('./config/database.js');
mongoose.connect('mongodb://localhost:27017');
mongoose.connection.once('open',() => console.log('Connected to Mongo'));
var db = mongoose.connection;


var usersSchema = mongoose.Schema({
  name: String
});

var Users = mongoose.model('Users', usersSchema);

var john = new Users({name: 'John'});
console.log(john);
Users.find(function (err, Users) {
  if (err) return console.error(err);
  console.log(Users);
});

// app.use(morgan('dev'));
// app.use(cookieParser());
app.use(bodyParser());

// app.use(session({ secret: 'ilsdkjfhgasdkg823tr7' }));
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(flash());

app.use(express.static('dist'));

app.listen(4000, function(){
  console.log('listening on port 4000...')
})

