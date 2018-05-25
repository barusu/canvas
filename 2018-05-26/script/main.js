/**
 * Day 2
 * 试试看画之后工作上可能会用到的轨迹线
 */

// demo
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
// 获取设备分辨率信息
const devicePixelRatio = window.devicePixelRatio || 1;
const backingStoreRatio = ctx.webkitBackingStorePixelRatio ||
                          ctx.mozBackingStorePixelRatio ||
                          ctx.msBackingStorePixelRatio ||
                          ctx.oBackingStorePixelRatio ||
                          ctx.backingStorePixelRatio || 1;
const ratio = devicePixelRatio / backingStoreRatio;
// 按比例缩放Canvas
canvas.width = canvas.width * ratio;
canvas.height = canvas.height * ratio;
ctx.scale(ratio, ratio);

ctx.fillStyle="rgba(100,0,0,.7)";

var sp; // startPoint

function draw(e) {
  if(sp) {
    // to do
    ctx.beginPath();
    ctx.moveTo(sp.x, sp.y);
    ctx.arcTo(sp.x, e.offsetY, e.offsetX, e.offsetY, 50);
    ctx.stroke();
    ctx.closePath();
    sp = null;
  }else {
    sp = {x: e.offsetX, y: e.offsetY};
  }
}

