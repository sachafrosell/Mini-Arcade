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
let scrollSpeed = 100;
let difficulty = 50;
let c;
let r;
let blockWidth = 5;
let ball;
let boxXPos;
let boxYPos = 200;
let boxHeight = 50;
let box;
let heightVar = 200;
let playerScoreBoard;
let boxMover = 5;


function setup() {
  playerScoreBoard = new ScoreBoard();
  rectMode(CENTER)
  createCanvas(400, 400);
  engine = Engine.create();
  world = engine.world;
  Engine.run(engine);
  ball = new Circle(200, 100, 10);
  World.add(world, ball);
  boxXPos = width;


}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    Body.applyForce( ball.body, {
      x: ball.body.position.x,
      y: ball.body.position.y
      },
      {
        x: 0,
        y: -0.005
    });
  } else if (keyCode === RIGHT_ARROW) {
    Body.applyForce( ball.body, {
      x: ball.body.position.x,
      y: ball.body.position.y
      },
      {
        x: 0.001,
        y: 0
    });
  } else if (keyCode === LEFT_ARROW) {
    Body.applyForce( ball.body, {
      x: ball.body.position.x,
      y: ball.body.position.y
      },
      {
        x: -0.001,
        y: 0
    });
  }
}

function generate(offset) {
  for(var x = 0; x < width; x += 10) {
    data[x] = noise((x + offset) * noiseMultiplier);
  }
}

function draw() {
      background(0);
      frameRate(30)
      ball.show();
      forwards ? offset += scrollSpeed : offset -= scrollSpeed;
      generate(offset);

    for(let x = 0; x < data.length; x += 10) {
      let newRect = new Rectangle(x + 7.5, 400, 10, - heightVar + (data[x] * difficulty));
      rects.push(newRect)
      newRect.show()
    }

    for(let x = 0; x < data.length; x += 10) {
      let newRect = new Rectangle(x + 7.5, 0, 10, heightVar - (data[x] * difficulty));
      rects.push(newRect)
      newRect.show()
    }

    circles.forEach(circle => {
      circle.show();
    })

    box = randomObsticle(boxXPos, boxYPos, boxHeight);
    if (box.onScreen()) {
      boxXPos -= boxMover;
    } else {
      boxMover += 0.1
      boxXPos = width;
      boxYPos = random(0, 400)
      boxHeight = random(20, 100)
    }

    rects.forEach(recta => {
      if (ball) {
          let d = dist(ball.body.position.x, ball.body.position.y, recta.x, recta.y + (recta.h / 2))
          if (d < ball.w/2) {
              background(123, 123, 123)
              textAlign(CENTER);
              fill(0)
              textSize(50);
              text(`SCORE: ${playerScoreBoard.score}`, 200, 200);
              noLoop();
          } else if (ball.body.position.y >= width - 20 || ball.body.position.y <= 20) {
              background(123, 123, 123)
              textAlign(CENTER);
              fill(0)
              textSize(50);
              text(`SCORE: ${playerScoreBoard.score}`, 200, 200)
              noLoop();
          }
      }
    })



    if (ball) {
      for (let by = boxYPos - (boxHeight / 2); by < boxYPos + (boxHeight / 2); by += 5) {
        let d = dist(ball.body.position.x, ball.body.position.y, boxXPos, by);
        if (d < (ball.w/2)) {
          clear();
          background(123, 123, 123)
          textAlign(CENTER);
          fill(0)
          textSize(50)
          text(`SCORE: ${playerScoreBoard.score}`, 200, 200)
          noLoop()
        }
      }
    }
  playerScoreBoard.score += 1;
  heightVar += 0.01
}

function mousePressed() {
  setup()
  loop();
}

function randomObsticle(boxXPos, boxYPos, boxHeight) {
  let box = new Rectangle(boxXPos, boxYPos, 10, boxHeight)
  box.show()
  return box;
}
