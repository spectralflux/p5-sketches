// globals
var clouds;

// constants
var BACKGROUND_COLOR = [15, 5, 5];
var CANVAS_X = 500;
var CANVAS_Y = 500;
var NUM_CLOUDS = 5;
var MIN_PARTICLES = 4;
var MAX_PARTICLES = 8;
var MAX_PARTICLE_V = 0.8;
var MIN_CLOUD_V = 0.8;
var MAX_CLOUD_V = 1;
var MIN_INIT_PARTICLE_DIST_FROM_COM = 10;
var MAX_INIT_PARTICLE_DIST_FROM_COM = 30;
var CLOUD_GRAV_EDGE = 30;
var INTERACT_DISTANCE = 60;

/**
 * A particle object.
 */
var Particle = function (position) {
    this.velocity = createVector(random(-MAX_PARTICLE_V, MAX_PARTICLE_V), random(-MAX_PARTICLE_V, MAX_PARTICLE_V));
    this.position = position.copy();
}

Particle.prototype.update = function (cloudPos) {
    /* var newVx = 0.01*(this.position.x-cloudPos.x)^2 + MAX_PARTICLE_V;
     var newVy = 0.01*(this.position.y-cloudPos.y)^2 + MAX_PARTICLE_V;
     this.velocity.set(newVx, newVy);*/
    if ((this.position.x <= cloudPos.x - CLOUD_GRAV_EDGE) || (this.position.x >= cloudPos.x + CLOUD_GRAV_EDGE)) {
        this.velocity.set(-this.velocity.x, this.velocity.y);
    }
    if ((this.position.y <= cloudPos.y - CLOUD_GRAV_EDGE) || (this.position.y >= cloudPos.y + CLOUD_GRAV_EDGE)) {
        this.velocity.set(this.velocity.x, -this.velocity.y);
    }
    this.position.add(this.velocity);
};

Particle.prototype.display = function () {
    stroke(200, 100);
    strokeWeight(1);
    fill(80, 100);
    ellipse(this.position.x, this.position.y, 3, 3);
};


/**
 * A cloud of particles.
 */
var Cloud = function (position) {
    var numParticles = random(MIN_PARTICLES, MAX_PARTICLES);
    this.velocity = createVector(random(MIN_CLOUD_V, MAX_CLOUD_V), 0);
    this.position = position.copy();
    this.particles = [];
    for (var i = 0; i < numParticles; i++) {
        var extentX = random(MIN_INIT_PARTICLE_DIST_FROM_COM, MAX_INIT_PARTICLE_DIST_FROM_COM);
        var extentY = random(MIN_INIT_PARTICLE_DIST_FROM_COM, MAX_INIT_PARTICLE_DIST_FROM_COM);
        this.particles.push(new Particle(createVector(random(this.position.x - extentX, this.position.x + extentX), random(this.position.x - extentY, this.position.x + extentY))));
    }
}

Cloud.prototype.update = function () {
    for (var i = 0; i < this.particles.length; i++) {
        this.particles[i].update(this.position);
    }
    this.position.add(this.velocity);
};

Cloud.prototype.display = function () {
    for (var i = 0; i < this.particles.length; i++) {
        this.particles[i].display();
        for (var j = 0; j < this.particles.length; j++) {
            if (i != j) {
                var dist12 = this.particles[i].position.dist(this.particles[j].position);
                if (dist12 <= INTERACT_DISTANCE) {
                    for (var k = 0; k < this.particles.length; k++) {
                        if (i != k && j != k) {
                            var dist23 = this.particles[j].position.dist(this.particles[k].position);
                            if (dist23 <= INTERACT_DISTANCE) {
                                //noFill();
                                strokeWeight(1);
                                stroke(255, 20);
                                triangle(this.particles[i].position.x, this.particles[i].position.y, this.particles[j].position.x, this.particles[j].position.y, this.particles[k].position.x, this.particles[k].position.y)
                            }
                        }
                    }
                }
            }
        }
    }
};


function drawBackground() {
    background(BACKGROUND_COLOR[0], BACKGROUND_COLOR[1], BACKGROUND_COLOR[2]);
}

function setup() {
    createCanvas(CANVAS_X, CANVAS_Y);
    drawBackground();
    clouds = []
    var cloudPos = createVector(250, 250);
    for(var i = 0; i < NUM_CLOUDS; i++) {
        clouds.push(new Cloud(createVector(random(10, CANVAS_X-10), random(10, CANVAS_Y-10))));
    }
}

function draw() {
    drawBackground();
    for (var i = 0; i < clouds.length; i++) {
        clouds[i].update();
        clouds[i].display();
    }
}