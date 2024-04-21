var express = require('express');
var router = express.Router();
var Event = require('../models/event');
var Remark = require('../models/remark');

/* GET users listing. */
router.get('/', function (req, res, next) {
  Event.find({})
    .then((data) => res.render('eventList', { data }))
    .catch((err) => next(err));
});

router.get('/new', (req, res, next) => {
  res.render('form');
});
router.post('/', (req, res, next) => {
  Event.create(req.body)
    .then((info) => res.redirect('/event'))
    .catch((err) => next(err));
});
router.get('/:id', (req, res, next) => {
  var id = req.params.id;
  Event.findById(id)
    .populate('remarks')
    .exec()
    .then((info) => res.render('singleEvent', { info }))
    .catch((err) => next(err));
});

module.exports = router;
