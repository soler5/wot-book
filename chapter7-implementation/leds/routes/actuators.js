var express = require('express'),
  router = express.Router(),
  resources = require('./../resources/model');
  var td = require('./../resources/td.json');

router.route('/').get(function (req, res, next) {
  req.result = td; //#A
  next();
});

router.route('/leds').get(function (req, res, next) {
  req.result = resources.pi.actuators.led;
  next();
});

router.route('/led').get(function (req, res, next) { //#A
  req.result = resources.pi.actuators.led;
  next();
}).put(function(req, res, next) { //#B
  var selectedLed = resources.pi.actuators.led;
  selectedLed.value = req.body.value; //#C
  req.result = selectedLed;
  next();
});

module.exports = router;

//#A Callback for a GET request on an LED
//#B Callback for a PUT request on an LED
//#C Update the value of the selected LED in the model


/*
//Initial version:

var express = require('express'),
router = express.Router(),
resources = require('./../resources/model');

router.route('/').get(function (req, res, next) { // #A
 res.send(resources.pi.actuators); // #B
});

router.route('/leds').get(function (req, res, next) { // #C
  res.send(resources.pi.actuators.leds);
});

router.route('/leds/:id').get(function (req, res, next) { //#D
  res.send(resources.pi.actuators.leds[req.params.id]); //#E
});

module.exports = router;

//#A Create a new route for a GET request
//#B Reply with the actuators model when this route is selected
//#C This route serves a list of LEDs
//#D with :id we inject a variable in the path which will be the LED number
//#E the path variables are accessible via req.params.id we use this to select the right object in our model and return it
*/