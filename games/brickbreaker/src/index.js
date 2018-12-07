var brickbreaker = function(p) {

 p.player;
 p.ball1;
 p.brick;
 p.bricks = []
 p.scoreBoard1;
 p.isPlaying = true;


  p.setup = function() {
    p.bricks.splice(0, p.bricks.length)
    p.scoreBoard1 = new ScoreBoard1
    p.player = new Player;
    p.createCanvas(400, 400)
    makeBricks()
  }
  //
  function makeBricks() {
    p.ball1 = new Ball;
    for (let i = 0; i < 45; i++) {
      p.bricks.push(new Brick);
    }
  }
  //
  p.draw = function() {
    p.background(0);
    for (let i = 0; i < p.bricks.length; i++) {
      p.bricks[i].display()
      if (p.ball1.hits(p.bricks[i]) === true) {
        p.bricks.splice(i, 1)
        p.ball1.direction.y *= -1
        p.scoreBoard1.score +=1
      }
    }
    if (p.bricks.length === 0) {
      makeBricks()
    }
  //
    p.scoreBoard1.display();

    p.player.display();
    p.player.update()
    p.player.checkEdges()
  //
    p.ball1.display()
    p.ball1.update()
    p.ball1.checkEdges()
    p.ball1.meets(p.player)
    p.ball1.checkLoss()
  //
    if ((p.ball1.meets(p.player) > 0) && p.ball1.direction.y > 0 && p.ball1.direction.x > 0) {
      p.ball1.direction.y *= -1
    }
    else if ((p.ball1.meets(p.player) < 0) && p.ball1.direction.y > 0 && p.ball1.direction.x > 0) {
      p.ball1.direction.x *= -1
      p.ball1.direction.y *= -1
    }
    else if ((p.ball1.meets(p.player) > 0) && p.ball1.direction.y > 0 && p.ball1.direction.x < 0) {
      p.ball1.direction.y *= -1
      p.ball1.direction.x *= -1
    }
    else if ((p.ball1.meets(p.player) < 0) && p.ball1.direction.y > 0 && p.ball1.direction.x < 0) {
      p.ball1.direction.y *= -1
    }
  //
  }
  //
  p.keyReleased = function() {
    p.player.isMovingLeft = false;
    p.player.isMovingRight = false;
  }
  //
  p.keyPressed = function() {
    if (p.key === "d" || p.key === "D") {
      // console.log("pressing");
      // p.player.pos.x += 6
      p.player.isMovingRight = true;
    }
    else if (p.key === 'A' || p.key === "a") {
      p.player.isMovingLeft = true
      // p.player.pos.x -= 6
    }

  }
  //
  // p.mousePressed = function() {
  //     if (!p.isPlaying) {
  //       p.bricks.splice(0, p.bricks.length)
  //       p.setup()
  //       p.isPlaying = true
  //       p.loop()
  //     }
  //   }
  // p.mousePressed = function() {
  //   if (event.target == button2) {
  //     // console.log("hi");
  //     let cnv = p.createCanvas(400, 400);
  //     cnv.parent(gameArea1);
  //     p.bricks.splice(0, p.bricks.length)
  //
  //     p.setup()
  //     p.isPlaying = true
  //     p.loop()
  //     // p.textSize(75)
  //     // p.fill(0)
  //     // p.text(`Ready?`, 200, 200)
  //     // setTimeout(function() {
  //     //   p.setup();
  //     //   p.loop();
  //     // }, 1000)
  //   }
  // }

  class ScoreBoard1 {
    constructor() {
      this.x = 1
      this.y = p.height - 95
      this.w = 65
      this.h = 15
      this.score = 0
      this.c = p.color(0, 0, 0)
    }

    display() {
      p.push()
      p.rect(this.x, this.y, this.w, this.h)
      p.textSize(12)
      p.fill(0)
      p.text(`Score: ${this.score}`, this.x+ 5, p.height - 382)
      p.pop()
    }
  } // end of scoreboard class

  class Player {
    constructor() {
      this.w = 70
      this.h = 12
      this.pos = p.createVector(p.width/2 + 250, p.height + 250)
      this.isMovingLeft = false;
      this.isMovingRight = false;
    }

    display() {
      p.push()
      p.fill(220, 33, 33)
      p.rect(this.pos.x, this.pos.y, this.w, this.h)
      p.pop()
    }

    update() {
      if (this.isMovingLeft) {
        this.move(-7)
      }
      else if (this.isMovingRight) {
        this.move(7)
      }
    }

    move(step) {
      this.pos.x += step
    }

    checkEdges() {
      if (this.pos.x <=0) {
        this.pos.x = 0
      }
      else if (this.pos.x + this.w >= p.width) {
        this.pos.x = p.width-this.w
      }
    }
  } // end of player class

  class Ball {
    constructor() {
      this.pos = p.createVector(p.width/2, p.height/2)
      this.r = 7
      this.speed = 3.5
      this.vel = p.createVector(1, 1).mult(this.speed) //mult controls speed
      this.direction = p.createVector(1,1)
    }

    update() {
      this.pos.x += this.vel.x * this.direction.x
      this.pos.y += this.vel.y * this.direction.y
    }

    display() {
      p.push()
      p.fill(250, 250, 250)
      p.ellipse(this.pos.x, this.pos.y, this.r * 2, this.r * 2)
      p.pop()
    }

    checkEdges() {
      if (this.pos.y < this.r && this.direction.y < 0) {
        this.direction.y *= -1
      }
      else if (this.pos.x < this.r && this.direction.x < 0) {
        this.direction.x *= -1
      }
      else if (this.pos.x > p.width - this.r && this.direction.x > 0) {
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
      let distance = p.dist(this.pos.x, this.pos.y, brick.pos.x, brick.pos.y)
      if (distance < this.r + brick.r) {
        return true;
      }
      else {
        return false;
      }
    }
    checkLoss() {
      if (this.pos.y > p.height + this.r) {
        p.background(123, 123, 123)
        p.textSize(30)
        p.text(`        SCORE: ${p.scoreBoard1.score} \n Click to Play Again`, 60, 180)
        p.isPlaying = false;
      }
    }
  } // end of ball class

  class Brick {
    constructor() { //pass in x and y
      this.r = 17
      this.x // =x
      this.y //= y
      this.pos = p.createVector(p.random(10, p.width - 10), p.random(20, p.height-250))
      this.total = 5
    }


    display() {
      p.push();
      let color = p.round(p.random(150, 165))
      p.fill(255)
      p.translate(this.pos.x, this.pos.y);
      p.rotate(1.54)
      p.beginShape();
      for (let i = 0; i < this.total; i++) {
        let angle = p.map(i, 0, this.total, 0, p.TWO_PI);
        let x = this.r * p.cos(angle);
        let y = this.r * p.sin(angle);
        p.vertex(x, y);
      }
      p.endShape(p.CLOSE)
      p.pop()
    }
  } // end of brick class



}
//
// var brickbreakerP5 = new p5(brickbreaker, 'gameArea1');
