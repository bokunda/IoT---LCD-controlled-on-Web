var socket = io.connect("127.0.0.1:3000/arduino");
var command = document.getElementById("command");
var button = document.getElementById("send");
var btnRnd = document.getElementById("btnRnd");
var btnClear = document.getElementById("btnClear");
var result = document.getElementById("result");

var randomMSG = 
[
    "Ono što vodi i vuče svet, nisu lokomotive, nego ideje.",
    "Čovek može da umre, nacije da se uzdižu i padaju, ali ideja i dalje živi.",
    "Bolje malo pivo, nego veliko hvala!"    
];

var clearMSG = "                                  ";

var zahtev = function()
{
	socket.emit("sendArduino", {"text": command.value});
}

var rndZahtev = function()
{
    socket.emit("sendArduino", {"text": randomMSG[1]});
}

var clearZahtev = function()
{
    socket.emit("sendArduino", {"text": clearMSG});
}

button.addEventListener("click", zahtev);
btnRnd.addEventListener("click", rndZahtev);
btnClear.addEventListener("click", clearZahtev);
		
socket.on('results', function(msg)
{
	result.innerHTML = msg.results;
});