var sensor = require('node-dht-sensor');
var fs = require('fs');
var https = require('https');

var temperaturereturn = function() {
return new Promise((resolve, reject) => {
    console.log('Starting Temperature...');
        sensor.read(11, 4, function(err, temperature, humidity) {
         if (!err) {
                var response = temperature.toFixed(1);
                //console.log('temp: ' + response + '°C');
                //console.log(response);
                resolve(response);
                }
        });
}).then(function(data){
    return data
});
};

var humidityreturn = function() {
return new Promise((resolve, reject) => {
    console.log('Starting humidity...');
        sensor.read(11, 4, function(err, temperature, humidity) {
         if (!err) {
                var response = humidity.toFixed(1);
               // console.log('humidity: ' + response + '%');
               // console.log(response);
                resolve(response);
                }
        });
}).then(function(data){
    return data
});
};

console.log("Starting gathering...");
Promise.all([temperaturereturn(),humidityreturn()]).then(function (data){
      console.log('The Temperature is ' + data[0] + '°C');
        var contents = fs.readFileSync('config.json');
        var gardenconfig = JSON.parse(contents);

        console.log('Temperature field Name: ' + gardenconfig.thingspeak.TemperatureFieldName + ' and temperature is ' + data[0]);
        console.log('Humidity field Name: ' + gardenconfig.thingspeak.HumidityFieldName + ' and humidity is ' + data[1]);

        var updatestring = gardenconfig.thingspeak.APIURL + '&' +  gardenconfig.thingspeak.TemperatureFieldName + '=' + data[0] + '&' +  gardenconfig.thingspeak.HumidityFieldName + '=' + data[1];
        console.log(updatestring);

       // https.get(updatestring + , (response) => {
        //response.on('data', (d) => {
        //    var parsed = JSON.parse(d);
        //    console.log(parsed);
        // });
        //});


        });


