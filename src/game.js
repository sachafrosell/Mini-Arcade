class Game {
  constructor(game) {
    this.title = game.title
    this.scores = game.scores

    //this.buttonThatdisplaysGame.addEventListener('click', this.displayGame.bind(this))
    Game.all.push(this)
  }

  renderScored() {
    //should return an array of html for an individual user that the domcontroller can append to another div
    let scoreBoard = {}
    this.scores.forEach(score => {
      let user = User.all.find(user => user.id === score.user_id)
      scoreBoard[`${user.username}`] = score.points
    })
    console.table(scoreBoard)
    const scoreCard = document.createElement('div')
    //make a leaderboard for the game here
  }


}

Game.all = []
