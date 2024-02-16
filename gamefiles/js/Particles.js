var Particles = function(game, x, y, count) {
  Phaser.Particles.Arcade.Emitter.call(this, game, x, y, count);
  this.makeParticles("particles");
  this.minParticleSpeed.setTo(-75, -75);
  this.maxParticleSpeed.setTo(75, 75);
  this.gravity = 0;
  this.explode = function(lifespan) {
    var fadeInTime = lifespan * .4;
    var tween;
    this.start(false, lifespan, 0, count, true);
    this.forEachAlive(function(particle) {
      particle.alpha = 0;
      tween = game.add.tween(particle).to({alpha:1}, fadeInTime * .3, Phaser.Easing.Linear.None, true, fadeInTime * .7);
      tween.onComplete.add(function() {
        game.add.tween(particle).to({alpha:0}, lifespan - fadeInTime, Phaser.Easing.Linear.None, true);
      });
    });
  };
  this.fire = function(lifespan, frequency, count) {
    this.start(false, lifespan, frequency, count);
  };
  game.add.existing(this);
  return this;
};
Particles.prototype = Object.create(Phaser.Particles.Arcade.Emitter.prototype);
Particles.constructor = Particles;

