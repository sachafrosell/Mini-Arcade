class DomController {
  constructor() {
    this.main = document.querySelector('.main')
    this.scoreboard = document.querySelector('#scoreboard')



    //need a click event to play a game
  }
  appendToMain(array) {
    array.forEach(html => this.main.appendChild(html))
  }

  // setScore(array) {
  //   let scoresArray = array.sort((a, b) => b - a)
  //   for (let i = 0; i < 5; i++) {
  //     let score = document.createElement('li')
  //     score.innerText = `${scoresArray[i]}`
  //     this.scoreboard.appendchild(score)
  //   }
  // }


}
