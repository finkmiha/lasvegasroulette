var Chip = function(game, square, id) {
  var chipsOnSquare = square.properties.chips;
  var x = (chipsOnSquare.length == 0 ? square.x : chipsOnSquare[square.properties.chips.length - 1].x) + game.rnd.realInRange(-main.chip.offset, main.chip.offset);
  var y = (chipsOnSquare.length == 0 ? square.y : chipsOnSquare[square.properties.chips.length - 1].y) + game.rnd.realInRange(-main.chip.offset, main.chip.offset);
  Phaser.Image.call(this, game, x, y, "table", main.chip.sprites[id]);
  this.scale.x = 0;
  this.scale.y = 0;
  this.anchor.setTo(.5);
  this.properties = {id:id, square:square, value:main.chip.values[id]};
  this.remove = function() {
    var self = this;
    var tween = game.add.tween(this.scale).to({x:0, y:0}, 250, Phaser.Easing.Exponential.Out, true);
    tween.onComplete.add(function() {
      self.destroy();
    });
  };
  square.properties.chips.push(this);
  main.game.placedChips.push(this);
  game.add.existing(this);
  game.add.tween(this.scale).to({x:.4, y:.4}, 250, Phaser.Easing.Exponential.Out, true);
};
Chip.prototype = Object.create(Phaser.Image.prototype);
Chip.constructor = Chip;

