var narf = require('narf');
var five = new require('johnny-five');
var board = five.Board();
var leftRightSide = 0;

board.on('ready', function() {
  console.log("Starting ..");
  var bottonServo = new five.Servo(5);
  var APIFunctions = {
    POST : {
      mecanicArm : function (data, callback ){
        console.log(data.url.value);
        if (data.url.value ==='left') {
          controlLeftRighSide +=90;
          bottonServo.to(leftRightSide);
        };
        if (data.url.value ==='right') {
          controlLeftRighSide -=90;
          bottonServo.to(leftRightSide);
        };
        callback( data.url.value );
      }
    }};

  var hs = new narf.HttpServer().start( 8080 );
  hs.on( 'port', function( port ){
    console.log('Start server on port', port);
    hs.addAPI( { functions : APIFunctions } );
  } );
  hs.on( 'error', function( err ){
  console.log( err );
} );
});

narf.pageServer({ 
  port: 8000,
  path: __dirname + '/client/'
});

