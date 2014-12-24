var wpi = require('wiring-pi');
var request = require('request');
var async = require('async');
var config = require('./config.json');

wpi.setup();

async.forever(
    function(tic) {
        var now = new Date();
        var prefix = '[' + now.toISOString() + ']';
        var isOpen = wpi.digitalRead(0);
        var boardValue = '0';
        if (isOpen) {
            console.log(prefix, 'Pas verrouillé');
            boardValue = '1';
        } else {
            console.log(prefix, 'Verrouillé');
        }


        var boardTimestamp = Math.floor(new Date().getTime() / 1000);
        var boardData = '{"timestamp": ' + boardTimestamp + ', "value": ' + boardValue + '}';

        async.series([
            function(next) {
                request.post(
                    'https://push.ducksboard.com/v/582741',
                    {
                        auth: {
                            user: config.ducksboardApiKey,
                            pass: 'unused',
                            sendImmediately: true
                        },
                        form: boardData
                    },
                    function (error, response, body) {
                        //console.log(prefix, 'dashboard', response.statusCode);
                        //console.log(body);
                        next();
                    }
                );
            },
            function(next) {
                request.post(
                    'https://push.ducksboard.com/v/582748',
                    {
                        auth: {
                            user: config.ducksboardApiKey,
                            pass: 'unused',
                            sendImmediately: true
                        },
                        form: boardData
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

