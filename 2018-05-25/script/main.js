/**
 * Day 1
 * 先试着画个圈圈
 */

// demo 1
var canvas1 = document.getElementById('canvas1');
var ctx1 = canvas1.getContext('2d');

ctx1.fillStyle="#700";
ctx1.arc(150, 100, 60, 0, 2 * Math.PI);
ctx1.fill();


// demo 2
var canvas2 = document.getElementById('canvas2');
var ctx2 = canvas2.getContext('2d');
// 获取设备分辨率信息
var devicePixelRatio = window.devicePixelRatio || 1;
var backingStoreRatio = ctx2.webkitBackingStorePixelRatio ||
                          ctx2.mozBackingStorePixelRatio ||
                          ctx2.msBackingStorePixelRatio ||
                          ctx2.oBackingStorePixelRatio ||
                          ctx2.backingStorePixelRatio || 1;
var ratio = devicePixelRatio / backingStoreRatio;
// 按比例缩放Canvas
canvas2.width = canvas2.width * ratio;
canvas2.height = canvas2.height * ratio;
ctx2.scale(ratio, ratio);
// 由于默认笔触在一个像素的中心点 需要偏移半像素
ctx2.translate(0.5, 0.5);

ctx2.fillStyle="#700";
ctx2.arc(150, 100, 60, 0, 2 * Math.PI);
ctx2.fill();

// demo 3
var canvas3 = document.getElementById('canvas3');
var ctx3 = canvas3.getContext('2d');
// 获取设备分辨率信息
var devicePixelRatio = window.devicePixelRatio || 1;
var backingStoreRatio = ctx3.webkitBackingStorePixelRatio ||
                          ctx3.mozBackingStorePixelRatio ||
                          ctx3.msBackingStorePixelRatio ||
                          ctx3.oBackingStorePixelRatio ||
                          ctx3.backingStorePixelRatio || 1;
var ratio = devicePixelRatio / backingStoreRatio;
// 按比例缩放Canvas
canvas3.width = canvas3.width * ratio;
canvas3.height = canvas3.height * ratio;
ctx3.scale(ratio, ratio);

ctx3.fillStyle="rgba(100,0,0,.7)";
var poi = 0;

function draw(e) {
  poi++;
  if(poi >= 666) {
    poi = 0;
    ctx3.clearRect(0, 0, canvas3.width, canvas3.height);
  }
  ctx3.beginPath();
  ctx3.arc(e.offsetX, e.offsetY, Math.random() * 40 + 10, 0, 2 * Math.PI);
  ctx3.fill();
  ctx3.closePath();
}
setInterval(() => {
  draw({offsetX: Math.random() * 600, offsetY: Math.random() * 400});
}, 1000);

