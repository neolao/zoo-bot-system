var wpi = require('wiring-pi');
var request = require('request');
var async = require('async');
var config = require('./config.json');

wpi.setup();

var wasOpen = false;
async.forever(
    function(tic) {
        var now = new Date();
        var prefix = '[' + now.toISOString() + ']';
        var sensor = wpi.digitalRead(0);
        var isOpen = (sensor)?true:false;

        if (wasOpen === isOpen) {
            tic();
            return;
        }
        wasOpen = isOpen;

        if (isOpen) {
            console.log(prefix, 'Pas verrouillé');
        } else {
            console.log(prefix, 'Verrouillé');
        }


        var boardTimestamp = Math.floor(new Date().getTime() / 1000);

        async.series([
            function(next) {
                var boardData = {
                    timestamp: boardTimestamp,
                    value: (isOpen)?1:0
                };
                request.post(
                    'https://push.ducksboard.com/v/582741',
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
            },
            function(next) {
                var boardData = {
                    timestamp: boardTimestamp,
                    value: {
                        title: (isOpen)?'Déverrouillée':'Verrouillée',
                        image: (isOpen)?'http://download.neolao.com/images/icon-unlocked.png':'http://download.neolao.com/images/icon-locked.png',
                        content: (isOpen)?'La porte est déverrouillée':'La porte est verrouillée'
                    }
                };
                request.post(
                    'https://push.ducksboard.com/v/582885',
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

