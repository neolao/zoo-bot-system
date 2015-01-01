'use strict';
var wpi = require('wiring-pi');
var exec = require('child_process').exec;
var request = require('request');
var async = require('async');
var config = require('./config.json');

// Initialize WiringPi
wpi.setup();

var inWoof = false;

// Execute the woof woof
function woof(reason, callback) {
    if (inWoof) {
        callback();
        return;
    }
    inWoof = true;


    var now = new Date();
    var prefix = '[' + now.toISOString() + ']';
    console.log(prefix, 'BOUM', reason);

    async.series([
        function(next) {
            var child = exec('amixer cset numid=1 -- 100%', function(error, stdout, stderr) {
                next();
            });
        },
    
        function(next) {
            var filePath = __dirname + '/sounds/berger2.wav';
            var child = exec('aplay ' + filePath, function(error, stdout, stderr) {
                next();
            });
        },
        function(next) {
            var filePath = __dirname + '/sounds/berger2.wav';
            var child = exec('aplay ' + filePath, function(error, stdout, stderr) {
                next();
            });
        },
        function(next) {
            var filePath = __dirname + '/sounds/berger2.wav';
            var child = exec('aplay ' + filePath, function(error, stdout, stderr) {
                next();
            });
        },
    
        function(next) {
            var child = exec('amixer cset numid=1 -- 0%', function(error, stdout, stderr) {
                next();
            });
        },

    ],
    function(error, result) {
        inWoof = false;
        callback();
    });
}

// Check the sensor
async.forever(
    function(tic) {
        var sensor = wpi.digitalRead(0);

        if (sensor) {
            setImmediate(tic);
            return;
        }

        // Woof Woof
        woof('Shock sensor', function() {
            setImmediate(tic);
        });
    },
    function(error) {
    }
);

// Check the camera
var cameraIndex = 0;
var cameraLastIndex = 0;
async.forever(
    function(tic) {
        async.waterfall([
            function(next) {
                cameraLastIndex = cameraIndex;
                cameraIndex++;
                if (cameraIndex % 10 === 0) {
                    cameraIndex = 0;
                }
                next();
            },

            function(next) {
                var command = 'raspistill \
                    --width 400 \
                    --height 400 \
                    --encoding jpg \
                    --quality 90 \
                    --exposure auto \
                    --ISO 3000 \
                    --timeout 10 \
                    --latest /ram/latest.jpg \
                    --output /ram/camera-' + cameraIndex + '.jpg';
                var child = exec(command, function(error, stdout, stderr) {
                    next();
                });
            },

            function(next) {
                var command = 'compare \
                    -metric MAE \
                    /ram/camera-' + cameraLastIndex + '.jpg \
                    /ram/camera-' + cameraIndex + '.jpg \
                    null:';
                var child = exec(command, function(error, stdout, stderr) {
                    var value = stderr.split(' ')[0];
                    value = parseFloat(value);
                    next(null, value);
                });
            },

            function(value, next) {

                if (value < 1000) {
                    next();
                    return;
                }

                // Woof Woof
                woof('Camera', function() {
                    next();
                });

            }

        ], function(error, result) {
            setImmediate(tic);
        });
    },
    function(error) {
    }
);

