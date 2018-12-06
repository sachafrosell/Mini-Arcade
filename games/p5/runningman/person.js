// Daniel Shiffman
// https://www.kadenze.com/courses/the-nature-of-code
// http://natureofcode.com/
// Session 2: Array of Particles, multiple forces

function Person() {
  let options = {
    friction: 1,
    restitution: 0
  }
  this.body = Bodies.circle(200, 200, 20, options)
  World.add(world, this.body)

  this.applyForce = function(force) {
    this.acc.add(force);
  }


  this.display = function() {
    stroke(255);
    fill(0)
    ellipse(this.body.position.x, this.body.position.y - 50, 20)
  }


}
