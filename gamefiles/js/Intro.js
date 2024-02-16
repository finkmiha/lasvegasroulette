var Intro = function(game) {
};
Intro.prototype = {create:function() {
  this._create();
}, _create:function() {
  this.game.state.start("Menu");
}};

