var express = require('express');
var app = express();

var port = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

app.use(bodyParser());
// var configDB = require('./config/database.js');
mongoose.connect('mongodb://localhost:27017');
mongoose.connection.once('open',() => console.log('Connected to Mongo'));
var db = mongoose.connection;

//mongoose schemas
var menuSchema = mongoose.Schema({
  id: {type: Number, required: true, unique: true},
  name: {type: String}
});

var navItemSchema = mongoose.Schema({
  id: {type: Number, required: true, unique: true},
  name: {type: String},
  link: {type: String},
  parent: {type: String},
  catagoryId: {type: Number}
});

//mongoose models
var Menu = mongoose.model('Menu', menuSchema);
var NavItems = mongoose.model('navItems', navItemSchema);

//get parent menu items
app.get('/menu', function(req, res) {
  Menu.find({}, function(err, menus) {
    console.log(menus, 'menus');
    res.send(menus);
  });
});

//get children menu items
app.get('/navitems', function(req, res) {
  NavItems.find({}, function(err, navItems) {
    console.log(navItems, 'navitems');
    res.send(navItems);
  });
});

//adding parent menu items
app.post('/menu', function(req, res){
  console.log(req.body);
  const newMenu = new Menu({
    id: req.body.id,
    name: req.body.name
  })
  newMenu.save(function(err, menu){
    if(err) return res.status(500).json(err);
    return res.status(200).json(menu);
  });
})

app.delete('/delete/:id', function(req, res){
  console.log('we r in delete',req.params);
  Menu.findOneAndRemove({id: req.params.id}, function(err, removedItem){
    console.log(removedItem);
    return res.status(200).json(removedItem);
  });
  
})

app.use(express.static('dist'));

app.listen(4000, function(){
  console.log('listening on port 4000...')
})

