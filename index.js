var narf = require('narf');
var five = new require('johnny-five');
var board = new require('johnny-five').Board();

board.on('ready', function() {
  console.log("Starting ..");
  var bottonServo = new five.Servo(5);
  var APIFunctions = {
    POST : {
      mecanicArm : function (data, callback ){
        console.log(data.url.value);
      }
    }};

  var hs = new narf.HttpServer().start( 8080 );
  hs.on( 'port', function( port ){
    console.log('Start server on port', port);
    hs.addAPI( { functions : APIFunctions } );
  } );
});

narf.pageServer({ 
  port: 8000,
  path: __dirname + '/client/'
});