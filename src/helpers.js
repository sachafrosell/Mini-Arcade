const gameContainer = document.getElementById('game-container');
const gameCanvas = document.getElementById('gameCanvas');
const gameArea = document.getElementById('gameArea1')
const button1 = document.getElementById('go')
const button2 = document.getElementById('brickbreaker')
const globalLeaderboard = document.getElementById('global-list')

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
