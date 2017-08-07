var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var app = express();

app.use(express.static('dist'));

var url = 'mongodb://localhost:4000';
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server.");
  db.close();
});

app.listen(4000, function(){
  console.log('listening on port 4000...')
})

