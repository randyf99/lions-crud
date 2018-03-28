var lionRouter = require('express').Router();
const Lion = require('../models/lions');

// routes
lionRouter.get('/', (req, res) => {
  Lion.find((err, lions) => {
    if (err) {
      res.send(err);
    }

    // mongoose sends info back in json format
    res.send(lions);
  });
});

lionRouter.get('/:id', (req, res) => {
  Lion.findById(req.params.id, (err, lion) => {
    if (err) {
      res.send(err);
    }

    res.json(lion);
  });
});

lionRouter.post('/', (req, res) => {
  // receive the json Lion object
  const lionObj = new Lion({
    name: req.body.name,
    age: req.body.age,
    pride: req.body.pride,
    gender: req.body.gender
  });

  lionObj.save(err => {
    if (err) {
      res.send(err);
    }

    res.json({ message: 'Lion created' });
  });
});

lionRouter.put('/:id', (req, res) => {
  Lion.findById(req.params.id, (err, lion) => {
    if (err) {
      res.send(err);
    }

    if (req.body.name) {
      lion.name = req.body.name;
    }
    if (req.body.age) {
      lion.age = req.body.age;
    }
    if (req.body.pride) {
      lion.pride = req.body.pride;
    }
    if (req.body.gender) {
      lion.gender = req.body.gender;
    }

    lion.save(err => {
      if (err) {
        res.send(err);
      }

      res.json({ message: 'Update the lion' });
    });
  });
});

lionRouter.delete('/:id', (req, res) => {
  Lion.remove({ _id: req.params.id }, (err, lion) => {
    if (err) {
      res.send(err);
    }

    res.json({ message: 'Deleted the lion' });
  });
});

module.exports = lionRouter;
