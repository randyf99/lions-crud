var express = require('express');
var morgan = require('morgan');

var app = express();

var lions = [];
var id = 0;

var updateId = function(req, res, next) {
  if (!req.body.id) {
    id++;
    req.body.id = id + '';
  }

  next();
};

app.use(morgan('dev'));
app.use(express.static('client'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((err, req, res, next) => {
  if (err) {
    res.status(500).send(error);
  }
});

app.param('id', function(req, res, next, id) {
  var lion = lions.find(lion => lion.id == id);

  if (lion) {
    req.lion = lion;
    next();
  } else {
    res.send();
  }
});

// routes
app.get('/lions', (req, res) => {
  res.json(lions);
});

app.get('/lions/:id', (req, res) => {
  var lion = req.lion;
  res.json(lion || {});
});

app.post('/lions', updateId, (req, res) => {
  var lion = req.body;

  lions.push(lion);

  res.json(lion);
});

app.put('/lions/:id', (req, res) => {
  var update = req.body;
  if (update.id) {
    delete update.id;
  }

  var lion = lions.findIndex(lion => lion.id == req.params.id);
  if (!lions[lion]) {
    res.send();
  } else {
    var updatedLion = Object.assign({}, lions[lion], update);
    res.json(updatedLion);
  }
});

app.delete('/lions/:id', (req, res) => {
  var lion = lions.findIndex(lion => lion.id == req.params.id);
  if (!lions[lion]) {
    res.send();
  } else {
    var deletedLion = lions[lion];
    lions.splice(lion, 1);
    res.json(deletedLion);
  }
});

app.listen(3000, () => {
  console.log('on port 3000');
});
