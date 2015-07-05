var narf = require('narf');
var five = new require('johnny-five');
var board = five.Board();

var sideControl = 0;
var rightControl = 0;
var leftControl = 0;

var upDownControl = 0;

var minPosition = 50;
var maxPosition = 170;

board.on('ready', function() {
  console.log("Starting ..");
  var bottonServo = new five.Servo(5);
  var rightServo = new five.Servo(6);
  var leftServo = new five.Servo(3);
  var armServo = new five.Servo(11); 
  
  var APIFunctions = {
    POST : {
      mecanicArm : function (data, callback){
        var command = data.url.value;

        if (command ==='right') {
          sideControl +=90;
          bottonServo.to(sideControl);
        };
        if (command ==='left') {
          sideControl -=90;
          bottonServo.to(sideControl);
        };

        if (command ==='front') {
          rightControl +=90;
          rightServo.to(rightControl);
        };
        if (command ==='back') {
          rightControl -=90;
          rightServo.to(rightControl);
        };  

        if (command ==='up') {
          leftServo.to(minPosition);
        };
        if (command ==='down') {
          leftServo.to(maxPosition);
        };

         if ( command ==='open') {
          armServo.to(minPosition);
        };
        if (command ==='close') {
          armServo.to(maxPosition);
        };  
        
       callback( command ); 
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

