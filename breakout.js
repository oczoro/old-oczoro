var canvas = document.getElementById("myCanvas");
var ballRadius = 45;
var dx = 2;
var dy = 0;
var ctx = canvas.getContext("2d");
var x = canvas.width/2;
var y = canvas.height/2;

var score = 0;

document.addEventListener("mousedown", mouseClickHandler, false);

function mouseClickHandler(e) {
  var element = canvas;
  var offsetX = 0, offsetY = 0

      if (element.offsetParent) {
    do {
      offsetX += element.offsetLeft;
      offsetY += element.offsetTop;
    } while ((element = element.offsetParent));
  }

  var mx = e.pageX - offsetX;
  var my = e.pageY - offsetY;
  if(!(mx < 0 || mx > canvas.width || my < 0 || my > canvas.height)) {
    if(intersects(mx, my)) {
      if(dx > 0)
        dx++;
      else
        dx--;
      score++;
    } else if(score > 0){
      if(dx > 0)
        dx--;
      else
        dx++;
      score--;
    }
  }
}



function intersects(msx, msy) {
    var disx = msx-(x);
    var disy = msy-(y);
    return disx*disx+disy*disy <= ballRadius*ballRadius;
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI*2);
  ctx.fillStyle = "#000000";
  ctx.fill();
  ctx.closePath();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawScore();
  drawVersion();

  if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }
  if(y + dy < ballRadius || y + dy > canvas.height-ballRadius) {
    dy = -dy;
  }

  x += dx;
  y += dy;
  requestAnimationFrame(draw);
}

function drawScore() {
  ctx.font = "42px Arial";
  ctx.fillStyle = "#000000";
  ctx.fillText("Score: "+score, 8, 42);
}

function drawVersion() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#000000";
  ctx.fillText("0.0.1 v.", 8, canvas.height-16);
}


draw();