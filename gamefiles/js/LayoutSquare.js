var LayoutSquare = function(game, x, y, w, h, type, squares) {
  Phaser.Button.call(this, game, x, y, "", function() {
  }, this);
  this.width = w;
  this.height = h;
  this.anchor.setTo(.5);
  this.properties = {id:main.board.allSquares.length, type:type, chips:[]};
  if (type == main.board.squareType.straight) {
    this.properties.number = squares + 1;
    this.properties.squares = [this];
    if (this.properties.number != 0) {
      this.properties.color = main.board.squareColors[squares];
      main.board.squares.push(this);
    }
  } else {
    this.properties.squares = squares;
    if (type == main.board.squareType.evens || type == main.board.squareType.dozensColumns) {
      main.board.groupSquares.push(this);
    }
  }
  if (type == main.board.squareType.straight || type == main.board.squareType.evens || type == main.board.squareType.dozensColumns) {
    var image;
    if (this.properties.number == 0) {
      image = game.add.image(this.x, this.y, "table", "zero-light.png");
    } else {
      image = game.add.image(this.x, this.y, "square_light");
      image.width = this.width + 5;
      image.height = this.height + 5;
    }
    image.anchor.setTo(.5);
    image.visible = false;
    this.properties.image = image;
  }
  this.onInputOver.add(onOver, this);
  this.onInputDown.add(onDown, this);
  function onOver() {
    if (main.board.pressed) {
      main.board.self.setActiveSquare(this, false);
    }
  }
  function onDown() {
    main.board.self.setActiveSquare(this, true);
  }
  main.board.allSquares.push(this);
  game.add.existing(this);
};
LayoutSquare.prototype = Object.create(Phaser.Button.prototype);
LayoutSquare.constructor = LayoutSquare;

