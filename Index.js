var sensor = require('node-dht-sensor');
var gardenconfig = require('config.json');


var temperaturereturn = function() {
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
});

console.log("Starting gathering...");
Promise.all([temperaturereturn()]).then(function (data){
            console.log('The Temperature is ' + data[0] + '°C');
        });
