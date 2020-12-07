
var oldY = 0;
var canvas = document.getElementById("canvas");
var context = canvas.getContext('2d');
context.canvas.width = window.innerWidth;
context.canvas.height = 500;
canvas.addEventListener("mousemove", onMouseMove);
function onMouseMove(e) {
  if (e.clientY > 200 && oldY < 200 || e.clientY < 200 && oldY > 200) {
    var line = 200;
    var origin = e.clientY;
    if (oldY == 0) {oldY = e.clientY};
    var ran = Math.random();
    var posX = window.innerWidth * ran;
    var posY = 0;
    var cir = Math.PI;
    ran = Math.random();
    if (ran * 2 > 1) {
      posY = line;
    }
    else {
      posY = line * ran;
      cir = cir * 2;
    }
    ran = Math.random();

    if (ran * 5 > 1) {
      if (ran * 5 > 2) {
        if (ran * 5 > 3) {
          if (ran * 5 > 4) {
            context.fillStyle = "#FF00CC";
          }
          else { context.fillStyle = "#66FFFF"; }
        }
        else { context.fillStyle = "#66FF66"; }
      }
      else { context.fillStyle = "#FFFF33"; }
    }
    else {context.fillStyle = "#FF3366";}
    ran = Math.random();
    var size = (ran*4) * (ran*12);
    context.beginPath();
    context.arc(posX, posY, size, 0, cir, true);
    context.fill();
  }
  oldY = e.clientY;
}
