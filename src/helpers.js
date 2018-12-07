const gameContainer = document.getElementById('game-container');
const gameCanvas = document.getElementById('gameCanvas');
const gameArea = document.getElementById('gameArea1')
const button1 = document.getElementById('runningman')
const button2 = document.getElementById('falldown')
const button3 = document.getElementById('brickbreaker')
const button4 = document.getElementById('helicopter')
const globalLeaderboard = document.getElementById('global-list')
const allButtons = document.querySelectorAll('button')
// var runningManP5;
var falldownP5;
var runningManP5;
var brickbreakerP5;
var helicopterP5;

// document.addEventListener('click', (e) => {
//   console.log("deleting");
//   gameArea.innerHTML = ""
// })

button1.addEventListener('click', (e) => {
  if (falldownP5 != undefined) {
    falldownP5.remove()
  } else if (brickbreakerP5 != undefined) {
    brickbreakerP5.remove()
  } else if (helicopterP5 != undefined) {
    helicopterP5.remove()
  }
  // falldownP5.remove()
  console.log("runningman");
  gameArea.innerHTML = ""
  // falldownP5.remove()
  runningManP5 = new p5(runningMan, 'gameArea1')
})

button2.addEventListener('click', (e) => {
  if (runningManP5 != undefined) {
    runningManP5.remove()
  } else if (brickbreakerP5 != undefined) {
    brickbreakerP5.remove()
  } else if (helicopterP5 != undefined) {
    helicopterP5.remove()
  }

  console.log("falldown");
  gameArea.innerHTML = ""
  falldownP5 = new p5(falldown, 'gameArea1')
})

button3.addEventListener('click', (e) => {
  if (runningManP5 != undefined) {
    runningManP5.remove()
  } else if (falldownP5 != undefined) {
    falldownP5.remove()
  } else if (helicopterP5 != undefined) {
    helicopterP5.remove()
  }

  console.log("brickbreaker");
  gameArea.innerHTML = ""
  brickbreakerP5 = new p5(brickbreaker, 'gameArea1')
})

button4.addEventListener('click', (e) => {
  if (runningManP5 != undefined) {
    runningManP5.remove()
  } else if (falldownP5 != undefined) {
    falldownP5.remove()
  } else if (brickbreakerP5 != undefined) {
    brickbreakerP5.remove()
  }
  console.log("helicopter");
  gameArea.innerHTML = ""
  helicopterP5 = new p5(helicopter, 'gameArea1')
})





// document.addEventListener('click', (e) => {
//   // console.log(e.target.id);
//   // allButtons.forEach(button => button.dataset.id = "off")
//   // debugger
//   // buttonContainer
//   if (e.target.className = "helicopter" && e.target.dataset.id == "off") {
//     var runningManP5 = new p5(runningMan)
//     e.target.dataset.id = "on"
//     // console.log(e.target);
//   } else if (e.target.className = "helicopter" && e.target.id == "on") {
//     var runningManP5 = ""
//     console.log(e.target.dataset.id);
//     // e.target.dataset.id = "off"
//   }
// })

// document.addEventListener('click', () => {
//   console.log("loaded");
//   console.log(document.body.innerHTML);
//   let scriptTag = '<script src="./games/pong.js"></script>'
//   // document.write(scriptTag)
//   // document.body.innerHTML += `
//   // <script src="./games/pong.js"></script>
//   // `
// })
// document.addEventListener('click', e => {
//   // console.log(e.target.dataset.id);
//   if (e.target.id == "brickbreaker" && e.target.dataset.id == "on") {
//     e.target.dataset.id = "off"
//     console.log("hi");
//     document.body.innerHTML += `
//     <script src="games/brickbreaker/src/player.js"></script>
//     <script src="games/brickbreaker/src/brick.js"></script>
//     <script src="games/brickbreaker/src/ball.js"></script>
//     <script src="games/brickbreaker/src/index.js"></script>
//     <script src="games/brickbreaker/src/row.js"></script>
//     <script src="games/brickbreaker/src/scoreboard.js"></script>
//     `
//   // console.log("hi");
//   }
// })
