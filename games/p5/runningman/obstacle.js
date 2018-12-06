function Obstacle(x, y, w) {
  // this.body = Bodies.rectangle(x, y, w, h, options)
  this.x = x;
  this.y = y;
  this.w = w;
  // this.h = h;
  this.c = random(0, 255);


  this.show = function() {
    fill(this.c);
    triangle(this.x, this.y, this.x + w, this.y, this.x + w/2, this.y - w)
  }

  this.addToWorld = function() {
    World.add(world, this.body);
  }

}
