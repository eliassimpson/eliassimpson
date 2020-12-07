var frameRate = 1/40;
var frameDelay = frameRate * 1000;
var canvas = context = false;
var loopTimer = false;
var height = window.innerHeight /3;
var width = window.innerWidth;
var allBalls = new Array();
var bumpUp = false;

var setup = function() {
  onDrop = true;
  var ball = {
    position: {x: 0, y:0},
    velocity: {x: 0, y:10},
    radius: 0,
    restitution: -.7,
    circle : Math.PI * 2,
  };
  ballProperties(ball);
  allBalls.push(ball);
  if (allBalls.length == 1) {
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
    context.canvas.width = width; //do we need to define? what is default?
    context.canvas.height = height + 2;
    loopTimer = setInterval(loop, frameDelay);
  }
  //canvas.addEventListener("mousemove", onMouseMove);
}

var bump = function () {
  bumpUp = true;
}

var ballProperties = function(ball) {
  var ran = Math.random();
  ball.position.x = window.innerWidth * ran;
  ran = Math.random();
  ball.position.Y = height * ran;
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
  ball.radius = (ran*4) * (ran*12);
}

var loop = function() {

  context.clearRect(0,0, window.innerWidth, height);

  context.save();
  for (var i = 0; i < allBalls.length; i++) {
    let ay = 4000;
    if (bumpUp == true && allBalls[i].velocity.y * allBalls[i].velocity.y < 0.001) {
      allBalls[i].velocity.y = -10000;
    }
    else {
      allBalls[i].velocity.y += ay * frameRate;
      allBalls[i].position.y += allBalls[i].velocity.y * frameRate;
      allBalls[i].position.x = allBalls[i].position.x;

      if (allBalls[i].position.y > height - allBalls[i].radius) {
        allBalls[i].velocity.y *= allBalls[i].restitution;
        allBalls[i].position.y = height - allBalls[i].radius;
      }
    }

    context.beginPath();
    context.arc(allBalls[i].position.x, allBalls[i].position.y, allBalls[i].radius, 0, Math.PI*2, true);
    context.fillStyle = allBalls[i].color;
    context.fill();
    context.closePath();
    bumpUp = false;
  }

  context.restore();

}
