/**
 * Day 7
 * canvas图像转背景
 * 2018-06-25
 */

var canvas = initCanvas('canvas');

canvas.drawHexagon([150, 100], 75);

canvas.drawCircle([150, 100], 75);
canvas.drawCircle([150, 100], 80, true);

function copy() {
  var canvas = document.getElementById('canvas');
  document.body.style.backgroundImage = 'url(' + canvas.toDataURL("image/png")+ ')';
}





