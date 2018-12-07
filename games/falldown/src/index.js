var falldown = function(p) {
  //
  p.allShapes = []
  p.shape;
  p.stream
  p.streams = []
  // p.playerScore;
  p.player;
  p.shapeSize = 30
  p.hit = false
  p.isPlaying = true;
  //
  p.setup = function() {
    p.createCanvas(400, 400);
    // cnv.parent(gameArea1);
    p.rectMode(p.CORNER)
    gameReset()
  }
  //
  function gameReset() {
    p.frameRate(30)
    p.background(0)
    p.player = new Player
    scoreBoard = new ScoreBoard
    scoreBoard.score = p.player.score
    let x = 0
    for (let i = 0; i <= p.width/p.shapeSize; i++) {
      let y = p.round(p.random(-450, -10))
      let stream = new Stream(x, y)
      stream.generateShapes(x, y, p.shapeSize)
      p.streams.push(stream)
      x += (p.shapeSize * 2)
    }
  }
  //
  p.mousePressed = function() {
    if (!p.isPlaying) {
      p.setup()
      p.isPlaying = true
      p.loop()
    }

  }
  //
  p.draw = function() {
      p.rectMode(p.CORNER)
      p.background(255)
      scoreBoard.display()
      p.player.display()
      p.streams.forEach(stream => {
        stream.render()
        stream.shapes.forEach(shape => {
          p.hit = p.collideRectRect(p.player.location.x, p.player.location.y, p.player.width, p.player.height, shape.x, shape.y, p.shapeSize, p.shapeSize)
          if (p.hit) {
            p.isPlaying = false
            setTimeout(function() {p.background(123, 123, 123)
              p.streams.splice(0, p.streams.length)
            p.textSize(30)
            p.text(`      SCORE: ${scoreBoard.score} \n Click to Play Again`, 60, 180)
            p.noLoop()}, 30)
            p.player.score = scoreBoard.score
          }
          else {
            stream.speed = stream.speed + 0.00008
          }
        })
      })
      if (p.allShapes.length === 0) {
          p.background(123, 123, 123)
          p.textSize(75)
          p.text(`SCORE: ${scoreBoard.score}`, 150, 300)
          p.noLoop()
          p.player.score = scoreBoard.score
        }
      scoreBoard.score += 1
  }
  //
  //
  //
  p.keyPressed = function() {
    if (p.key === "l" || p.key === "L") {
      p.player.location.x -= 6
      if (this.location.x < 0) {
        this.location.x = p.width
      }
    }
    else if (p.key === 'j' || p.key === "J") {
      p.player.location.x += 6
      if (this.location.x > p.width) {
        this.location.x = 0
      }
    }
  }

  class Player {
    constructor() {
      this.width = 20
      this.height = 20
      this.location = p.createVector((p.width/2)-(this.width/2), p.height - 55)
      this.score = 0
    }

    display() {
      p.push()
      p.fill(220, 33, 33)
      p.rect(this.location.x, this.location.y, this.width, this.height, 3)
      p.pop()
      if (p.keyIsDown(p.LEFT_ARROW)) {
        p.player.location.x -= 6
        if (this.location.x < 0) {
          this.location.x = p.width
        }
      }
      else if (p.keyIsDown(p.RIGHT_ARROW)) {
        p.player.location.x += 6
        if (this.location.x > p.width) {
          this.location.x = 0
        }

      }

    }
  } // end of player class

  class ScoreBoard {
    constructor() {
      this.x = 5
      this.y = 1
      this.w = 85
      this.h = 18
      this.score
      this.c = p.color(0, 0, 0)
    }

    display() {
      p.rect(this.x, this.y, this.w, this.h)
      p.textSize(15)
      p.text(`Score: ${this.score}`, 10, 15)
    }
  } // end of scoreboard class

  class Stream {
    constructor(x, y) {
      this.x = x
      this.y = y
      this.shapes = [];
      this.allShapes = 150
      this.speed = 5
      this.gap = []
      this.shapeSpace = p.round(p.random(5, 7));
    }
  //decrease distance between recs in a single stream
    generateShapes(x, y) {
      p.push()
      for (let i = 0; i < this.allShapes; i++) {

        let shape = new Shape(x, y, this.speed)
        this.shapes.push(shape)
        p.allShapes.push(shape)
        this.gap.push(y)
        y -= p.round(p.random(200,500))
      }
      p.pop()
    }

    findAndDelete(shape) {
      let index = this.shapes.indexOf(shape)
      this.shapes.splice(index, 1)
      let index2 = p.allShapes.indexOf(shape)
      p.allShapes.splice(index2, 1)
    }

    render() {
      this.shapes.forEach(shape => shape.setShape())
      this.falling()
    }

    falling() {
      this.shapes.forEach(shape => {
        if (shape.y < p.height) {
          shape.y += this.speed
        }
        else if (shape.y > p.height) {
          this.findAndDelete(shape)
        }
      })
    }

  } //end of stream class

  class Shape {
    constructor(x, y, speed) {
      this.x = x;
      this.y = y;
      this.c = p.round(p.random(0, 255))
      this.value;
      this.speed = speed
      this.hit = false
    }

    collide (obj) {
  		this.hit = collideRectCircle(this.x, this.y, this.w, this.h, obj.x, obj.y, obj.x); //collide the cir object into this rectangle object.
        if (this.hit) {
          this.color = p.color(0) //set this rectangle to be black if it gets hit
          }
    }

    // sets a random shape with random size, color
    setShape () {
      p.push()
      p.fill(this.c, this.c, this.c)
      this.value = p.rect(this.x, this.y, p.shapeSize, p.shapeSize, 5)
      p.pop()
    }

    falling() {
      this.y >= p.height? this.y = 4: this.y += this.speed
    }


  } // end of shape class




}

// var falldownP5 = new p5(falldown, 'gameArea1');
