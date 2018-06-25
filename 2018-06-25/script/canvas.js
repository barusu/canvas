/**
 * Canvas
 * @author shiro https://github.com/barusu
 */

(function(scope) {
  /**
   * Base
   */
  var RAF = (function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
      window.setTimeout(callback, 1000 / 60);
    };
  })();

  var ratio = 1;

  // 获取 Canvas 2D 上下文
  function get2DContext(canvas) {
    var ctx, tctx;
    var trailCanvas = document.createElement("canvas");

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
      ratio = devicePixelRatio / backingStoreRatio;

      // 按比例缩放Canvas
      canvas.width = canvas.clientWidth * ratio;
      canvas.height = canvas.clientHeight * ratio;
      ctx.scale(ratio, ratio);
      // 轨迹层
      trailCanvas.width = canvas.width;
      trailCanvas.height = canvas.height;
      tctx = trailCanvas.getContext('2d');
      tctx.scale(ratio, ratio);

      // test
      // trailCanvas.className = 'canvas';
      // document.body.append(trailCanvas);
      return {ctx, tctx};
    }else {
      console.error('El is not a Canvas');
      return false;
    }
  }

  // 计算两点之间的直线距离
  function getDistance(p1, p2) {
    return Math.sqrt((p1[0] - p2[0]) * (p1[0] - p2[0]) + (p1[1] - p2[1]) * (p1[1] - p2[1]));
  }

  // 直线路径转点数组
  function pathToPoints(path) {
    var points = [], start, end, distance, vx, vy, progress, i;
    for(i = 0; i < path.length - 1; i++) {
      start = path[i];
      end = path[i + 1];
      distance = Math.floor(getDistance(start, end));
      vx = (end[0] - start[0]) / distance;
      vy = (end[1] - start[1]) / distance;
      progress = 0;
      while(progress < distance) {
        progress++;
        points.push([start[0] + vx * progress, start[1] + vy * progress]);
      }
    }
    return points;
  }

  // 圆转点数组 (顺时针)
  function circleToPoints(c, radius) {
    var points = [], min = 1 / radius, progress = 0;
    while(progress < Math.PI * 2) {
      points.push([c[0] + (Math.sin(progress) * radius), c[1] - (radius * Math.cos(progress))]);
      progress += min;
    }
    points.push([c[0], c[1] - radius]);
    return points;
  }


  /**
   * Tool
   */
  // 计算六边形的坐标 [竖: 逆时针, 顶部开始  横: 逆时针, 左边开始](vertical, transverse)
  function getHexagon(c, radius, direction = 'vertical') {
    if(c && radius && c.length === 2) {
      var t = radius / 2 * Math.sqrt(3);
      if(direction === 'vertical') {
        return [
          [c[0], c[1] - radius],
          [c[0] - t, c[1] - (radius / 2)],
          [c[0] - t, c[1] + (radius / 2)],
          [c[0], c[1] + radius],
          [c[0] + t, c[1] + (radius / 2)],
          [c[0] + t, c[1] - (radius / 2)],
          [c[0], c[1] - radius]
        ];
      }else {
        return [
          [c[0] -radius, c[1]],
          [c[0] - (radius / 2), c[1] - t],
          [c[0] + (radius / 2), c[1] - t],
          [c[0] + radius, c[1]],
          [c[0] + (radius / 2), c[1] + t],
          [c[0] - (radius / 2), c[1] + t],
          [c[0] - radius, c[1]]
        ];
      }
    }else return [];
  }

  // 创建轨迹类
  var Trail = function(option) {
    if(option.points) {
      this.points = option.points;
    }else if(option.path) {
      this.points = pathToPoints(option.path);
    }
    if(!this.points) this.points = [];
    this.step = 0;
    this.old = [];
    this.brush = option.brush || '#fff';
    this.shadowColor = option.shadowColor || '#fff';
    this.shadowBlur = option.shadowBlur || 0;
    this.radius = option.radius || 1;
    this.speed = option.speed || 1;
    this.progress = 0;
  }
  Trail.prototype = {
    get plength() {
      return this.points.length;
    },
    paint(ctx) {
      var preservation = true;
      this.progress += this.speed;
      while(this.step < this.progress && this.step < this.plength) {
        this.draw(ctx);
        this.step++;
        preservation = false;
      }
      if(preservation) this.draw(ctx);
      if(this.step >= this.plength) {
        this.step = 0;
        this.progress -= this.plength;
      }
    },
    draw(ctx) {
      var x = this.points[this.step][0];
      var y = this.points[this.step][1];
      if(this.old[0] != x || this.old[1] != y) {
        this.old = [x, y];
        ctx.save();
        ctx.fillStyle = this.brush;
        ctx.shadowColor = this.shadowColor;
        ctx.shadowBlur = this.shadowBlur;
        ctx.beginPath();
        ctx.arc(x, y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
        ctx.restore();
      }
    }
  };

  // 圈圈类
  var Circle = function(option) {
    this.radius = option.radius || 7;
    this.c = option.c;
    this.brush = option.brush || '#fff';
    this.width = option.width || 1;
  }
  Circle.prototype = {
    paint(ctx) {
      ctx.save();
      ctx.strokeStyle = this.brush;
      ctx.lineWidth = this.width;
      ctx.beginPath();
      ctx.arc(this.c[0], this.c[1], this.radius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.closePath();
      ctx.restore();
    }
  };

  // 路径类
  var Path = function(option) {
    this.path = option.path;
    this.brush = option.brush || '#fff';
    this.width = option.width || 1;
  }
  Path.prototype = {
    paint(ctx) {
      var poi = 0;
      ctx.save();
      ctx.strokeStyle = this.brush;
      ctx.lineWidth = this.width;
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(this.path[poi][0], this.path[poi][1]);
      poi++;
      while(poi < this.path.length) {
        ctx.lineTo(this.path[poi][0], this.path[poi][1]);
        poi++;
      }
      ctx.stroke();
      ctx.closePath();
      ctx.restore();
    }
  };

  scope.initCanvas = function(el) {
    var ctxs = get2DContext(el);
    var normal = [];
    var trails = [];

    function loop() {
      ctxs.tctx.fillStyle = 'rgba(0,0,0,.95)';
      var prev = ctxs.tctx.globalCompositeOperation;
      ctxs.tctx.globalCompositeOperation = 'destination-in';
      ctxs.tctx.fillRect(0, 0, ctxs.tctx.canvas.width / ratio, ctxs.tctx.canvas.height / ratio);
      ctxs.tctx.globalCompositeOperation = prev;

      trails.forEach(i => {
        i.paint(ctxs.tctx);
      });

      ctxs.ctx.clearRect(0, 0, ctxs.ctx.canvas.width / ratio, ctxs.ctx.canvas.height / ratio);

      normal.forEach(i => {
        i.paint(ctxs.ctx);
      });
      ctxs.ctx.globalCompositeOperation = 'source-over';
      ctxs.ctx.drawImage(ctxs.tctx.canvas, 0, 0, ctxs.tctx.canvas.width / ratio, ctxs.tctx.canvas.height / ratio);
      RAF(() => {
        loop();
      });
    }

    loop();

    return {
      drawTrail(path) {
        trails.push(new Trail({
          path
        }));
      },
      drawHexagon(c, radius, direction) {
        // trails.push(new Trail({
        //   path: getHexagon(c, radius, direction)
        // }));
        var path = getHexagon(c, radius, direction);
        for(var i = 0; i < path.length - 1; i++) {
          trails.push(new Trail({
            path: [path[i], path[i + 1]],
            speed: 1
          }));
        }
        normal.push(new Path({
          path,
          brush: 'rgba(255,255,255,.4)'
        }));
        normal.push(new Path({
          path: [path[0], path[2], path[5], path[3], path[1], path[4], path[6]],
          brush: 'rgba(255,255,255,.5)'
        }));
        trails.push(new Trail({
          path: [path[0], path[2], path[5], path[3], path[1], path[4], path[6]],
          speed: 2
        }));
        trails.push(new Trail({
          path: [path[3], path[5], path[2], path[6], path[4], path[1], path[3]],
          speed: 3
        }));
      },
      drawCircle(c, radius, reverse) {
        var points = circleToPoints(c, radius);
        if(reverse) points.reverse();
        trails.push(new Trail({
          points: points
        }));
        normal.push(new Circle({
          c,
          radius,
          brush: 'rgba(255,255,255,.4)'
        }));
      }
    };
  };
})(window);

