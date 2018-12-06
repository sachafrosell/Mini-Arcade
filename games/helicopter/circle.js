function Circle(x, y, w, h) {
  let options = {
    friction: 0.1,
    restitution: 1
  }
  this.body = Bodies.circle(x, y, w, options);
  this.c = random(0, 360);
  this.w = w;
  this.h = h;
  World.add(world, this.body);

  this.show = function() {
    let pos = this.body.position;
    let angle = this.body.angle;
    // push();
    // fill(this.c,100,100)
    translate(pos.x, pos.y);
    // rectMode(CENTER);
    rotate(angle);
    // rect(0, 0, w, h);
    ellipse(0, 0, w * 2)
    // pop();
  }
}
