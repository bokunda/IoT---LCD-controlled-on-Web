var express = require('express');
var httpClient = require('http');
var app = new express();

var http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server);

var bodyParser = require('body-parser');
// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

var rezultat;

const SerialPort = require('serialport');
const Readline = SerialPort.parsers.Readline;
var port = new SerialPort('COM3', {baudRate: 9600}, function (err) 
{
	if (err) 
	{
		return console.log('Error on create : ', err.message);
	}		
});

const parser = port.pipe(new Readline({ delimiter: '\r\n' }));

port.on('error', function(err) 
	{
		console.log('Any Error: ', err.message);
	})

parser.on('data', function(data)
	{			
		console.log(data);		
		arduino.emit("results", {"results": "OK"})
	})

app.use(express.static('public'));

/*
function splitTextAndSend(text) {

	var str = "";
	var i = 0;
	var length = text.length;

	if (length > 32) {
		while (length > 32) {
			str = text.slice(i, i+32);
			setTimeout(function() {
				port.write(str, function (err) {
					if (err) {
						console.log('Error on write: ', err.message);
					}
				});
			}, 3000);
			
			i+=32;
			length -= 32;
		}

		str = text.slice(i);
		setTimeout(function() {
			port.write(str, function (err) {
				if (err) {
					console.log('Error on write: ', err.message);
				}
			});
		}, 3000);
	}
	else {
		setTimeout(function() {
			port.write(text, function (err) {
				if (err) {
					console.log('Error on write: ', err.message);
				}
			});
		}, 3000);
	}

}
*/

var arduino = io.of("/arduino").on('connection', function(socket)
{
	console.log('Arduino user connected');
	


	
		socket.on('sendArduino', function(arg)
		{	
			if(arg.text != undefined)
			{
				port.write(arg.text, function (err) {
					if (err) {
						console.log('Error on write: ', err.message);
					}
				});
			}
			else
			{
				port.write("d-"+arg.delay, function (err) {
					if (err) {
						console.log('Error on write: ', err.message);
					}
				});
			}
		});
});

server.listen(3000);    
console.log("Express server listening at 3000");
