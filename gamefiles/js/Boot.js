var Boot = function(game) {
};
Boot.prototype = {preload:function() {
  game.canvas.id = "gameCanvas";
  var gameCanvas = document.getElementById("gameCanvas");
  gameCanvas.style.position = "fixed";
  gameCanvas.style.zIndex = 1;
  window.addEventListener("resize", function() {
    game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    game.scale.refresh();
  });
  if (!game.device.desktop && game.device.chrome && game.device.touch && inIframe()) {
    game.input.mouse.stop();
  }
  game.input.maxPointers = 1;
}, create:function() {
  this.stage.disableVisibilityChange = false;
  this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  this.scale.pageAlignHorizontally = true;
  this.scale.pageAlignVertically = true;
  if (!this.game.device.desktop) {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;
    var runningOnIOS = userAgent.match(/iPad/i) || userAgent.match(/iPhone/i) || userAgent.match(/iPod/i);
    var self = this;
    window.onresize = function() {
      self.checkOrientation(runningOnIOS);
    };
    this.checkOrientation(runningOnIOS);
  }
  this.game.canvas.oncontextmenu = function(e) {
    e.preventDefault();
  };
  window.addEventListener("touchend", function() {
    try {
      if (main.phaserGame.sound.context.state !== "running") {
        main.phaserGame.sound.context.resume();
      }
    } catch (err) {
    }
  }, false);
  this.game.state.start("Preloader");
}, checkOrientation:function(runningOnIOS) {
  var width = runningOnIOS ? window.innerWidth : document.documentElement.clientWidth;
  var height = runningOnIOS ? window.innerHeight : document.documentElement.clientHeight;
  if (height > width) {
    main.phaserGame.paused = true;
    document.getElementById("turn").style.display = "block";
    document.getElementById("gameCanvas").style.display = "none";
  } else {
    main.phaserGame.paused = false;
    document.getElementById("turn").style.display = "none";
    document.getElementById("gameCanvas").style.display = "block";
    if (this.game.height > this.game.width) {
      var res = main.getResolution();
      this.game.scale.setGameSize(res.x, res.y);
      this.game.scale.refresh();
    }
  }
}};
function inIframe() {
  try {
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
}
;
