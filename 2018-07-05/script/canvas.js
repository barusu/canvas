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

      return {ctx, tctx};
    }else {
      console.error('El is not a Canvas');
      return false;
    }
  }


  scope.initCanvas = function(el) {
    var ctxs = get2DContext(el);
    var ctx = ctxs.ctx;
    var video, w, h;
    var cw, ch;

    function resize() {
      cw = ctx.canvas.clientWidth;
      ch = ctx.canvas.clientHeight;
      ctx.canvas.width = cw * ratio;
      ctx.canvas.height = ch * ratio;
      ctx.scale(ratio, ratio);
    }

    function register(v) {
      v.addEventListener('play', function() {
        w = v.videoWidth;
        h = v.videoHeight;
      });
      video = v;
    }

    function loop() {
      if(video && video.duration && !video.ended && !video.paused) {
        var scale = Math.min(cw / w, ch / h) / 2;
        ctx.drawImage(video, (cw / 2 - w * scale) / 2, (ch / 2 - h * scale) / 2, w * scale, h * scale);
        ctx.drawImage(video, cw / 2 + (cw / 2 - w * scale) / 2, (ch / 2 - h * scale) / 2, w * scale, h * scale);
        ctx.drawImage(video, (cw / 2 - w * scale) / 2, ch / 2 + (ch / 2 - h * scale) / 2, w * scale, h * scale);
        ctx.drawImage(video, cw / 2 + (cw / 2 - w * scale) / 2, ch / 2 + (ch / 2 - h * scale) / 2, w * scale, h * scale);
      }
      RAF(() => {
        loop();
      });
    }

    resize();
    loop();
    window.addEventListener('resize', resize, false);

    return {
      playVideo(video) {
        register(video);
      }
    };
  };
})(window);

