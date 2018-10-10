/**
 * Day 9
 * 2018-09-27
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
  var ratio = window.devicePixelRatio || 1;
  var width, height, renderer, camera, scene, light;

  function initCamera() {
    camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
    camera.position.x = 0;
    camera.position.y = 1000;
    camera.position.z = 0;
    camera.up.x = 0;
    camera.up.y = 0;
    camera.up.z = 1;
    camera.lookAt({
      x : 0,
      y : 0,
      z : 0
    });
  }
  function render() {
    renderer.clear();
    renderer.render(scene, camera);
    RAF(render);
  }
  function init(el) {
    if(el.nodeType === 1) {
      scene = new THREE.Scene();

      light = new THREE.DirectionalLight(0xFF0000, 1.0, 0);
      light.position.set(100, 100, 200);
      scene.add(light);

      width = el.clientWidth;
      height = el.clientHeight;
      renderer = new THREE.WebGLRenderer({
        antialias : true
      });
      renderer.setSize(width, height);
      el.appendChild(renderer.domElement);
      renderer.setClearColor(0x99FFFF, 1.0);

      initCamera();

      render();

      draw();
    }
  }

  function draw() {
    var geometry = new THREE.Geometry();
    var material = new THREE.LineBasicMaterial( { vertexColors: true, Linewidth: 10} );
    var color1 = new THREE.Color( 0x444444 ), color2 = new THREE.Color( 0xFF0000 );

    // 线的材质可以由2点的颜色决定
    var p1 = new THREE.Vector3( -100, 0, 100 );
    var p2 = new THREE.Vector3(  100, 0, -100 );
    geometry.vertices.push(p1);
    geometry.vertices.push(p2);
    geometry.colors.push( color1, color2 );

    var line = new THREE.Line( geometry, material, THREE.LineSegments );
    scene.add(line);
  }

  init(document.getElementById('canvas-frame'));
})(window);

