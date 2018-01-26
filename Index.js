var sensor = require('node-dht-sensor');
var fs = require('fs');


//var gardenconfig = require('config.json');




console.log("Starting gathering...");
//Promise.all([temperaturereturn()]).then(function (data){
//            console.log('The Temperature is ' + data[0] + '°C');
//        });

var contents = fs.readFileSync('config.json');
var gardenconfig = JSON.parse(contents);

console.log('Temperature field Name: ' + gardenconfig.thingspeak.TemperatureFieldName);
/*var temperaturereturn = function() {
return new Promise((resolve, reject) => {
    console.log('Starting Temperature...');
        sensor.read(11, 4, function(err, temperature, humidity) {
         if (!err) {
                console.log('temp: ' + temperature.toFixed(1) + '°C');
                var response = temperature.toFixed(1);
                console.log(response);
                resolve(response);
                }
        });
}).then(function(data){
    return data
});*/