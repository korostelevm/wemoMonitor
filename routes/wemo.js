var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Wemo = require('../models/Wemo');




router.get('/', function (req, res) {


    Wemo.find().sort({'time': -1}).limit(50).exec(function (err, wemos) {
        if (err) return console.error(err);
        console.log(wemos)


        res.send(wemos);
    })



});


router.get('/latest', function (req, res) {

    Wemo.findOne({}, {}, { sort: { 'time' : -1 } }, function(err, watt) {
  console.log( watt );
        res.send(watt);
});
//    
//    
//    Wemo.findOne(function (err, wemos) {
//        if (err) return console.error(err);
//        console.log(wemos)
//
//
//        res.send(wemos);
//    })



});


module.exports = router;