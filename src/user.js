class User {
  constructor(user) {
    this.username = user.username
    this.id = user.id
    this.scores = user.scores
    User.all.push(this)
  }

  static renderAll() {
    return User.all.map(user => user.render())
  }

  render() {
    let userCard = document.createElement('div')
    userCard.innerHTML =`
    <h2>${this.username}</h2>
    `
    return userCard
  }

  renderScored() {
    //should return an array of html for an individual user that the domcontroller can append to another div
    let scoreBoard = {}
    this.scores.forEach(score => {
      let game = Game.all.find(game => game.id === score.game_id)
      scoreBoard[`${game.title}`] = score.points
    })
    console.table(scoreBoard)
    //hiscores here
    const scoreCard = document.createElement('div')
  }


}

User.all = []
