
// let s = function(p) {

  let Engine = Matter.Engine,
      World = Matter.World,
      Bodies = Matter.Bodies,
      Body = Matter.Body

  let circles = [];
  let rects = [];
  let engine;
  let world;
  let ground;
  let pnoise;
  let nx = 0;
  let x1 = 0;
  let data = [];
  let offset = 0;
  let noiseMultiplier = 0.005;
  let forwards = true;
  let scrollSpeed;
  let difficulty = 100;
  let c;
  let r;
  let blockWidth = 5;
  let ball;
  let boxXPos;
  let boxYPos = 200;
  let boxHeight = 50;
  let box;
  let heightVar = 100;
  let playerScoreBoard;
  let boxMover;
  let img;
  let cnv;


  function setup() {
    scrollSpeed = 7;
    boxMover = 7;
    imageMode(CENTER);
    playerScoreBoard = new ScoreBoard();
    engine = Engine.create();
    world = engine.world;
    Engine.run(engine);
    ball = new Circle(100, 200, 10);
    World.add(world, ball);
    boxXPos = width;
    noLoop();
  }

  function mousePressed() {
    if (event.target == button1) {
      console.log("hi");
      let cnv = createCanvas(400, 400);
      cnv.parent(gameArea1);
      textSize(75)
      fill(0)
      text(`Ready?`, 200, 200)
      setTimeout(function() {
        setup();
        loop();
      }, 1000)
    }
  }

  function preload() {
    img = loadImage('https://i.imgur.com/rzFkUbv.png')
  }

  function keyPressed() {
    if (keyCode === 87) {
      Body.applyForce( ball.body, {
        x: ball.body.position.x,
        y: ball.body.position.y
        },
        {
          x: 0,
          y: -0.005
      });
    }
  }
  //   else if (keyCode === 68) {
  //     Body.applyForce( ball.body, {
  //       x: ball.body.position.x,
  //       y: ball.body.position.y
  //       },
  //       {
  //         x: 0.001,
  //         y: 0
  //     });
  //   } else if (keyCode === 65) {
  //     Body.applyForce( ball.body, {
  //       x: ball.body.position.x,
  //       y: ball.body.position.y
  //       },
  //       {
  //         x: -0.001,
  //         y: 0
  //     });
  //   }
  // }

  function generate(offset) {
    for(var x = 0; x < width; x += 10) {
      data[x] = noise((x + offset) * noiseMultiplier);
    }
  }

  function draw() {
        background(0);
        fill(0)
        // rect(200, 200, 200, 200)
        frameRate(30)
        forwards ? offset += scrollSpeed : offset -= scrollSpeed;
        generate(offset);

      for(let x = 0; x < data.length; x += 10) {
        let newRect = new Rectangle(x, 400, 10, - heightVar + (data[x] * difficulty));
        rects.push(newRect)
        fill(200)
        newRect.show()
      }

      for(let x = 0; x < data.length; x += 10) {
        let newRect = new Rectangle(x, 0, 10, heightVar - (data[x] * difficulty));
        rects.push(newRect)
        fill(200)
        newRect.show()
      }

      circles.forEach(circle => {
        circle.show();
      })

      box = randomObsticle(boxXPos, boxYPos, boxHeight);
      if (box.onScreen()) {
        boxXPos -= boxMover;
      } else {
        boxMover += 0.2
        scrollSpeed += 0.2
        boxXPos = width;
        boxYPos = random(0, 400)
        boxHeight = random(20, 100)
      }

      rects.forEach(recta => {
        if (ball) {
            let d1 = dist(ball.body.position.x, ball.body.position.y, 100, height - recta.h)
            let d2 = dist(ball.body.position.x, ball.body.position.y, 100, 0 + recta.h)
            if (d1 < ball.w/2 || d2 < ball.w/2) {
                background(255)
                textAlign(CENTER);
                fill(0)
                textSize(50);
                text(`Score: ${playerScoreBoard.score}`, 200, 200);
                scrollSpeed = 7
                boxMover = 7
                noLoop();
            } else if (ball.body.position.y >= width - 20 || ball.body.position.y <= 20) {
                background(255)
                textAlign(CENTER);
                fill(0)
                textSize(50);
                text(`Score: ${playerScoreBoard.score}`, 200, 200)
                scrollSpeed = 7
                boxMover = 7
                noLoop();
            }
        }
      })

      if (ball) {

        for (let by = boxYPos - (boxHeight / 2); by < boxYPos + (boxHeight / 2); by += 5) {
          let d = dist(ball.body.position.x, ball.body.position.y, boxXPos, by);
          if (d < (ball.w/2)) {
            clear();
            background(255)
            textAlign(CENTER);
            fill(0)
            textSize(50)
            text(`Score: ${playerScoreBoard.score}`, 200, 200)
            scrollSpeed = 7
            boxMover = 7
            noLoop()
          }
        }
      }
      // push();
      rectMode(CORNER);
      stroke(0);
      fill(255);
      rect(4, 2, 50, 20)
      // push();
      fill(0)
      textSize(12)
      textAlign(CENTER);
      text(`${playerScoreBoard.score}`, 29, 16)
      // pop();
      // pop();

      image(img, ball.body.position.x - 3, ball.body.position.y, 40, 20)

    playerScoreBoard.score += 1;
    heightVar += 0.01
    rects.splice(0, rects.length)
  }

  // function mousePressed() {
  //   setup()
  //   loop();
  // }

  function randomObsticle(boxXPos, boxYPos, boxHeight) {
    let box = new Rectangle(boxXPos, boxYPos, 10, boxHeight)
    box.show()
    return box;
  }

// }
