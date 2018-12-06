let Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Body = Matter.Body

let engine;
let world;
let person;
let angle = 0;
let runningMan;
let jumpingMan;
let longJumpMan;
let scoreBoard;
let obstacles = [];
let ground;
let groundHeight = 440;
let canvasWidth = 400;
let gapsize = 860; // lower = bigger gaps


function setup() {
  imageMode(CENTER);
  angleMode(DEGREES);
  rectMode(CENTER);
  createCanvas(canvasWidth, 400);
  engine = Engine.create();
  world = engine.world;
  Engine.run(engine);
  person = new Person();
  let gap = random(70, 500);
  for(let i = 0; i < canvasWidth; i += gap) {
    let t = random(1, 3);
    let num = 0;
    for (let n = 0; n < t; n++) {
      // console.log(num);
      // console.log(num + 1);
      obstacles.push(new Obstacle(i + num, 340, 20));
      num += 20;
    }
  }
  scoreBoard = new ScoreBoard();
  for(let i = 0; i < canvasWidth; i += 1000) {
    ground = Bodies.rectangle(i, groundHeight, gapsize, 100, { isStatic: true, friction: 1, restitution: 0.5})
    World.add(world, ground);
  }
  ground1 = Bodies.rectangle(width/4, groundHeight, width/2 - 100, 100, { isStatic: true, friction: 1, restitution: 0.5})
  ground2 = Bodies.rectangle((width/4) * 3, groundHeight, width/2 - 100, 100, { isStatic: true, friction: 1, restitution: 0.5})
  World.add(world, person);
}

function preload() {
  runningMan = loadImage('manrunningdark.png')
  runningManBack = loadImage('manrunning.png')
  jumpingMan = loadImage('jumpman.png')
  jumpingManBack = loadImage('jumpmanback.png')
  longJumpMan = loadImage('longjumpman.png')
  longJumpManBack = loadImage('longjumpmanback.png')
}

function keyPressed() {
  if (key === 'W') {
    console.log("Pressed");
    Body.applyForce( person.body, {
      x: person.body.position.x,
      y: person.body.position.y
      },
      {
        x: 0,
        y: -0.03
    });
  }
}

function keyLogic() {
  if (keyIsDown(68)) {
    if (person.body.velocity.x < 3) {
      Body.applyForce( person.body, {
        x: person.body.position.x,
        y: person.body.position.y
        },
        {
          x: 0.001,
          y: 0
      });
    }
  } else if (keyIsDown(65)) {
    if (person.body.velocity.x > -3) {
      Body.applyForce( person.body, {
        x: person.body.position.x,
        y: person.body.position.y
        },
        {
          x: -0.001,
          y: 0
      });
    }
  }
}

function draw() {
  // console.log(frameRate())
  // frameRate(30)
  background(51);
  console.log();
  translate(-person.body.position.x + 100, 0)
  obstacles.forEach(o => o.show())

  keyLogic()

  for(let i = 0; i < canvasWidth; i += 1000) {
    rect(i, 390, gapsize, 100)
  }

  trackScore()
  whichSprite()
  scoreBoard.score = Math.ceil(person.body.position.x)
}

function whichSprite() {
  if (person.body.velocity.y > 0.3 && person.body.velocity.x > -0.1) {
    image(longJumpMan, person.body.position.x, person.body.position.y - 44, 40, 40)
  } else if (person.body.velocity.y > 0.3 && person.body.velocity.x < -0.1) {
    image(longJumpManBack, person.body.position.x, person.body.position.y - 44, 40, 40)
  } else if (person.body.velocity.y < -0.3 && person.body.velocity.x > -0.1) {
    image(jumpingMan, person.body.position.x, person.body.position.y - 44, 30, 30)
  } else if (person.body.velocity.y < -0.3 && person.body.velocity.x < -0.1) {
    image(jumpingManBack, person.body.position.x, person.body.position.y - 44, 30, 30)
  } else if (person.body.velocity.x > -1) {
    image(runningMan, person.body.position.x, person.body.position.y - 44, 30, 30)
  } else {
    image(runningManBack, person.body.position.x, person.body.position.y - 44, 30, 30)
  }
  looseLogic();
}

function looseLogic() {
  if (person.body.position.y > height + 50) {
    background(123, 123, 123)
    textAlign(CENTER);
    fill(0)
    textSize(50);
    // translate(-person.body.position.x, 0)
    text(`SCORE: ${scoreBoard.score}`, person.body.position.x + 200, 200)
    noLoop();
  }
}

function mousePressed() {
  setup();
  loop();
}

function trackScore() {
  push();
  rectMode(CORNER);
  fill(255);
  stroke(0);
  translate(person.body.position.x, 0)
  rect(10, 10, 50, 20)
  push();
  fill(0)
  textAlign(CENTER)
  text(`${scoreBoard.score}`, 35, 24)
  pop();
  pop();
}
