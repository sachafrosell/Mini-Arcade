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
    const scoreCard = document.createElemet('div')

    <p>${this.scores}</p>

  }


}

User.all = []
