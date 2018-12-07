
var s = function(p) {

   p.Engine = Matter.Engine
   p.World = Matter.World
   p.Bodies = Matter.Bodies
   p.Body = Matter.Body

   p.circles = [];
   p.rects = [];
   p.engine;
   p.world;
   p.data = [];
   p.offset = 0;
   p.noiseMultiplier = 0.005;
   p.forwards = true;
   p.scrollSpeed;
   p.difficulty = 100;
   // c;
   // r;
   p.ball;
   p.boxXPos;
   p.boxYPos = 200;
   p.boxHeight = 50;
   p.box;
   p.heightVar = 100;
   p.playerScoreBoard;
   p.boxMover;
   p.img;
   p.cnv;


  p.setup = function() {
    p.scrollSpeed = 7;
    p.boxMover = 7;
    p.imageMode(p.CENTER);
    p.playerScoreBoard = new ScoreBoard();
    p.engine = p.Engine.create();
    p.world = p.engine.world;
    p.Engine.run(p.engine);
    p.ball = new Circle(100, 200, 10);
    p.World.add(p.world, p.ball);
    p.boxXPos = p.width;
    p.noLoop();
  }

  p.mousePressed = function() {
    if (event.target == button1) {
      let cnv = p.createCanvas(400, 400);
      cnv.parent(gameArea1);
      p.textSize(75)
      p.fill(0)
      p.text(`Ready?`, 200, 200)
      setTimeout(function() {
        p.setup();
        p.loop();
      }, 1000)
    }
  }

  p.preload = function() {
    p.img = p.loadImage('https://i.imgur.com/rzFkUbv.png')
  }

  p.keyPressed = function() {
    if (p.keyCode === 87) {
      p.Body.applyForce( p.ball.body, {
        x: p.ball.body.position.x,
        y: p.ball.body.position.y
        },
        {
          x: 0,
          y: -0.005
      });
    }
  }



  function generate(offset) {
    for(var x = 0; x < p.width; x += 10) {
      p.data[x] = p.noise((x + p.offset) * p.noiseMultiplier);
    }
  }

  p.draw = function() {
        p.background(0);
        p.fill(0)
        // rect(200, 200, 200, 200)
        p.frameRate(30)
        p.forwards ? p.offset += p.scrollSpeed : p.offset -= p.scrollSpeed;
        generate(p.offset);
    //
      for(let x = 0; x < p.data.length; x += 10) {
        let newRect = new Rectangle(x, 400, 10, - p.heightVar + (p.data[x] * p.difficulty));
        p.rects.push(newRect)
        p.fill(200)
        newRect.show()
      }
    //
      for(let x = 0; x < p.data.length; x += 10) {
        let newRect = new Rectangle(x, 0, 10, p.heightVar - (p.data[x] * p.difficulty));
        p.rects.push(newRect)
        p.fill(200)
        newRect.show()
      }
    //
      p.circles.forEach(circle => {
        circle.show();
      })
    //
      p.box = randomObsticle(p.boxXPos, p.boxYPos, p.boxHeight);
      if (p.box.onScreen()) {
        p.boxXPos -= p.boxMover;
      } else {
        p.boxMover += 0.2
        p.scrollSpeed += 0.2
        p.boxXPos = p.width;
        p.boxYPos = p.random(0, 400)
        p.boxHeight = p.random(20, 100)
      }
    //
      p.rects.forEach(recta => {
        if (p.ball) {
            let d1 = p.dist(p.ball.body.position.x, p.ball.body.position.y, 100, p.height - recta.h)
            let d2 = p.dist(p.ball.body.position.x, p.ball.body.position.y, 100, 0 + recta.h)
            if (d1 < p.ball.w/2 || d2 < p.ball.w/2) {
                p.background(255)
                p.textAlign(p.CENTER);
                p.fill(0)
                p.textSize(50);
                p.text(`Score: ${p.playerScoreBoard.score}`, 200, 200);
                p.scrollSpeed = 7
                p.boxMover = 7
                p.noLoop();
            } else if (p.ball.body.position.y >= p.width - 20 || p.ball.body.position.y <= 20) {
                p.background(255)
                p.textAlign(p.CENTER);
                p.fill(0)
                p.textSize(50);
                p.text(`Score: ${p.playerScoreBoard.score}`, 200, 200)
                p.scrollSpeed = 7
                p.boxMover = 7
                p.noLoop();
            }
        }
      })
    //
      if (p.ball) {

        for (let by = p.boxYPos - (p.boxHeight / 2); by < p.boxYPos + (p.boxHeight / 2); by += 5) {
          let d = p.dist(p.ball.body.position.x, p.ball.body.position.y, p.boxXPos, by);
          if (d < (p.ball.w/2)) {
            p.clear();
            p.background(255)
            p.textAlign(p.CENTER);
            p.fill(0)
            p.textSize(50)
            p.text(`Score: ${p.playerScoreBoard.score}`, 200, 200)
            p.scrollSpeed = 7
            p.boxMover = 7
            p.noLoop()
          }
        }
      }
      // push();
      p.rectMode(p.CORNER);
      p.stroke(0);
      p.fill(255);
      p.rect(4, 2, 50, 20)
      // push();
      p.fill(0)
      p.textSize(12)
      p.textAlign(p.CENTER);
      p.text(`${p.playerScoreBoard.score}`, 29, 16)
      // pop();
      // pop();
    //
      p.image(p.img, p.ball.body.position.x - 3, p.ball.body.position.y, 40, 20)
    //
    p.playerScoreBoard.score += 1;
    p.heightVar += 0.01
    p.rects.splice(0, p.rects.length)
  }

  // function mousePressed() {
  //   setup()
  //   loop();
  // }

  function randomObsticle(boxXPos, boxYPos, boxHeight) {
    let box = new Rectangle(p.boxXPos, p.boxYPos, 10, p.boxHeight)
    box.show()
    return box;
  }

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
  } // end of circle

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
  } // end of rectangle
  function ScoreBoard() {
    this.score = 0;
  }


}
// }
var myp5 = new p5(s);
