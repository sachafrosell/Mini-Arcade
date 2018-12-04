class ApiCommunicator {
  constructor() {
    this.domController = new DomController
    this.BASE_URL = "http://localhost:3000/api/v1"
    this.GAMES_URL = `${this.BASE_URL}/games`
    this.USERS_URL = `${this.BASE_URL}/users`

  }

  getGames() {
    fetch(`${this.GAMES_URL}`, { method: 'GET'})
    .then(response => response.json())
    .then(p => {
      p.forEach(game => new Game(game))
      console.log(Game.all)
    })
  }

  getUsers() {
    fetch(`${this.USERS_URL}`)
    .then(response => response.json())
    .then(p => {
      p.forEach(user => new User(user))
      this.domController.appendToMain(User.renderAll())
      console.log(User.all)
    })
  }

}

let test = new ApiCommunicator
test.getGames()
test.getUsers()
