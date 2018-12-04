class DomController {
  constructor() {
    this.main = document.querySelector('.main')

    //need a click event to play a game
  }

  appendToMain(array) {
    array.forEach(html => this.main.appendChild(html))
  }


}
