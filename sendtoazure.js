 'use strict';

 var clientFromConnectionString = require('azure-iot-device-mqtt').clientFromConnectionString;
 var Message = require('azure-iot-device').Message;

 var connectionString = 'HostName=ajhub1.azure-devices.net;DeviceId=myFirstNodeDevice;SharedAccessKey=aJpP7HpLuf9s6qr5t/CkM7DJF1faEpdORoP08rmpmVA=';

 var client = clientFromConnectionString(connectionString);

 function printResultFor(op) {
   return function printResult(err, res) {
     if (err) console.log(op + ' error: ' + err.toString());
     if (res) console.log(op + ' status: ' + res.constructor.name);
   };
 }

var connectCallback = function (err) {
   if (err) {
     console.log('Could not connect: ' + err);
   } else {
     console.log('Client connected');    
   }
 };

 client.open(connectCallback);

var sendtoazure={};
sendtoazure.emptyMsg=function(){
    // Create a message and send it to the IoT Hub    
    var data = JSON.stringify({ deviceId: 'myFirstNodeDevice', deviceName: 'light', devicelocation:'kitchen', deviceAction:'on' });
    var message = new Message(data);
    console.log("Sending message: " + message.getData());
    client.sendEvent(message, printResultFor('send'));    
}

module.exports = sendtoazure;