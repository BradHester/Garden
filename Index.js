var sensor = require('node-dht-sensor');
var fs = require('fs');


var temperaturereturn = function() {
return new Promise((resolve, reject) => {
    console.log('Starting Temperature...');
        sensor.read(11, 4, function(err, temperature, humidity) {
         if (!err) {
                var response = temperature.toFixed(1);
                console.log('temp: ' + response + '°C');
                console.log(response);
                resolve(response);
                }
        });
}).then(function(data){
    return data
});
};

var humidityreturn = function() {
return new Promise((resolve, reject) => {
    console.log('Starting Temperature...');
        sensor.read(11, 4, function(err, temperature, humidity) {
         if (!err) {
                var response = humidity.toFixed(1);
                console.log('humidity: ' + response + '%');
                console.log(response);
                resolve(response);
                }
        });
}).then(function(data){
    return data
});
};

//var gardenconfig = require('config.json');

console.log("Starting gathering...");
Promise.all([temperaturereturn()]).then(function (data){
      console.log('The Temperature is ' + data[0] + '°C');
        var contents = fs.readFileSync('config.json');
        var gardenconfig = JSON.parse(contents);

        console.log('Temperature field Name: ' + gardenconfig.thingspeak.TemperatureFieldName);
        console.log('Humidity field Name: ' + gardenconfig.thingspeak.HumidityFieldName);

        });


