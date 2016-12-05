// globals
var particles;

// constants
var BACKGROUND_COLOR = [15, 5, 5];
var INTERACT_DISTANCE = 60;
var CANVAS_X = 1340;
var CANVAS_Y = 300;
var NUM_PARTICLES = 50;
var V_MAX = 0.7;

/**
 * A particle object.
 */
var Particle = function(position) {
    this.velocity = createVector(random(-V_MAX,V_MAX), random(-V_MAX,V_MAX));
    this.position = position.copy();
}

Particle.prototype.update = function(){
    //console.log("x:", this.position.x, "y:", this.position.y)
    if ((this.position.x <= 0) || (this.position.x >= CANVAS_X)) {
        this.velocity.set(-this.velocity.x, this.velocity.y);
    }
    
    if ((this.position.y <= 0) || (this.position.y >= CANVAS_Y)) {
        this.velocity.set(this.velocity.x, -this.velocity.y);
    }
    this.position.add(this.velocity);
};

Particle.prototype.display = function() {
    stroke(200, 100);
    strokeWeight(1);
    fill(80, 100);
    ellipse(this.position.x, this.position.y, 3, 3);
};



function drawBackground() {
    background(BACKGROUND_COLOR[0], BACKGROUND_COLOR[1], BACKGROUND_COLOR[2]);
}

function setup() {
    createCanvas(CANVAS_X, CANVAS_Y);
    drawBackground();
    particles = [];
    for(var i = 1; i < NUM_PARTICLES; i++) {
        particles.push(new Particle(createVector(random(0,CANVAS_X),random(0,CANVAS_Y))))
    }
}

function draw() {
    drawBackground();
    for(var i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].display();
        
        // pretty triangles renderer
        for(var j = 0; j < particles.length; j++) {
            if (i != j) {
                var dist12 = particles[i].position.dist(particles[j].position);
                if (dist12 <= INTERACT_DISTANCE) {
                    for(var k = 0; k < particles.length; k++) {
                        if (i != k && j != k) {
                            var dist23 = particles[j].position.dist(particles[k].position);
                            if (dist23 <= INTERACT_DISTANCE) {
                                //noFill();
                                strokeWeight(1);
                                stroke(255,20);
                                triangle(particles[i].position.x, particles[i].position.y, particles[j].position.x, particles[j].position.y, particles[k].position.x, particles[k].position.y)
                            }
                        }
                    }
                }
            }
        }
    }
}