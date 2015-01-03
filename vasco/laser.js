'use strict';
var wpi = require('wiring-pi');
var exec = require('child_process').exec;
var request = require('request');
var async = require('async');
var config = require('./config.json');

// Initialize WiringPi
wpi.setup();

wpi.pinMode(0, wpi.modes.OUTPUT);
wpi.digitalWrite(0, 1);

var lastDetect = 0;
async.forever(
    function(tic) {
        var now = new Date();
        var prefix = '[' + now.toISOString() + ']';
        var sensor = wpi.digitalRead(1);
    
        if (sensor === lastDetect) {
            setImmediate(tic);
            return;
        }
        lastDetect = sensor;

        if (sensor) {
            console.log(prefix, 'Laser OFF');
        } else {
            console.log(prefix, 'Laser ON');
        }

        setImmediate(tic);
    },
    function(error) {
    }
);



