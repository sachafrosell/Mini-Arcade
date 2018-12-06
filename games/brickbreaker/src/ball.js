class Ball {
  constructor() {
    this.pos = createVector(width/2, height/2)
    this.r = 7
    this.speed = 3.5
    this.vel = createVector(1, 1).mult(this.speed) //mult controls speed
    this.direction = createVector(1,1)
  }

  update() {
    this.pos.x += this.vel.x * this.direction.x
    this.pos.y += this.vel.y * this.direction.y
  }

  display() {
    push()
    fill(250, 250, 250)
    ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2)
    pop()
  }

  checkEdges() {
    if (this.pos.y < this.r && this.direction.y < 0) {
      this.direction.y *= -1
    }
    else if (this.pos.x < this.r && this.direction.x < 0) {
      this.direction.x *= -1
    }
    else if (this.pos.x > width - this.r && this.direction.x > 0) {
      this.direction.x *= -1
    }
  }

  meets(player) {
    if (
      this.pos.y < player.pos.y &&
      this.pos.y > player.pos.y - this.r &&
      this.pos.x > (player.pos.x + player.w/2) - this.r &&
      this.pos.x < player.pos.x + player.w + this.r) {
      return 1
    }
    else if (
      this.pos.y < player.pos.y &&
      this.pos.y > player.pos.y - this.r &&
      this.pos.x > player.pos.x - this.r &&
      this.pos.x < (player.pos.x + player.w/2) + this.r) {
      return - 1
    }
    else {

      return false
    }
  }

  hits(brick) {
    let distance = dist(this.pos.x, this.pos.y, brick.pos.x, brick.pos.y)
    if (distance < this.r + brick.r) {
      return true;
    }
    else {
      return false;
    }
  }
  checkLoss() {
    if (this.pos.y > height + this.r) {
      background(123, 123, 123)
      textSize(30)
      text(`        SCORE: ${scoreBoard.score} \n Click to Play Again`, 60, 180)
      isPlaying = false;
    }
  }
}


//if paddle hit on right side, direction.x *= -1
//if paddle hits on left side, direction.x *= -1
//rows
//loss reset
//win reset
