var sensor = require('node-dht-sensor');
var fs = require('fs');
var https = require('https');
var cron = require('node-schedule');


var readingreturn = function() {
return new Promise((resolve, reject) => {
    console.log('Starting Reading...');
        sensor.read(11, 4, function(err, temperature, humidity) {
         if (!err) {
                var response = [];
                response[0] = temperature.toFixed(0);
                response[1] = humidity.toFixed(0);
                console.log('Returning Temperature: ' + response[0] + ' & Humidity: ' + response[1]);
                resolve(response);
                }
        });
}).then(function(data){
    return data
});
};



function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

var rule = new cron.RecurrenceRule();
cron.scheduleJob('*/5 * * * *', function(){
    const now = new Date();

    console.log('****************************************************');
    console.log(now + " - Starting gathering...");
    var initialisepromise = readingreturn();
    initialisepromise.then(function (data){
      console.log('Updating Thingspeak with: ');

        var contents = fs.readFileSync('/home/pi/IoT/Garden/config.json');
        var gardenconfig = JSON.parse(contents);
            var updatestring = gardenconfig.thingspeak.APIURL + '&' +  gardenconfig.thingspeak.TemperatureFieldName + '=' + data[0] + '&' +  gardenconfig.thingspeak.HumidityFieldName + '=' + data[1];
            console.log(updatestring);
            https.get(updatestring, (response) => {
                response.on('data', (d) => {
                    if (isJson(d)) {
                      var parsed = JSON.parse(d);
                      console.log('Channel updated with entry: ' + parsed);
                    }
                    else {
                      console.log('Error occurred updating Thingspeak');
                    }
                });
            }).on('error', (e) => {
                console.error(e);
              });
        });
});
