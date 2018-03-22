var lionRouter = require('express').Router();

var lions = [];
var id = 0;

var updateId = function(req, res, next) {
  if (!req.body.id) {
    id++;
    req.body.id = id + '';
  }

  next();
};

lionRouter.param('id', function(req, res, next, id) {
  var lion = lions.find(lion => lion.id == id);

  if (lion) {
    req.lion = lion;
    next();
  } else {
    res.send();
  }
});

// routes
lionRouter.get('/', (req, res) => {
  res.json(lions);
});

lionRouter.get('/:id', (req, res) => {
  var lion = req.lion;
  res.json(lion || {});
});

lionRouter.post('/', updateId, (req, res) => {
  var lion = req.body;

  lions.push(lion);

  res.json(lion);
});

lionRouter.put('/:id', (req, res) => {
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

lionRouter.delete('/:id', (req, res) => {
  var lion = lions.findIndex(lion => lion.id == req.params.id);
  if (!lions[lion]) {
    res.send();
  } else {
    var deletedLion = lions[lion];
    lions.splice(lion, 1);
    res.json(deletedLion);
  }
});

module.exports = lionRouter;
