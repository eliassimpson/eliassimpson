var frameRate = 1/40;
var frameDelay = frameRate * 1000;
var canvas = context = false;
var loopTimer = false;
var height = 180;
var width = document.documentElement.clientWidth;
var allBalls = new Array();
var bumpUp = true;

var setup = function(upDown) {
  bumpUp = upDown;
  if (bumpUp == false) {
    var ball = {
      position: {x: 0, y:0},
      velocity: {x: 0, y:0},
      radius: 0,
      restitution: -.7,
      circle : Math.PI * 2,
    };
    ballProperties(ball);
    allBalls.push(ball);
    if (allBalls.length == 1) {
      canvas = document.getElementById("canvas");
      context = canvas.getContext("2d");
      context.canvas.width = width*1; //do we need to define? what is default?
      context.canvas.height = height + 2;
      loopTimer = setInterval(loop, frameDelay);
    }
  }
  //canvas.addEventListener("mousemove", onMouseMove);
}

var ballProperties = function(ball) {
  var ran = Math.random();
  ball.position.x = window.innerWidth * ran;
  ran = Math.random();
  ball.position.y = height * ran;
  ran = Math.random();
  if (ran * 5 > 1) {
    if (ran * 5 > 2) {
      if (ran * 5 > 3) {
        if (ran * 5 > 4) {
          ball.color = "#FF00CC";
        }
        else { ball.color = "#66FFFF"; }
      }
      else { ball.color = "#66FF66"; }
    }
    else { ball.color = "#FFFF33"; }
  }
  else { ball.color = "#FF3366";}
  ran = Math.random();
  ball.radius = (ran*5) * (ran*8);
}

var loop = function() {

  context.clearRect(0,0, window.innerWidth, height);

  context.save();
  for (var i = 0; i < allBalls.length; i++) {
    let ay = 0;
    if (bumpUp == true) {
      allBalls[i].velocity.y = -500;
    }
    else {
      ay = 300;
    }

    allBalls[i].velocity.y += ay * frameRate * Math.sqrt(allBalls[i].radius);
    allBalls[i].position.y += allBalls[i].velocity.y * frameRate;

    if (allBalls[i].position.y > height - allBalls[i].radius) {
      allBalls[i].velocity.y *= allBalls[i].restitution;
      allBalls[i].position.y = height - allBalls[i].radius;
    }


    context.beginPath();
    context.arc(allBalls[i].position.x, allBalls[i].position.y, allBalls[i].radius, 0, Math.PI*2, true);
    context.fillStyle = allBalls[i].color;
    context.fill();
    context.closePath();
  }

  context.restore();
  bumpUp = false;
}
