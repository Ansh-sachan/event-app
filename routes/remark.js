var express = require('express');
var router = express.Router();

var Remark = require('../models/remark');
var Event = require('../models/event');

// like
router.get('/:id/like', (req, res, next) => {
  var id = req.params.id;
  Remark.findByIdAndUpdate(id, { $inc: { likes: 1 } })
    .then((info) => res.redirect('/event/' + info.eventId))
    .catch((err) => next(err));
});
// edit
router.get('/:id/edit', (req, res, next) => {
  var id = req.params.id;
  Remark.findById(id)
    .then((info) => res.render('remarkForm', { info }))
    .catch((err) => next(err));
});

router.post('/:id', (req, res, next) => {
  var id = req.params.id;
  Remark.findByIdAndUpdate(id, req.body)
    .then((info) => res.redirect('/event/' + info.eventId))
    .catch((err) => next(err));
});

// delete
router.get('/:id/delete', (req, res, next) => {
  var id = req.params.id;
  Remark.findByIdAndDelete(id)
    .then((info) => res.redirect('/event/' + info.eventId))
    .catch((err) => next(err));
});

module.exports = router;
