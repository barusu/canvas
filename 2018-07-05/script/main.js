/**
 * Day 8
 * 2018-07-05
 */

var video = document.createElement('video');
video.loop = true;
video.src = 'http://www.lawliet.cc/resource/kizunaAI.mp4';
document.body.onclick = function() {
  video.play();
}
var canvas = initCanvas('canvas');
canvas.playVideo(video);



