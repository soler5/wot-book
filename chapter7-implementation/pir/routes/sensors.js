// Final version
var express = require('express'),
  router = express.Router(),
  resources = require('./../resources/model');

router.route('/').get(function (req, res, next) {
  req.result = resources.pi.sensors; //#A
  next(); //#B
});

router.route('/pir').get(function (req, res, next) {
  req.result = resources.pi.sensors.pir;
  next();
});

module.exports = router;