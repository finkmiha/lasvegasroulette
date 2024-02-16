var GAME_OVER_LOSE = 0;
var SOUNDS_ENABLED = true;
var game;
window.onload = function() {
  document.addEventListener("backbutton", function() {
  }, false);
  var RUNNING_ON_WP = navigator.userAgent.indexOf("Windows Phone") > -1;
  if (RUNNING_ON_WP) {
    SOUNDS_ENABLED = false;
  }
  Phaser.Device._initialize();
  var RUNNING_ON_DESKTOP = Phaser.Device.desktop;
  var RUNNING_ON_IOS = false;
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;
  if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i) || userAgent.match(/iPod/i)) {
    RUNNING_ON_IOS = true;
  }
  if (!RUNNING_ON_IOS) {
    document.addEventListener("touchstart", function(e) {
      e.preventDefault();
    });
    document.addEventListener("touchmove", function(e) {
      e.preventDefault();
    });
  }
  main.getResolution = function() {
    var docWidth = document.documentElement.clientWidth;
    var docHeight = document.documentElement.clientHeight;
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i) || userAgent.match(/iPod/i)) {
      docWidth = window.innerWidth;
      docHeight = window.innerHeight;
    }
    var min = 725;
    var resolutionY = 432;
    var aspect = docWidth / docHeight;
    if (aspect > 2) {
      aspect = 2;
    }
    var resolutionX = resolutionY * aspect;
    if (resolutionX < min) {
      resolutionX = min;
    }
    return {x:resolutionX, y:resolutionY};
  };
  game = null;
  phaserInit();
  adinplay_init();
  window.addEventListener("contextmenu", function(e) {
    e.preventDefault();
  });
  document.documentElement.style.overflow = "hidden";
  document.body.scroll = "no";
  window.addEventListener("touchend", function() {
    if (game === null) {
      return;
    }
    try {
      if (game.sound.context.state !== "running") {
        game.sound.context.resume();
      }
    } catch (err) {
    }
  }, false);
};
function phaserInit() {
  game = new Phaser.Game(main.getResolution().x, main.getResolution().y, Phaser.CANVAS);
  game.state.add("Boot", Boot);
  game.state.add("Preloader", Preloader);
  game.state.add("Intro", Intro);
  game.state.add("Menu", Menu);
  game.state.add("Game", Game);
  main.managers.storage = new StorageManager(game);
  main.managers.language = new Languages(game);
  main.managers.audio = new AudioManager(game);
  main.phaserGame = game;
  game.state.start("Boot");
}
;
