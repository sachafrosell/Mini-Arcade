let player;
let ball;
let brick;
let bricks = []
let scoreBoard;
let isPlaying = true;


function setup() {
  createCanvas(400, 400);
  scoreBoard = new ScoreBoard
  player = new Player;
  // ball = new Ball;
  // for (let i = 0; i < 1; i++) {
  //   bricks.push(new Brick);
  // }
  makeBricks()
}

function makeBricks() {
  ball = new Ball;
  for (let i = 0; i < 45; i++) {
    bricks.push(new Brick);
  }
}

function draw() {
  // rectMode(CENTER)
  background(80, 80, 80);
  for (let i = 0; i < bricks.length; i++) {
    bricks[i].display()
    if (ball.hits(bricks[i]) === true) {
      bricks.splice(i, 1)
      ball.direction.y *= -1
      scoreBoard.score +=1
    }
  }
  if (bricks.length === 0) {
    makeBricks()
  }

  scoreBoard.display();

  player.display();
  player.update()
  player.checkEdges()

  ball.display()
  ball.update()
  ball.checkEdges()
  ball.meets(player)
  ball.checkLoss()

  if ((ball.meets(player) > 0) && ball.direction.y > 0 && ball.direction.x > 0) {
    ball.direction.y *= -1
    // ball.direction.x *= -1
  }
  else if ((ball.meets(player) < 0) && ball.direction.y > 0 && ball.direction.x > 0) {
    ball.direction.x *= -1
    ball.direction.y *= -1
  }
  else if ((ball.meets(player) > 0) && ball.direction.y > 0 && ball.direction.x < 0) {
    ball.direction.y *= -1
    ball.direction.x *= -1
  }
  else if ((ball.meets(player) < 0) && ball.direction.y > 0 && ball.direction.x < 0) {
    ball.direction.y *= -1
  }

}

function keyReleased() {
  player.isMovingLeft = false;
  player.isMovingRight = false;
}

function keyPressed() {
  if (key === "d" || key === "D") {
    player.isMovingRight = true;
  }
  else if (key === 'A' || key === "a") {
    player.isMovingLeft = true
  }

}

function mousePressed() {
if (!isPlaying) {
  bricks.splice(0, bricks.length)
  setup()
  isPlaying = true
  loop()
  }
}
