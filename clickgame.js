var canvas = document.getElementById("myCanvas");
var ballRadius = 45;
var dx = 2;
var dy = 0;
var ctx = canvas.getContext("2d");
var x = canvas.width/2;
var y = canvas.height/2;

var score = 0;

var ballColor = "#FFFFFF";
var colorRate = .01;

var fase = 0;
var i = 0;

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
      colorRate += .00123;
      if(dx > 0)
        dx++;
      else
        dx--;
      score++;
    } else if(score > 0){
      if(!(colorRate - .00123 < .01))
        colorRate -= .00123;
      
      if(dx > 0)
        dx--;
      else
        dx++;
      score--;
    }
  }
}

function colorText(phase)
{
  if (phase == undefined) phase = 0;
  center = 128;
  width = 127;
  frequency = Math.PI*2/256;
  red   = Math.sin(frequency*i+2+phase) * width + center;
  green = Math.sin(frequency*i+0+phase) * width + center;
  blue  = Math.sin(frequency*i+4+phase) * width + center;
  if (i+.1 < 256 && i+.1 > -1) i+=.1;
  else if(i-1 > -1 && i-1 < 256) i-=.1;
  ballColor = RGB2Color(red,green,blue);
}

function intersects(msx, msy) {
    var disx = msx-(x);
    var disy = msy-(y);
    return disx*disx+disy*disy <= ballRadius*ballRadius;
}

function RGB2Color(r,g,b) {
  return '#' + byte2Hex(r) + byte2Hex(g) + byte2Hex(b);
}

function byte2Hex(n) {
  var nybHexString = "0123456789ABCDEF";
  return String(nybHexString.substr((n >> 4) & 0x0F,1)) + nybHexString.substr(n & 0x0F,1);
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
  ctx.fillStyle = ballColor;
  colorText(fase+=colorRate);
  ctx.fillRect(0, 0, canvas.width, canvas.height);
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