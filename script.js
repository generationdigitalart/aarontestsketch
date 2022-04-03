var DEFAULT_SIZE = 1000
var WIDTH = window.innerWidth
var HEIGHT = window.innerHeight
var DIM = Math.min(WIDTH, HEIGHT)
var M = DIM / DEFAULT_SIZE
var r0 = 80;
var n = 200;
var pp;
var delta;
var sca = 1.75
var loopit = true;

function setup() {
    createCanvas(WIDTH, HEIGHT);
    colorMode(HSB,100)
    background(10,2,99);
    noFill();
    translate(width/1.5, height/1.5);

    stroke(0,0,70);
    pp = new Array(n);
    beginShape();
    for (let i = 0; i < n; i++){
        let a = i*(TWO_PI/n);
        let r = r0 - 80*noise((cos(a)+1), (sin(a)+1));
        pp[i] = createVector(r*cos(a), r*sin(a), ((DIM/sca) - r)/50);
        vertex(pp[i].x,pp[i].y);
    }
    endShape(CLOSE);
    // noLoop();
}

function draw() {
    translate(width/1.5, height/1.5);

    r = pp[0].x;
    if (r > DIM/sca){
        console.log("stopped animation")
        loopit = false;
    }
    stroke(map(r,0,DIM/sca,50,85), 25, 90);
    strokeWeight(2);
    beginShape();
    for (let i = 0; i < n; i++){
        let a = i*(TWO_PI/n);
        delta = pp[i].z;//(r*exp(-2*r)+1)*
        pp[i].x += delta*cos(a);
        pp[i].y += delta*sin(a);// - 2;
        vertex(pp[i].x, pp[i].y);
    }
    endShape(CLOSE);

    if (!loopit) noLoop();
}