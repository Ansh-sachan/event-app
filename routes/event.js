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
// likes and dislikes
router.get('/:id/like', (req, res, next) => {
  var id = req.params.id;
  Event.findByIdAndUpdate(id, { $inc: { likes: 1 } })
    .then((data) => res.redirect('/event/' + id))
    .catch((err) => next(err));
});
router.get('/:id/dislike', (req, res, next) => {
  var id = req.params.id;
  Event.findByIdAndUpdate(id, { $inc: { dislikes: 1 } })
    .then((data) => res.redirect('/event/' + id))
    .catch((err) => next(err));
});

// edit and delete
router.get('/:id/edit', (req, res, next) => {
  var id = req.params.id;
  Event.findById(id)
    .then((info) => res.render('editForm', { info }))
    .catch((err) => next(err));
});
router.post('/:id', (req, res, next) => {
  var id = req.params.id;
  Event.findByIdAndUpdate(id, req.body)
    .then((info) => res.redirect('/event/' + id))
    .catch((err) => next(err));
});
router.get('/:id/delete', (req, res, next) => {
  var id = req.params.id;
  Event.findByIdAndDelete(id)
    .then((info) => res.redirect('/event'))
    .catch((err) => next(err));
});

// Add remark

router.post('/:id/remark', (req, res, next) => {
  var id = req.params.id;
  req.body.eventId = id;
  Remark.create(req.body)
    .then((info) => {
      Event.findByIdAndUpdate(id, { $push: { remarks: info._id } })
        .then((data) => {
          res.redirect('/event/' + id);
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
});

// filter by category
router.get('/:category/single', (req, res, next) => {
  var category = req.params.category;
  Event.find({ event_category: category })
    .then((data) => res.render('categoryWiseEvent', { data }))
    .catch((err) => next(err));
});

module.exports = router;
