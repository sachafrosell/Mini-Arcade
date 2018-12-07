function Circle(x, y, w, h) {
  let options = {
    friction: 0.1,
    restitution: 1
  }
  this.body = p.Bodies.circle(x, y, w, options);
  this.c = p.random(0, 360);
  this.w = w;
  this.h = h;
  p.World.add(p.world, this.body);

  this.show = function() {
    let pos = this.body.position;
    let angle = this.body.angle;
    translate(pos.x, pos.y);
  }
}
