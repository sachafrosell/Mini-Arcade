let helicopterScores = []
let runningManScores = []
let brickBreakerScores = []
let fallDownScores = []

function setScore(array) {
  let scoreboard = document.querySelector('#scoreboard')
  scoreboard.innerHTML = ''
  let scoresArray = array.sort((a, b) => b - a)
  for (let i = 0; i < 5; i++) {
    if (scoresArray[i]) {
      let score = document.createElement('li')
      score.innerText = `${scoresArray[i]}`
      scoreboard.appendChild(score)
    }
  }
}



// loadGame()
// document.addEventListener('DOMContentLoaded', () =>{
  //
  //   const goButton = document.getElementById('go')
  //
  //   goButton.addEventListener('click', console.log("going"))
  // })

  // gameContainer.innerHTML += helicopterScript
  // document.addEventListener('click', (event) => {
    //   gameContainer.innerHTML = helicopterScript
    //   console.log("going");
    // })
    // globalLeaderboard.innerHTML += `
    //   <li>${scoreboard.score}</li>
    // `
