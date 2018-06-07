/**
 * Day 6
 * 轨迹线
 * 2018-06-05 - 2018-06-07 弄了三天 封装有点麻烦 而且工作日空余时间也不多
 * 静态内容与动态内容分层绘制
 * emmm 直接绘制运动轨迹始终会有一点残留,但是在虚拟的canvas上绘制再复制过来就没有残留了.
 */

var canvas = initCanvas('canvas');

canvas.drawHexagon([300, 200], 150);

canvas.drawCircle([300, 200], 150);
canvas.drawCircle([300, 200], 160, true);





