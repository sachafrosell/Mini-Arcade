function Rectangle(x, y, w, h) {
  this.c = 100;
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;

  this.show = function() {
    fill(100);
    stroke(100)
    rect(this.x, this.y, this.w, this.h)
  }

  this.addToWorld = function() {
    console.log(this.body);
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
