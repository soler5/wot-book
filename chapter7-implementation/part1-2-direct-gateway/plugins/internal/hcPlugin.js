var mqtt = require('mqtt');
var resources = require('./../../resources/model'),
  utils = require('./../../utils/utils.js');

  var client = mqtt.connect("mqtts://raspberry");
  


var interval, sensor;
var model = resources.pi.sensors;
var pluginName = 'US sensor';
var localParams = {'simulate': false, 'frequency': 5000};



exports.start = function (params) {
  localParams = params;
  if (params.simulate) {
    simulate();
  } else {
    connectHardware();
  }
};

exports.stop = function () {
  if (params.simulate) {
    clearInterval(interval);
  } else {
    sensor.unexport();
  }
  console.info('%s plugin stopped!', pluginName);
};

function connectHardware() {

  

const Gpio = require('pigpio').Gpio;

const MICROSECONDS_PER_CM = 1e6/34321;

const trigger = new Gpio(23, {mode: Gpio.OUTPUT});
const ECHO = new Gpio(24, {mode: Gpio.INPUT, alert: true});

client.on('connect', function () {
  trigger.digitalWrite(0);

  const warchHCSR04 = () =>{
    var starTick;
    ECHO.on('alert', (level, tick)=>{
      if (level==1){
        starTick = tick;
      }else{
        const endTick = tick;
        const diff = (endTick>>0) - (starTick>>0);
        model.hc.value = diff/2/MICROSECONDS_PER_CM;
        client.publish('HC-SR04', '[{"value": '+value+'}]');
      }
    })
  }
  warchHCSR04();

  setInterval(()=>{
    trigger.trigger(10, 1);
  }, 1000);
});


};

function simulate() {
  interval = setInterval(function () {
    model.hc.value = utils.randomInt(0, 200);
    showValue();
  }, localParams.frequency);
  console.info('Simulated %s sensor started!', pluginName);
};

function showValue() {
  console.info('Us sensor distance: %s mm \%', model.hc);
};

//#A Initialize the driver for HC on GPIO 12 (as specified in the model)
//#B Fetch the values from the sensors
//#C Update the model with the new temperature and humidity values; note that all observers will be notified
//#D Because the driver doesn’t provide interrupts, you poll the sensors for new values on a regular basis with a regular timeout function and set sensor.read() as a callback
