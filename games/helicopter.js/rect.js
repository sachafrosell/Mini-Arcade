function Rectangle(x, y, w, h) {
  this.c = 100;
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;

  this.show = function() {
    push()
    noStroke()
    fill(100)
    rect(this.x, this.y, this.w, this.h)
    pop()
  }

  this.addToWorld = function() {
    noLoop();
    World.add(world, this.body)
  }
  this.removeFromWorld = function() {
    World.remove(world, this.body)
  }

  this.onScreen = function() {
    if (this.x > 0 && this.y < width) {
      return true;
    } else {
      return false;
    }
  }
}
