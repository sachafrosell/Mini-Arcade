var s = function( sketch ) {

  sketch.x = 100;
  sketch.y = 100;

  sketch.setup = function() {
    sketch.createCanvas(200, 200);
  };

  sketch.draw = function() {
    sketch.background(0);
    sketch.fill(255);
    let rere = new Rectangle(sketch.x, sketch.y, 20);
    rere.show();
    // sketch.rect(x,y,50,50);
  };
  // sketch.mousePressed = function() {
  //   sketch.noLoop()
  //   console.log("hi");
  //   sketch.background(255);
  //   sketch.fill(255);
  //   sketch.rect(sketch.x,sketch.y,50,50);
  // }

  function Rectangle(x, y, w) {
    this.x = x;
    this.y = y;
    this.w = w;

    this.show = function() {
      sketch.fill(255)
      sketch.rect(this.x,this.y,this.w,this.w)
    }
  }

};

var myp5 = new p5(s);
