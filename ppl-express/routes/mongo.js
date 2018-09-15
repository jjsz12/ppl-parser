var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017';
var client;
var db;
MongoClient.connect(url, function(err, client) {
  this.client = client;
  this.db = this.client.db('ppl_data');
});

router.get('/results/:season_id/:week_id', function(req, res, next) {
  console.log(req.params);
  var collection = this.db.collection('results');
  result = collection.find({
    '_id.season_id': parseInt(req.params.season_id),
    '_id.week_id': parseInt(req.params.week_id)
  }).toArray(function(err, items) {
    res.send(items);
  });
});

router.get('/standings/:season_id', function(req, res, next) {
  console.log(req.params);
  var collection = this.db.collection('standings');
  result = collection.find({
    '_id.season_id': parseInt(req.params.season_id)
  }).toArray(function(err, items) {
    res.send(items);
  });
});

module.exports = router;
