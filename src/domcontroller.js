class DomController {
  constructor() {
    this.main = document.querySelector('.main')
    this.scoreboard = document.querySelector('#scoreboard')



    //need a click event to play a game
  }
  appendToMain(array) {
    array.forEach(html => this.main.appendChild(html))
  }

  setScore(array) {
    array.forEach(scoreItem => {
      let score = document.createElement('li')
      score.innerText = `${scoreItem}`
      this.scoreboard.appendchild(score)
    })
  }


}
