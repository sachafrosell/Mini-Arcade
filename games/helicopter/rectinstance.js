function Rectangle(x, y, w, h) {
  this.c = 100;
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;

  this.show = function() {
    p.push()
    p.noStroke()
    p.fill(255)
    p.rect(this.x, this.y, this.w, this.h)
    p.pop()
  }

  this.addToWorld = function() {
    p.noLoop();
    p.World.add(p.world, this.body)
  }
  this.removeFromWorld = function() {
    p.World.remove(p.world, this.body)
  }

  this.onScreen = function() {
    if (this.x > 0 && this.y < p.width) {
      return true;
    } else {
      return false;
    }
  }
}
