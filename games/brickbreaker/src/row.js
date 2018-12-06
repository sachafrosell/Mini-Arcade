class Row {
  constructor() {
    this.x = x
    this.y = y
    this.totalBricks = width/15
    this.allShapes = width/15
    this.bricks = []
  }

  generateShapes(x, y) {
    push()
    for (let i = 0; i < this.allShapes; i++) {
      let brick = new Brick(x, y)
      brick.display()
      x += 15
      this.bricks.push(brick)

    }
    pop()
  }


  display() {
    push()
    for (let i = 0; i <= this.totalShapes; i++) {
      let second = this.w + (17 * (i+1))
      let brick = new Brick
      brick.display(50, this.h)

    }
    pop()
  }
}
