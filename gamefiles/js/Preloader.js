var Preloader = function() {
};
Preloader.prototype = {preload:function() {
  this.game.load.text("lang_strings", "assets/data/m.json");
  this.game.load.image("void", "assets/graphics/void.png");
  this.game.load.image("bg", "assets/graphics/background.png");
  this.game.load.image("overlay", "assets/graphics/overlay.png");
  this.game.load.image("overlay_full", "assets/graphics/overlay_full.png");
  this.game.load.image("logo_inlogic", "assets/graphics/l.png");
  this.game.load.image("logo_game", "assets/graphics/RVC_logo.png");
  this.game.load.image("dialog_light", "assets/graphics/popup-window-light.png");
  this.game.load.image("gradient_light", "assets/graphics/light-gradient-win.png");
  this.game.load.image("gradient_dark", "assets/graphics/dark-gradient-mirror.png");
  this.game.load.image("shine", "assets/graphics/shining-efect.png");
  this.game.load.image("square_light", "assets/graphics/square_light.png");
  this.game.load.image("win_number", "assets/graphics/Winning-number-circle.png");
  this.game.load.image("win_brown", "assets/graphics/you_win_center_circle.png");
  this.game.load.image("win_golden", "assets/graphics/you_win_golden_circle.png");
  this.game.load.image("wheel_bottom", "assets/graphics/bottom-wood-wheel.png");
  this.game.load.image("wheel_center", "assets/graphics/center-wheel-numbers.png");
  this.game.load.image("wheel_center_light", "assets/graphics/center-wheel-light.png");
  this.game.load.image("wheel_top", "assets/graphics/golden-top-wheel.png");
  this.game.load.atlasJSONHash("table", "assets/graphics/table.png", "assets/graphics/table.json");
  this.game.load.atlasJSONHash("ui", "assets/graphics/ui.png", "assets/graphics/ui.json");
  var value;
  for (var key in main.sprites) {
    if (main.sprites.hasOwnProperty(key)) {
      value = main.sprites[key];
      this.game.load.spritesheet(key, value.path, value.w, value.h);
    }
  }
  for (var key in main.audio) {
    if (main.audio.hasOwnProperty(key)) {
      value = main.audio[key];
      this.game.load.audio(key, [value.path + ".ogg", value.path + ".mp3"]);
    }
  }
  main.preloader = this;
  this.inlogicLogoLoaded = false;
  this.gameLogoLoaded = false;
  this.loadingDone = false;
  this.game.load.onLoadStart.add(this.loadingStarted, this);
  this.game.load.onFileComplete.add(this.loadingFileCompleted, this);
  this.game.load.onLoadComplete.add(this.loadingFinished, this);
  this.game.load.start();
}, loadingStarted:function() {
  this.game.load.crossOrigin = "Anonymous";
  this.progress = this.game.add.text(this.game.world.centerX, this.game.world.centerY, "0%", {font:"20px bebas", fill:"#FFFFFF", align:"center"});
  this.progress.anchor.setTo(.5);
}, loadingFileCompleted:function(progress, cacheKey) {
  this.progress.setText(progress + "%");
  var inlLogoImg = "logo_inlogic";
  if (cacheKey == "bg") {
    var bg = this.game.add.image(0, 0, cacheKey);
    bg.width = this.game.width;
    bg.height = this.game.height;
    if (this.inlogicLogo) {
      this.inlogicLogo.bringToTop();
    }
    if (this.gameLogo) {
      this.gameLogo.bringToTop();
    }
    this.progress.bringToTop();
  } else {
    if (cacheKey == inlLogoImg) {
      var logo = this.game.add.image(this.game.world.centerX, this.game.world.centerY, cacheKey);
      logo.anchor.setTo(.5);
      logo.alpha = 0;
      this.inlogicLogo = logo;
      var tween = this.game.add.tween(logo).to({alpha:1}, 500, Phaser.Easing.Linear.None, true);
      tween.onComplete.add(function() {
        main.phaserGame.time.events.add(main.game.splashDelay, function() {
          main.preloader.inlogicLogoLoaded = true;
          if (main.preloader.gameLogoLoaded) {
            main.preloader.showGameLogo();
          }
        }, this);
      });
      this.progress.y = logo.y + logo.height / 2 + this.progress.height;
    } else {
      if (cacheKey == "logo_game") {
        this.gameLogoLoaded = true;
        if (this.inlogicLogoLoaded) {
          this.showGameLogo();
        }
      }
    }
  }
}, loadingFinished:function() {
  var value;
  for (var key in main.audio) {
    if (main.audio.hasOwnProperty(key)) {
      value = main.audio[key];
      if (value.type == "music") {
        main.managers.audio.addMusic(key, value.volume, value.loop);
      } else {
        main.managers.audio.addSound(key, value.volume, value.loop);
      }
    }
  }
  var lang = navigator.userLanguage || navigator.language;
  main.managers.language.load();
  main.managers.language.setLanguage(lang.substring(0, 2));
  main.managers.storage.load();
  this.hideGameLogo();
}, showGameLogo:function() {
  var tween = this.game.add.tween(this.inlogicLogo).to({alpha:0}, 500, Phaser.Easing.Linear.None, true);
  tween.onComplete.add(function() {
    var logo = main.phaserGame.add.image(main.phaserGame.world.centerX, main.phaserGame.world.centerY, "logo_game");
    logo.anchor.setTo(.5);
    logo.alpha = 0;
    main.preloader.gameLogo = logo;
    tween = main.phaserGame.add.tween(logo).to({alpha:1}, 500, Phaser.Easing.Linear.None, true);
    tween.onComplete.add(function() {
      main.phaserGame.time.events.add(main.game.splashDelay, function() {
        main.preloader.hideGameLogo();
      }, this);
    });
    main.preloader.progress.y = logo.y + logo.height / 2 + main.preloader.progress.height;
  });
}, hideGameLogo:function() {
  if (main.preloader.loadingDone) {
    var tween = main.phaserGame.add.tween(main.preloader.gameLogo).to({alpha:0}, 500, Phaser.Easing.Linear.None, true);
    tween.onComplete.add(function() {
      main.phaserGame.state.start("Intro");
    });
  } else {
    main.preloader.loadingDone = true;
  }
}};

