var cnv;

var cWidth = 800;
var cHeight = 800;
var score;
var circle;
var button;

var timeInterval;
var timePast;
var textAlpha = 1000;
var textFade = -20;

var textReset;

var speedInit = 1;
var speedRate = 1;

function centerCanvas() {
    var x = (windowWidth - cWidth) / 2;
    var y = (windowHeight - cHeight) / 2;
    cnv.position(x, y);
}

function setup() {
    cnv = createCanvas(cWidth, cHeight);
    centerCanvas();

    circle = new O(50);
    button = new Button(cWidth - 110, 10, 101, 50);
    score = 0;
    textReset = false;

    timePast = millis();
    timeInterval = 1000.0;
}

function windowResized() {
    centerCanvas();
}

function anim() {
    if(millis() > timeInterval + timePast) {
        timePast = millis();
        textReset = false;
    }
    textAlpha += textFade;
}

function reset() {
    circle = new O(50);
    button = new Button(cWidth - 110, 10, 101, 50);
    score = 0;

    timePast = millis();
    timeInterval = 3000.0;
    textAlpha = 1000;

    if(!textReset)
        textReset = true;
}

function mousePressed() {
    if (mouseIsPressed) {
        // if mouse pressed is inside the click-o button //
        if(button.inside()) {
            button.clicked();
        } else {
            circle.clicked();
        }
    }
}

function draw() {
    frameRate(100);
    background(0);
    circle.paint();
    circle.update();
    button.paint();  

    noStroke();
    textSize(50);
    fill(circle.hue, 255, 255);
    text(score + "", 20, 55);

    if(textReset) {
        anim();
        textSize(60);      
        fill(circle.hue, 255, 255, textAlpha);
        text("RESET", cWidth/2-95, 100);
    }

    if((mouseX >= cWidth - 110 && mouseX <= cWidth - 110 + 101) && mouseY >= 10 && mouseY <= 60) {
        button.hover = true;
        cursor(HAND);
    }
    else {
        button.hover = false;
        cursor(ARROW)
    }
}

class O {
    constructor(rad) {
        this.r = rad;
        this.x = cWidth / 2;
        this.y = cHeight / 2;
        this.dirX = 2;
        this.hue = 0;
        this.rate = 1;
    }

    update() {
        if (this.x + this.dirX + this.r > cWidth || this.x + this.dirX - this.r < 0) {
            this.dirX = -this.dirX;
        }

        this.x += this.dirX;
    }

    paint() {
        colorMode(HSL, 360);
        strokeWeight(5);
        stroke(this.hue, 255, 255);
        fill(0);
        ellipse(this.x, this.y, this.r * 2);

        noStroke();
        fill(0);
        ellipse(this.x, this.y, this.r * 2 - 20);

        if (this.hue > 360)
            this.hue = 0;
        else
            this.hue += this.rate;
    }

    clicked() {
        if (!(mouseX < 0 || mouseX > cWidth || mouseY < 0 || mouseY > cHeight)) {
            speedRate = Math.pow(Math.E , (.00632 * score)) * .4;
            if (dist(mouseX, mouseY, this.x, this.y) < this.r) {
                if(this.dirX > 0) {
                    this.dirX+=speedRate;
                }
                else {
                    this.dirX+=-speedRate;
                }
                score += 1;
            } else if (score > 0) {
                if(this.dirX < 0) {
                    this.dirX+=speedRate;
                }
                else {
                    this.dirX+=-speedRate;
                }
                score -= 1;
            }
        }
    }
}

class Button {

    constructor(w, h, x, y) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.hover = false;
    }

    update() {

    }

    paint() {
        stroke(circle.hue, 255, 255);
        strokeWeight(2);
        if(this.hover) {
            fill(60,60,60);
        } else {
            fill(0);
        }
        rect(this.w, this.h, this.x, this.y);
        fill(circle.hue, 255, 255);
        strokeWeight(0);
        textSize(28);
        text("click-o", cWidth-100, 44);
    }

    inside() {
        if((mouseX >= cWidth - 110 && mouseX <= cWidth - 110 + 101) && mouseY >= 10 && mouseY <= 60)
            return true;
        return false;
    }

    clicked() {
        reset();
    }
}