/**
 * Day 2
 * 试试看画之后工作上可能会用到的轨迹线
 * 2018-05-26 --> 2018-05-28 周末参加婚礼去了
 */

(function(scope) {
  scope.initCanvas = function(el) {
    // 绘制贝塞尔曲线
    function drawQuadraticCurve(s, cp, e) {
      ctx.beginPath();
      ctx.moveTo(s.x, s.y);
      ctx.quadraticCurveTo(cp.x, cp.y, e.x, e.y);
      ctx.stroke();
      ctx.closePath();
    }
    // 两点画线（曲线）
    function curve(a, b, radian = 2.6) {
      var cp = {
        x: (a.x + b.x) / 2 + (b.y - a.y) / radian,
        y: (a.y + b.y) / 2 - (b.x - a.x) / radian
      };
      drawQuadraticCurve(a, cp, b);
    }

    if(typeof(el) === 'string') el = document.getElementById(el);
    if(el && el.nodeType === 1 && el.nodeName === 'CANVAS') {
      var ctx = el.getContext('2d');
      // 获取设备分辨率信息
      const devicePixelRatio = window.devicePixelRatio || 1;
      const backingStoreRatio = ctx.webkitBackingStorePixelRatio ||
                                ctx.mozBackingStorePixelRatio ||
                                ctx.msBackingStorePixelRatio ||
                                ctx.oBackingStorePixelRatio ||
                                ctx.backingStorePixelRatio || 1;
      const ratio = devicePixelRatio / backingStoreRatio;
      // 按比例缩放Canvas
      el.width = el.width * ratio;
      el.height = el.height * ratio;
      ctx.scale(ratio, ratio);
      return {
        curve
      };
    }else {
      scope.debug && console.error('el not a canvas');
      return false;
    }
  };
})(window);

var canvas = initCanvas('canvas');
var sp;

function draw(e) {
  if(sp) {
    canvas.curve(sp, {x: e.offsetX, y: e.offsetY});
    sp = null;
  }else {
    sp = {x: e.offsetX, y: e.offsetY};
  }
}




