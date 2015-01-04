var exec = require('child_process').exec;
var request = require('request');
var async = require('async');
var config = require('./config.json');


async.forever(
    function(tic) {
        var now = new Date();
        var nowTimestamp = Math.floor(now.getTime() / 1000);
        var prefix = '[' + now.toISOString() + ']';

        async.waterfall([
            // Get the WiFi strength
            function(next) {
                var command = "awk -F '[ \.]' 'NR==3 { print $6 }' /proc/net/wireless";
                var child = exec(command, function(error, stdout, stderr) {
                    next(null, stdout);
                });
            },

            // Gauge
            function(strength, next) {
                // console.log(prefix, strength + '%');

                var boardData = {
                    timestamp: nowTimestamp,
                    value: {
                        current: parseInt(strength),
                        min: 0,
                        max: 100
                    }
                };
                request.post(
                    'https://push.ducksboard.com/v/582941',
                    {
                        auth: {
                            user: config.ducksboardApiKey,
                            pass: 'unused',
                            sendImmediately: true
                        },
                        form: JSON.stringify(boardData)
                    },
                    function (error, response, body) {
                        //console.log(prefix, 'dashboard', response.statusCode);
                        //console.log(body);
                        next(null, strength);
                    }
                );
            },

            // Graph
            function(strength, next) {
                var boardData = {
                    timestamp: nowTimestamp,
                    value: parseInt(strength)
                };
                request.post(
                    'https://push.ducksboard.com/v/582942',
                    {
                        auth: {
                            user: config.ducksboardApiKey,
                            pass: 'unused',
                            sendImmediately: true
                        },
                        form: JSON.stringify(boardData)
                    },
                    function (error, response, body) {
                        //console.log(prefix, 'dashboard', response.statusCode);
                        //console.log(body);
                        next();
                    }
                );
            }

        ], function(error, result) {
            setTimeout(tic, 1000);
        });
    },
    function(error) {
    }
);

