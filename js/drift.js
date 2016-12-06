// globals
var clouds;

// constants
var BACKGROUND_COLOR = [15, 5, 5];
var CANVAS_X = 500;
var CANVAS_Y = 500;

var MIN_PARTICLES = 6;
var MAX_PARTICLES = 10;
var MAX_PARTICLE_V = 0.8;
var MIN_CLOUD_V = 0.5;
var MAX_CLOUD_V = 1;
var MIN_INIT_PARTICLE_DIST_FROM_COM = 20;
var MAX_INIT_PARTICLE_DIST_FROM_COM = 20;

/**
 * A particle object.
 */
var Particle = function(position) {
    this.velocity = createVector(random(-MAX_PARTICLE_V,MAX_PARTICLE_V), random(-MAX_PARTICLE_V,MAX_PARTICLE_V));
    this.position = position.copy();
}

Particle.prototype.update = function(){
    this.position.add(this.velocity);
};

Particle.prototype.display = function() {
    stroke(200, 100);
    strokeWeight(5);
    fill(80, 100);
    ellipse(this.position.x, this.position.y, 30, 30);
};


/**
 * A cloud of particles.
 */
var Cloud = function(position) {
    var numParticles = random(MIN_PARTICLES, MAX_PARTICLES);
    this.velocity = createVector(random(MIN_CLOUD_V, MAX_CLOUD_V), 0);
    this.position = position.copy();
    this.particles = [];
    
    for(var i = 0; i < numParticles; i++) {
        var extentX = random(MIN_INIT_PARTICLE_DIST_FROM_COM, MAX_INIT_PARTICLE_DIST_FROM_COM);
        var extentY = random(MIN_INIT_PARTICLE_DIST_FROM_COM, MAX_INIT_PARTICLE_DIST_FROM_COM);
        this.particles.push(new Particle(createVector(random(this.position.x-extentX,this.position.x+extentX),random(this.position.x-extentY,this.position.x+extentY))));
    }
}

Cloud.prototype.update = function(){
    this.position.add(this.velocity);
    for(var i = 0; i < this.particles.length; i++) {
        this.particles[i].update();
    }
};

Cloud.prototype.display = function() {
     for(var i = 0; i < this.particles.length; i++) {
         this.particles[i].display();
     }
};



function drawBackground() {
    background(BACKGROUND_COLOR[0], BACKGROUND_COLOR[1], BACKGROUND_COLOR[2]);
}

function setup() {
    createCanvas(CANVAS_X, CANVAS_Y);
    drawBackground();
    clouds = []
    
    var cloudPos = createVector(250,250);
    clouds.push(new Cloud(cloudPos));
}

function draw() {
    drawBackground();
    for (var i = 0; i < clouds.length; i++) {
        clouds[i].update();
        clouds[i].display();
    }
}