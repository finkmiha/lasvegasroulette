var Board = function(game, x) {
  this.game = game;
  this.x = x;
  this.create();
};
Board.prototype = {create:function() {
  main.board.self = this;
  var board = this.game.add.image(this.x, this.game.world.centerY, "table", "roulette-plan.png");
  board.x -= board.width / 2;
  board.y -= board.height / 2;
  board.alpha = .75;
  this.board = board;
  var zero = new LayoutSquare(this.game, board.x + main.board.leftBorder + main.board.zeroWidth / 2, board.y + 2 * (main.board.squareHeight + main.board.border) - main.board.squareHeight / 2, main.board.zeroWidth, 3 * main.board.squareHeight + 2 * main.board.border, main.board.squareType.straight, -1);
  main.board.zeroSquare = zero;
  var x;
  for (var i = 0;i < 12;i++) {
    x = board.x + main.board.leftBorder + main.board.zeroWidth + main.board.border + i * (main.board.squareWidth + main.board.border) + main.board.squareWidth / 2;
    for (var j = 0;j < 3;j++) {
      new LayoutSquare(this.game, x, board.y + (2 - j) * main.board.squareHeight + (3 - j) * main.board.border + main.board.squareHeight / 2, main.board.squareWidth, main.board.squareHeight, main.board.squareType.straight, i * 3 + j);
    }
    for (var j = 0;j < 2;j++) {
      new LayoutSquare(this.game, x, board.y + (2 - j) * (main.board.squareHeight + main.board.border) + main.board.border / 2, main.board.squareWidth / 2, main.board.squareHeight / 2, main.board.squareType.split, [main.board.squares[i * 3 + j], main.board.squares[i * 3 + j + 1]]);
    }
    new LayoutSquare(this.game, x, board.y + 3 * (main.board.squareHeight + main.board.border) + main.board.border / 2, main.board.squareWidth / 2, main.board.squareHeight / 2, main.board.squareType.street, [main.board.squares[i * 3], main.board.squares[i * 3 + 1], main.board.squares[i * 3 + 2]]);
  }
  for (var i = 0;i < 11;i++) {
    x = board.x + main.board.leftBorder + main.board.zeroWidth + main.board.border + main.board.squareWidth + main.board.border / 2 + i * (main.board.squareWidth + main.board.border);
    for (var j = 0;j < 3;j++) {
      new LayoutSquare(this.game, x, board.y + (2 - j) * main.board.squareHeight + (3 - j) * main.board.border + main.board.squareHeight / 2, main.board.squareWidth / 2, main.board.squareHeight / 2, main.board.squareType.split, [main.board.squares[i * 3 + j], main.board.squares[i * 3 + j + 3]]);
    }
    for (var j = 0;j < 2;j++) {
      new LayoutSquare(this.game, x, board.y + (2 - j) * (main.board.squareHeight + main.board.border) + main.board.border / 2, main.board.squareWidth / 2, main.board.squareHeight / 2, main.board.squareType.corner, [main.board.squares[i * 3 + j], main.board.squares[i * 3 + j + 1], main.board.squares[i * 3 + j + 3], main.board.squares[i * 3 + j + 4]]);
    }
    new LayoutSquare(this.game, board.x + main.board.leftBorder + main.board.zeroWidth + main.board.border + main.board.squareWidth + main.board.border / 2 + i * (main.board.squareWidth + main.board.border), board.y + 3 * (main.board.squareHeight + main.board.border) + main.board.border / 2, main.board.squareWidth / 2, main.board.squareHeight / 2, main.board.squareType.sixLines, [main.board.squares[i * 3], main.board.squares[i * 3 + 1], main.board.squares[i * 3 + 2], main.board.squares[i * 3 + 3], 
    main.board.squares[i * 3 + 4], main.board.squares[i * 3 + 5]]);
  }
  new LayoutSquare(this.game, board.x + main.board.leftBorder + main.board.zeroWidth + main.board.border / 2, board.y + 2 * (main.board.squareHeight + main.board.border) + main.board.border / 2, main.board.squareWidth / 2, main.board.squareHeight / 2, main.board.squareType.street, [zero, main.board.squares[0], main.board.squares[1]]);
  new LayoutSquare(this.game, board.x + main.board.leftBorder + main.board.zeroWidth + main.board.border / 2, board.y + main.board.squareHeight + main.board.border + main.board.border / 2, main.board.squareWidth / 2, main.board.squareHeight / 2, main.board.squareType.street, [zero, main.board.squares[1], main.board.squares[2]]);
  new LayoutSquare(this.game, board.x + main.board.leftBorder + main.board.zeroWidth + main.board.border / 2, board.y + 3 * (main.board.squareHeight + main.board.border) + main.board.border / 2, main.board.squareWidth / 2, main.board.squareHeight / 2, main.board.squareType.corner, [zero, main.board.squares[0], main.board.squares[1], main.board.squares[2]]);
  var size = 4 * main.board.squareWidth + 3 * main.board.border;
  var squares;
  for (var i = 0;i < 3;i++) {
    squares = [];
    for (var j = 0;j < 12;j++) {
      squares.push(main.board.squares[i + j * 3]);
    }
    new LayoutSquare(this.game, board.x + main.board.leftBorder + main.board.zeroWidth + main.board.border + 12 * (main.board.squareWidth + main.board.border) + main.board.squareWidth / 2, board.y + (2 - i) * main.board.squareHeight + (3 - i) * main.board.border + main.board.squareHeight / 2, main.board.squareWidth, main.board.squareHeight, main.board.squareType.dozensColumns, squares);
    squares = [];
    for (var j = 0;j < 12;j++) {
      squares.push(main.board.squares[i * 12 + j]);
    }
    new LayoutSquare(this.game, board.x + main.board.leftBorder + main.board.zeroWidth + main.board.border + i * (size + main.board.border) + size / 2, board.y + 3 * main.board.squareHeight + 4 * main.board.border + main.board.squareHeight / 2, size, main.board.squareHeight, main.board.squareType.dozensColumns, squares);
  }
  var square;
  squares = [[], [], [], [], [], []];
  size = 2 * main.board.squareWidth + main.board.border;
  for (var i = 0;i < 36;i++) {
    square = main.board.squares[i];
    if (square.properties.number <= 18) {
      squares[0].push(square);
    } else {
      squares[5].push(square);
    }
    if (square.properties.number % 2 == 0) {
      squares[1].push(square);
    } else {
      squares[4].push(square);
    }
    if (square.properties.color == 0) {
      squares[3].push(square);
    } else {
      squares[2].push(square);
    }
  }
  for (var i = 0;i < 6;i++) {
    square = new LayoutSquare(this.game, board.x + main.board.leftBorder + main.board.zeroWidth + main.board.border + i * (size + main.board.border) + size / 2, board.y + 4 * main.board.squareHeight + 5 * main.board.border + main.board.squareHeight / 2, size, main.board.squareHeight, main.board.squareType.evens, squares[i]);
    if (i == 2) {
      main.game.tutorialRed = square;
    }
  }
  this.game.input.onDown.add(this.click);
  this.game.input.onUp.add(this.release);
}, click:function() {
  main.board.pressed = true;
}, release:function() {
  main.board.pressed = false;
  main.phaserGame.time.events.remove(main.board.highlightTimerEvent);
  if (main.board.activeSquare) {
    main.board.self.highlight(false);
    main.board.self.placeChip(main.board.activeSquare);
    main.board.activeSquare = null;
  }
}, setActiveSquare:function(square, down) {
  if (main.board.activeSquare) {
    main.board.self.highlight(false);
  }
  main.board.activeSquare = square;
  if (down) {
    main.board.highlightTimerEvent = main.phaserGame.time.events.add(500, function() {
      main.board.self.highlight(true);
    }, this);
  } else {
    main.board.self.highlight(true);
  }
}, highlight:function(show) {
  if (main.board.activeSquare == undefined) {
    return;
  }
  var square = main.board.activeSquare.properties;
  var squares = square.squares;
  if (show) {
    main.board.self.board.alpha = .4;
    main.game.self.removeWinningSquareHighlight(false);
  } else {
    main.board.self.board.alpha = .75;
  }
  if (square.image) {
    square.image.visible = show;
  }
  for (var i = 0;i < squares.length;i++) {
    squares[i].properties.image.visible = show;
  }
}, placeChip:function(square, id) {
  if (main.game.self.canInteract) {
    if (id == undefined) {
      id = main.game.selectedChip.properties.id;
    }
    var price = main.chip.values[id];
    if (main.storage.data.money >= price) {
      var chip = new Chip(this.game, square, id);
      main.game.self.placeBet(price, id);
      main.game.self.bottomBtns[1].setEnabled(true);
      main.game.self.bottomBtns[2].setEnabled(true);
      main.managers.audio.playSound("chip");
    }
  }
}, removeLastChip:function() {
  var chips = main.game.placedChips;
  if (chips.length > 0) {
    var lastChip = chips.pop();
    var value = lastChip.properties.value;
    lastChip.properties.square.properties.chips.pop();
    lastChip.remove();
    main.game.self.bottomBtns[1].setEnabled(chips.length > 0);
    main.game.self.bottomBtns[2].setEnabled(chips.length > 0);
    return value;
  }
}, removeChips:function(chips) {
  if (chips == undefined) {
    var chipCount = main.game.placedChips.length;
    for (var i = 0;i < chipCount;i++) {
      main.board.self.removeLastChip();
    }
  } else {
    for (var i = 0;i < chips.length;i++) {
      chips[i].properties.square.properties.chips = [];
      chips[i].remove();
    }
  }
}};

