class ScoreBoard1 {
  constructor() {
    this.x = 1
    this.y = height - 16
    this.w = 65
    this.h = 15
    this.score = 0
    this.c = color(0, 0, 0)
  }

  display() {
    push()
    rect(this.x, this.y, this.w, this.h)
    textSize(12)
    text(`Score: ${this.score}`, this.x+ 5, height - 3)
    pop()
  }
}
