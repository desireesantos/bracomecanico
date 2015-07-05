var narf = require('narf');
var five = new require('johnny-five');
var board = five.Board();

var sideControl = 0;
var minRightPosition = 90;
var maxRightPosition = 150;

var minLeftPosition = 70;
var maxLeftPosition = 130;

var minArmPosition = 50;
var maxArmPosition = 170;

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

        if (command ==='back') {
          rightServo.to(minRightPosition);
        };
        if (command ==='front') {
          rightServo.to(maxRightPosition);
        };  

        if (command ==='up') {
          leftServo.to(minLeftPosition);
        };
        if (command ==='down') {
          leftServo.to(maxLeftPosition);
        };

         if ( command ==='open') {
          armServo.to(minArmPosition);
        };
        if (command ==='close') {
          armServo.to(maxArmPosition);
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

