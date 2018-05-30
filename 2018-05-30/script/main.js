/**
 * Day 4
 * 加特效的虚线
 * 2018-05-30
 */

(function(scope) {
  var RAF = (function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
      window.setTimeout(callback, 1000 / 60);
    };
  })();
  // 获取 Canvas 2D 上下文
  function get2DContext(canvas) {
    var ctx;

    if(typeof(canvas) === 'string') canvas = document.getElementById(canvas);
    if(canvas && canvas.nodeType === 1 && canvas.nodeName === 'CANVAS') {
      ctx = canvas.getContext('2d');
      // 获取设备分辨率信息
      const devicePixelRatio = window.devicePixelRatio || 1;
      const backingStoreRatio = ctx.webkitBackingStorePixelRatio ||
                                ctx.mozBackingStorePixelRatio ||
                                ctx.msBackingStorePixelRatio ||
                                ctx.oBackingStorePixelRatio ||
                                ctx.backingStorePixelRatio || 1;
      const ratio = devicePixelRatio / backingStoreRatio;
      // 按比例缩放Canvas
      canvas.width = canvas.clientWidth * ratio;
      canvas.height = canvas.clientHeight * ratio;
      ctx.scale(ratio, ratio);
      return ctx;
    }else {
      console.error('El is not a Canvas');
      return false;
    }
  }
  // 绘制贝塞尔曲线
  function drawQuadraticCurve(ctx, s, cp, e) {
    ctx.beginPath();
    ctx.moveTo(s.x, s.y);
    ctx.quadraticCurveTo(cp.x, cp.y, e.x, e.y);
    ctx.stroke();
    ctx.closePath();
  }

  // 创建线条类
  var Line = function(a, b, radian) {
    this.a = {x: a.x, y: a.y};
    this.b = {x: b.x, y: b.y};
    this.radian = radian;
    this.na = {x: a.x, y: a.y};
    this.nb = {x: b.x, y: b.y};
    this.progress = Math.random() * 100 >> 0;
  }
  Line.prototype = {
    paint(ctx) {
      // 设置画笔
      var lg = ctx.createLinearGradient(this.a.x - ((this.b.x - this.a.x) * 0.1 >> 0), this.a.y - ((this.b.y - this.a.y) * 0.1 >> 0), this.b.x - ((this.a.x - this.b.x) * 0.1 >> 0), this.b.y - ((this.a.y - this.b.y) * 0.1 >> 0));
      lg.addColorStop(0, 'rgba(255,255,255,.5)');
      lg.addColorStop(Math.max((this.progress - 10) / 100, 0), 'rgba(255,255,255,.5)');
      lg.addColorStop(this.progress / 100, 'rgba(255,255,255,1)');
      lg.addColorStop(Math.min((this.progress + 10) / 100, 1), 'rgba(255,255,255,.5)');
      lg.addColorStop(1, 'rgba(255,255,255,.5)');
      ctx.setLineDash([8,4]);
      ctx.lineWidth = 2;
      ctx.strokeStyle = lg;

      drawQuadraticCurve(ctx, this.a, this.cp, this.b);
    },
    update() {
      // 如坐标变化则进行逐帧归位
      if(this.na.x !== this.a.x) this.a.x += this.na.x - this.a.x > 0 ? 1 : -1;
      if(this.na.y !== this.a.y) this.a.y += this.na.y - this.a.y > 0 ? 1 : -1;
      if(this.nb.x !== this.b.x) this.b.x += this.nb.x - this.b.x > 0 ? 1 : -1;
      if(this.nb.y !== this.b.y) this.b.y += this.nb.y - this.b.y > 0 ? 1 : -1;
      // 进度更新
      this.progress = (this.progress + 0.6) % 100;
    },
    updateLine(a, b, radian) {
      this.radian = radian;
      this.na = {x: a.x, y: a.y};
      this.nb = {x: b.x, y: b.y};
    },
    // 计算贝塞尔曲线控制点坐标
    get cp() {
      if(this.a.x < this.b.x) {
        return {
          x: (this.a.x + this.b.x) / 2 + (this.b.y - this.a.y) / this.radian,
          y: (this.a.y + this.b.y) / 2 - (this.b.x - this.a.x) / this.radian
        };
      }else {
        return {
          x: (this.a.x + this.b.x) / 2 - (this.b.y - this.a.y) / this.radian,
          y: (this.a.y + this.b.y) / 2 + (this.b.x - this.a.x) / this.radian
        };
      }
    }
  };

  scope.initCanvas = function(el) {
    var ctx = get2DContext(el);
    var lines = [];

    function loop() {
      lines.forEach(i => {
        i.update();
      });
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      lines.forEach(i => {
        i.paint(ctx);
      });
      RAF(() => {
        loop();
      });
    }

    loop();

    return {
      addCurve(a, b, radian = 2.6) {
        var l = lines.push(new Line(a, b, radian));
        return l - 1;
      },
      updateLine(poi, a, b, radian = 2.6) {
        lines[poi].updateLine(a, b, radian);
      }
    };
  };
})(window);

var canvas = initCanvas('canvas');
var sp, state = true, poi;

function draw(e) {
  if(sp) {
    if(state) {
      poi = canvas.addCurve(sp, {x: e.offsetX, y: e.offsetY});
      state = false;
    }else {
      canvas.updateLine(poi, sp, {x: e.offsetX, y: e.offsetY})
    }
    sp = null;
  }else {
    sp = {x: e.offsetX, y: e.offsetY};
  }
}
function addNewLine() {
  sp = null;
  state = true;
}




