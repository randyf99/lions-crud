var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');

var app = express();

mongoose.connect('mongodb://yoda:yodaLionsdb@ds123919.mlab.com:23919/lions');

var lionRouter = require('./lions');

app.use(morgan('dev'));
app.use(express.static('client'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// we need to mount the routes
app.use('/lions', lionRouter);

app.use((err, req, res, next) => {
  if (err) {
    res.status(500).send(error);
  }
});

module.exports = app;
