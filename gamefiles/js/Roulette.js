var Roulette = function(game, x, onSpinComplete) {
  main.roulette = this;
  this.game = game;
  this.onSpinComplete = onSpinComplete;
  this.ballRadius = -180;
  this.direction = 0;
  this.wheelNumberSize = 360 / 37;
  this.numbers = [0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26];
  var wheel = game.add.image(x + 15, game.world.centerY + 15, "wheel_bottom");
  wheel.anchor.setTo(.5);
  wheel = game.add.sprite(x, game.world.centerY, "wheel_center");
  wheel.anchor.setTo(.5);
  this.wheel = wheel;
  var piko;
  var angle = 90;
  var radians;
  for (var i = 0;i < 8;i++) {
    radians = i * 45 * Math.PI / 180;
    piko = game.add.image(wheel.x + Math.cos(radians) * 165, wheel.y + Math.sin(radians) * 165, "table", "piko-horizontal.png");
    piko.anchor.setTo(.5);
    piko.angle = angle;
    angle -= 45;
  }
  var light = game.add.image(this.wheel.x - 26, this.wheel.y - 26, "wheel_center_light");
  light.anchor.setTo(.5);
  wheel = game.add.image(0, 0, "wheel_top");
  wheel.anchor.setTo(.5);
  this.wheel.addChild(wheel);
  this.wheel.angle = game.rnd.integerInRange(0, 35) * 10;
  var ballAnchor = this.game.add.group();
  ballAnchor.x = this.wheel.x;
  ballAnchor.y = this.wheel.y;
  this.ballAnchor = ballAnchor;
  var ball = game.add.sprite(0, this.ballRadius, "table", "ball.png");
  ball.anchor.setTo(.5);
  ballAnchor.add(ball);
  this.ball = ball;
};
Roulette.prototype = {spin:function() {
  if (!this.spinning) {
    this.wheelSpeed = this.game.rnd.realInRange(2.9, 3.1);
    this.ballSpeed = this.initialBallSpeed = this.game.rnd.realInRange(5.9, 6.1);
    this.ballAnchor.angle = this.game.rnd.integerInRange(0, 35) * 10;
    this.ball.y = this.ballRadius;
    this.targetY = this.game.rnd.integerInRange(-97, -80);
    this.direction = this.direction <= 0 ? 1 : -1;
    this.updateBall = true;
    this.spinning = true;
    var spinTime = 5E3 / 6 * this.ballSpeed;
    var tween = this.game.add.tween(this.ball).to({y:-80}, spinTime, Phaser.Easing.Quintic.In, true);
    tween.onComplete.add(this.ballDrop);
    if (!SOUNDS_ENABLED) {
      return;
    }
    main.managers.audio.playSound("ball_roll");
    if (main.managers.audio.sounds["ball_roll"]._sound === null) {
      return;
    }
    this.game.add.tween(main.managers.audio.sounds["ball_roll"]._sound.playbackRate).to({value:.5}, spinTime - 500, Phaser.Easing.Exponential.In, true);
  }
}, update:function() {
  if (this.spinning) {
    this.wheelSpeed -= .0025;
    this.wheel.angle += this.wheelSpeed * this.direction;
    if (this.updateBall) {
      this.ballAnchor.angle += this.ballSpeed * -this.direction;
      if (this.ballSpeed > 1.5) {
        this.ballSpeed -= .02;
        if (this.ballSpeed < 1.5) {
          this.ballSpeed = 1.5;
        }
      }
    } else {
      this.ballAnchor.angle += this.wheelSpeed * this.direction;
    }
    if (this.wheelSpeed <= 0) {
      this.spinning = false;
    }
  }
}, ballDrop:function() {
  main.roulette.updateBall = false;
  var ball = main.roulette.ball;
  var wheelAng = main.roulette.wheel.angle;
  var ballAng = main.roulette.ballAnchor.angle;
  while (ballAng < 0) {
    ballAng += 360;
  }
  while (ballAng >= 360) {
    ballAng -= 360;
  }
  if (wheelAng < 0) {
    wheelAng += 360;
  } else {
    if (wheelAng >= 360) {
      wheelAng -= 360;
    }
  }
  var diff = ballAng - wheelAng;
  if (diff < 0) {
    diff += 360;
  }
  var position = Math.floor((diff + main.roulette.wheelNumberSize / 2) / main.roulette.wheelNumberSize);
  if (position < 0) {
    position += 37;
  } else {
    if (position >= 37) {
      position -= 37;
    }
  }
  if (main.game.tutorialPlaying) {
    var number = main.roulette.numbers[position];
    if (number == 0) {
      position = 35;
    } else {
      if (main.board.squareColors[number - 1] == 0) {
        position--;
      }
    }
  } else {
    position -= main.roulette.direction * main.phaserGame.rnd.integerInRange(1, 2);
    if (position < 0) {
      position += 37;
    } else {
      if (position >= 37) {
        position -= 37;
      }
    }
  }
  diff = wheelAng + position * main.roulette.wheelNumberSize - ballAng;
  if (diff > 300) {
    diff -= 360;
  }
  var offset = {x:0, lastX:0};
  var tween = main.phaserGame.add.tween(offset).to({x:diff}, 500, Phaser.Easing.Bounce.Out, true);
  tween.onUpdateCallback(function() {
    var delta = offset.x - offset.lastX;
    offset.lastX = offset.x;
    main.roulette.ballAnchor.angle += delta;
  }, this);
  tween = main.roulette.game.add.tween(ball).to({y:main.roulette.ballRadius / 1.85}, 225, Phaser.Easing.Bounce.Out, true, 0);
  tween.onComplete.add(function() {
    tween = main.roulette.game.add.tween(ball).to({y:main.roulette.targetY}, 225, Phaser.Easing.Bounce.Out, true, 0);
    tween.onComplete.add(function() {
      main.roulette.onSpinComplete(main.roulette.numbers[position]);
    });
  });
  main.managers.audio.stopSound("ball_roll");
  main.managers.audio.playSound("ball_drop");
}};

