/**
 * Day 6
 * 轨迹线
 * 2018-06-05
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
  // 计算两点之间的直线距离
  function getDistance(p1, p2) {
    return Math.sqrt((p1[0] - p2[0]) * (p1[0] - p2[0]) + (p1[1] - p2[1]) * (p1[1] - p2[1]));
  }
  // 计算竖六边形的坐标
  function getHexagon(c, radius) {
    if(c && radius && c.length === 2) {
      var t = radius * 0.866;
      return [
        [c[0], c[1] - radius],
        [c[0] - t, c[1] - (radius / 2)],
        [c[0] - t, c[1] + (radius / 2)],
        [c[0], c[1] + radius],
        [c[0] + t, c[1] + (radius / 2)],
        [c[0] + t, c[1] - (radius / 2)],
        [c[0], c[1] - radius]
      ];
    }else return [];
  }

  // 创建轨迹类
  var Trail = function(paths, speed = 1) {
    this.paths = paths;
    this.speed = speed;
    this.shadowColor = '#fff';
    this.shadowBlur = 10;
    this.step = 0;
    this.radius = 2;
    this.old = [];
  }
  Trail.prototype = {
    paint(ctx) {
      var x = this.Points[this.step][0];
      var y = this.Points[this.step][1];
      if(this.old[0] != x || this.old[1] != y) {
        this.old = [x, y];
        ctx.save();
        var grd = ctx.createRadialGradient(x, y, 1, x, y, this.radius);
        grd.addColorStop(0, "rgba(255,255,255,.4)");
        grd.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = grd;
        ctx.shadowColor = this.shadowColor;
        ctx.shadowBlur = this.shadowBlur;
        ctx.beginPath();
        ctx.arc(x, y, this.radius * 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
        ctx.restore();
      }
      this.step ++;
      if(this.step >= this.Points.length) this.step = 0;
    },
    get Points() {
      var points = [], start, end, distance, vx, vy, progress, i;
      for(i = 0; i < this.paths.length - 1; i++) {
        start = this.paths[i];
        end = this.paths[i + 1];
        distance = Math.floor(getDistance(start, end));
        vx = (end[0] - start[0]) / distance;
        vy = (end[1] - start[1]) / distance;
        progress = 0;
        while(progress < distance) {
          progress += this.speed;
          points.push([start[0] + vx * progress, start[1] + vy * progress]);
        }
      }
      return points;
    }
  };

  scope.initCanvas = function(el) {
    var ctx = get2DContext(el);
    var trails = [];

    function loop() {
      ctx.fillStyle = 'rgba(0,0,0,.95)';
      var prev = ctx.globalCompositeOperation;
      ctx.globalCompositeOperation = 'destination-in';
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.globalCompositeOperation = prev;

      trails.forEach(i => {
        i.paint(ctx);
      });
      RAF(() => {
        loop();
      });
    }

    loop();

    return {
      addTrail(paths) {
        trails.push(new Trail(paths));
      },
      getHexagon(c, r) {
        trails.push(new Trail(getHexagon(c, r)));
        console.log(getHexagon(c, r));
      }
    };
  };
})(window);

var canvas = initCanvas('canvas');

canvas.getHexagon([300, 200], 150);





