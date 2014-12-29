'use strict';
var wpi = require('wiring-pi');
var exec = require('child_process').exec;
var request = require('request');
var async = require('async');
var config = require('./config.json');


wpi.setup();

async.forever(
    function(tic) {
        var now = new Date();
        var prefix = '[' + now.toISOString() + ']';
        var sensor = wpi.digitalRead(0);

        var boardTimestamp = Math.floor(now.getTime() / 1000);

        if (sensor) {
            setImmediate(tic);
            return;
        }

        console.log(prefix, 'BOUM');
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

            setImmediate(tic);
        });


    },
    function(error) {
    }
);

