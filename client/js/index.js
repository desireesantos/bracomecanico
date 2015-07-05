
function callArm(direction){
  var url = 'http://localhost:8080/?serverfunction=mecanicArm&value=';
  $.post(url + direction);
}
