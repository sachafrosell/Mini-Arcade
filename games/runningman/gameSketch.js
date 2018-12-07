var runningMan = function(p) {

  p.Engine = Matter.Engine
  p.World = Matter.World
  p.Bodies = Matter.Bodies
  p.Body = Matter.Body

  p.engine;
  p.world;
  p.person;
  p.angle = 0;
  p.runningMan;
  p.jumpingMan;
  p.longJumpMan;
  p.palmTree;
  p.standingMan;
  p.scoreBoard;
  p.obstacles = [];
  p.ground;
  p.groundHeight = 440;
  p.canvasWidth = 400;
  p.gapsize = 950; // lower = bigger gaps
  p.gap = 580
  //
  //
  p.setup = function() {
    p.imageMode(p.CENTER);
    p.angleMode(p.DEGREES);
    p.rectMode(p.CENTER);
    let cnv = p.createCanvas(p.canvasWidth, 400);
    cnv.parent(gameArea1);
    p.engine = p.Engine.create();
    p.world = p.engine.world;
    p.Engine.run(p.engine);
    p.person = new Person();
    // let gap = p.random(70, 500);
    // for(let i = 0; i < p.canvasWidth; i += gap) {
    //   let t = p.random(1, 3);
    //   let num = 0;
    //   for (let n = 0; n < t; n++) {
    //     p.obstacles.push(new Obstacle(i + num, 340, 20));
    //     num += 20;
    //   }
    // }
    p.scoreBoard = new ScoreBoard();
    for(let i = 0; i < 5000; i += 1000) {
      p.ground = p.Bodies.rectangle(i, p.groundHeight, p.gapsize, 100, { isStatic: true, friction: 1, restitution: 0.5})
      p.World.add(p.world, p.ground);
    }
    // ground1 = p.Bodies.rectangle(1250, p.groundHeight, 2400, 100, { isStatic: true, friction: 1, restitution: 0.5})
    // ground2 = p.Bodies.rectangle(2500, p.groundHeight, 2400, 100, { isStatic: true, friction: 1, restitution: 0.5})
    p.World.add(p.world, p.person);
  }
  //
  p.preload = function() {
    p.runningMan = p.loadImage('https://i.imgur.com/ctwlriB.png')
    p.runningManBack = p.loadImage('https://i.imgur.com/6E1ajX9.png')
    p.jumpingMan = p.loadImage('https://i.imgur.com/vKMyqfG.png')
    p.jumpingManBack = p.loadImage('https://i.imgur.com/80vpNcM.png')
    p.longJumpMan = p.loadImage('https://i.imgur.com/GRjkBM6.png')
    p.longJumpManBack = p.loadImage('https://i.imgur.com/CIY5jGc.png')
    p.standingMan = p.loadImage('https://i.imgur.com/IyKkakl.png')
    p.palmTree = p.loadImage('https://i.imgur.com/qQ9Nhgg.png')
  }
  //
  p.keyPressed = function() {
    // console.log(p.key);
    if (p.person.body.velocity.y < 0.3 && p.person.body.velocity.y > -0.3) {
      if (p.key === 'W' || p.key === 'w') {
        // console.log("Pressed");
        p.Body.applyForce( p.person.body, {
          x: p.person.body.position.x,
          y: p.person.body.position.y
          },
          {
            x: 0,
            y: -0.03
        });
      }
    }
  }
  //
  function keyLogic() {
    if (p.keyIsDown(68)) {
      if (p.person.body.velocity.x < 2.5) {
        p.Body.applyForce( p.person.body, {
          x: p.person.body.position.x,
          y: p.person.body.position.y
          },
          {
            x: 0.001,
            y: 0
        });
      }
    } else if (p.keyIsDown(65)) {
      if (p.person.body.velocity.x > -2.5) {
        p.Body.applyForce( p.person.body, {
          x: p.person.body.position.x,
          y: p.person.body.position.y
          },
          {
            x: -0.001,
            y: 0
        });
      }
    }
  }

  p.draw = function() {
    p.background(0);
    p.translate(-p.person.body.position.x + 100, 0)
    p.obstacles.forEach(o => o.show())
    keyLogic()
    for(let i = 0; i < 5000; i += 1000) {
      // fill(0)
      p.fill(255)
      p.rect(i, 390, p.gapsize, 100)
    }
    // let gap = p.random(70, 500);
    for(let i = 0; i < 4000; i += p.gap) {
      let t = 2;
      let num = 0;
      for (let n = 0; n < t; n++) {
        // p.obstacles.push(new Obstacle(i + num, 340, 20));

        p.image(p.palmTree, i + num, 320, 40, 40)
        num += 80;
      }
    }
    trackScore()
    whichSprite()
    p.scoreBoard.score = Math.ceil(p.person.body.position.x)
  }

  function whichSprite() {
    if (p.person.body.velocity.y < 0.1 && p.person.body.velocity.y > -0.1 && p.person.body.velocity.x > -1 && p.person.body.velocity.x < 1) {
      p.image(p.standingMan, p.person.body.position.x, p.person.body.position.y - 44, 40, 40)
    }
    if (p.person.body.velocity.y > 0.3 && p.person.body.velocity.x > -0.1) {
      p.image(p.longJumpMan, p.person.body.position.x, p.person.body.position.y - 44, 40, 40)
    } else if (p.person.body.velocity.y > 0.3 && p.person.body.velocity.x < -0.1) {
      p.image(p.longJumpManBack, p.person.body.position.x, p.person.body.position.y - 44, 40, 40)
    } else if (p.person.body.velocity.y < -0.3 && p.person.body.velocity.x > -0.1) {
      p.image(p.jumpingMan, p.person.body.position.x, p.person.body.position.y - 44, 30, 30)
    } else if (p.person.body.velocity.y < -0.3 && p.person.body.velocity.x < -0.1) {
      p.image(p.jumpingManBack, p.person.body.position.x, p.person.body.position.y - 44, 30, 30)
    } else if (p.person.body.velocity.x > 1) {
      p.image(p.runningMan, p.person.body.position.x, p.person.body.position.y - 44, 30, 30)
    } else if (p.person.body.velocity.x < -1){
      p.image(p.runningManBack, p.person.body.position.x, p.person.body.position.y - 44, 30, 30)
    }
    looseLogic();
  }

  function looseLogic() {
    if (p.person.body.position.y > p.height + 50) {
      p.background(123, 123, 123)
      p.textAlign(p.CENTER);
      p.fill(0)
      p.textSize(50);
      p.text(`SCORE: ${p.scoreBoard.score}`, p.person.body.position.x + 100, 200,)
      console.log(p.scoreBoard.score)
      p.noLoop();
    }
  }

  function trackScore() {
    p.push();
    p.rectMode(p.CORNER);
    p.fill(255);
    p.stroke(0);
    p.translate(p.person.body.position.x, 0)
    p.rect(10, 10, 50, 20)
    p.push();
    p.fill(0)
    p.textAlign(p.CENTER)
    p.text(`${p.scoreBoard.score}`, 35, 24)
    p.pop();
    p.pop();
  }


  function Person() {
    let options = {
      friction: 1,
      restitution: 0
    }
    this.body = p.Bodies.circle(200, 200, 20, options)
    p.World.add(p.world, this.body)

    this.display = function() {
      p.stroke(255);
      p.fill(0)
      p.ellipse(this.body.position.x, this.body.position.y - 50, 20)
    }

  } // end of person class

  function Obstacle(x, y, w) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.c = p.random(0, 255);


    this.show = function() {
      p.fill(this.c);
      p.triangle(this.x, this.y, this.x + w, this.y, this.x + w/2, this.y - w)
    }

    this.addToWorld = function() {
      p.World.add(p.world, this.body);
    }

  } // end of obstacle class

  function ScoreBoard() {
    this.score = 0;
  }



}

var runningManP5 = new p5(runningMan)
