var Game = function() {
};
Game.prototype = {create:function() {
  main.game.self = this;
  main.game.self.lastSpinScore = 0;
  main.game.self.sessionScore = 0;
  var bg = this.game.add.image(-this.game.width, 0, "bg");
  bg.width = this.game.width * 2;
  bg.height = this.game.height;
  var middleBtn = new Button(this.game, 0, 0, "ui", "midle-button.png", "midle-button-light.png", this.btnChipsClicked);
  var bigBtn = new Button(this.game, 0, 0, "ui", "spin-button.png", "spin-button-light.png", this.btnSpinClicked);
  var btnW = middleBtn.width;
  var btnH = middleBtn.height;
  var totalW = 4 * btnW + bigBtn.width;
  var offset = (this.game.width - totalW) / 6;
  var offsetY = bigBtn.height / 6;
  var firstX = offset + btnW / 2;
  this.offsetY = offsetY;
  var icon = this.game.add.image(0, 0, "table", main.chip.sprites[0]);
  icon.anchor.setTo(.5);
  icon.scale.x = .5;
  icon.scale.y = .5;
  middleBtn.addChild(icon);
  middleBtn.setX(firstX);
  middleBtn.setY(this.game.height - offsetY - btnH / 2);
  middleBtn.properties.icon = icon;
  this.chipsBtn = middleBtn;
  this.offset = offset;
  var btnIcons = ["icon-repeat.png", "icon-undo.png", "icon-clear.png"];
  var btnFunctions = [this.btnLastBetClicked, this.btnUndoClicked, this.btnClearClicked];
  var enabled = [main.storage.data.lastBets.length > 0 && main.storage.data.money >= main.storage.data.lastBetsPrice, false, false];
  this.bottomBtns = [];
  for (var i = 0;i < 3;i++) {
    firstX += offset + btnW;
    middleBtn = new Button(this.game, firstX, this.game.height - offsetY - btnH / 2, "ui", "midle-button.png", "midle-button-light.png", btnFunctions[i]);
    icon = this.game.add.image(0, 0, "ui", btnIcons[i]);
    icon.anchor.setTo(.5);
    middleBtn.addIcon(icon);
    middleBtn.setEnabled(enabled[i]);
    this.bottomBtns.push(middleBtn);
  }
  bigBtn.setX(firstX + btnW / 2 + offset + bigBtn.width / 2);
  bigBtn.setY(this.game.height - offsetY - bigBtn.height / 2);
  var spinText = this.game.add.text(0, 0, main.managers.language.get("spin"), {font:"30pt bebas", fill:"#FFFFFF", align:"center"});
  spinText.anchor.setTo(.5);
  bigBtn.addChild(spinText);
  this.spinBtn = bigBtn;
  var chipBtn = new Button(this.game, 0, 0, "table", main.chip.sprites[0], null, this.windowChipClicked);
  var chipBtnW = chipBtn.width;
  var chipBtnH = chipBtn.height;
  var chipBtnOffset = 5;
  var chipsW = 6 * chipBtnW + 7 * chipBtnOffset;
  var chipsH = 2 * chipBtnH + 3 * chipBtnOffset;
  var chipWindow = new Sprite(offset + chipsW / 2, this.game.height - offsetY - chipsH / 2, chipsW, chipsH, "button_big");
  var x = -chipWindow.properties.w / 2 + chipBtnOffset + chipBtnW / 2;
  var y = -chipWindow.properties.h / 2 + chipBtnOffset + chipBtnH / 2;
  chipWindow.properties = {opened:{x:chipWindow.x, y:chipWindow.y}};
  chipBtn.setX(x);
  chipBtn.setY(y);
  chipBtn.properties.id = 0;
  chipBtn.properties.value = main.chip.values[0];
  var chipHighlight = this.game.add.image(x, y, "table", "chip-light.png");
  chipHighlight.anchor.setTo(.5);
  this.chipHighlight = chipHighlight;
  chipWindow.add(chipHighlight);
  chipWindow.add(chipBtn);
  for (var i = 1;i < main.chip.values.length;i++) {
    chipBtn = new Button(this.game, x + i % 6 * (chipBtnW + chipBtnOffset), y + (i < 6 ? 0 : chipBtnH + chipBtnOffset), "table", main.chip.sprites[i], null, this.windowChipClicked);
    chipBtn.properties.id = i;
    chipBtn.properties.value = main.chip.values[i];
    chipWindow.add(chipBtn);
    if (i == main.storage.data.selectedChipID) {
      this.windowChipClicked(chipBtn, true);
    }
    if (chipBtn.properties.value == 50) {
      main.game.tutorialChip = chipBtn;
    }
  }
  if (main.storage.data.selectedChipID == 0) {
    this.windowChipClicked(chipBtn, true);
  }
  this.chipWindow = chipWindow;
  chipWindow.x = this.chipsBtn.x;
  chipWindow.y = this.chipsBtn.y;
  chipWindow.properties.closed = {x:chipWindow.x, y:chipWindow.y};
  chipWindow.scale.setTo(0);
  main.game.self.chipWindowY = main.phaserGame.height - chipWindow.height / 2 - (chipWindow.x - chipWindow.width / 2);
  var statsBtn = new Button(this.game, 0, 0, "ui", "small-button.png", "small-button-light.png", this.btnStatsClicked);
  var statsIcon = this.game.add.image(0, 0, "ui", "icon-stats.png");
  statsIcon.anchor.setTo(.5);
  statsBtn.addIcon(statsIcon);
  main.game.self.statsBtn = statsBtn;
  btnW = statsBtn.width;
  btnH = statsBtn.height;
  var lastNumber = this.game.add.image(0, 0, "ui", "icon-last-no.png");
  var sidePanelOffset = lastNumber.height / 3;
  var sidePanelW = Math.max(btnW, lastNumber.width) * 1.25;
  var sidePanelH = 2 * sidePanelOffset + (lastNumber.height + sidePanelOffset) * main.game.lastNumberCount + btnH;
  var graphics = this.game.add.graphics(0, 0);
  graphics.fixedToCamera = true;
  graphics.beginFill(0, .14);
  this.sidePanelX = offset + sidePanelW / 2;
  this.sidePanelY = this.game.world.centerY - sidePanelH / 2;
  this.lastNumberW = lastNumber.width;
  this.sidePanelOffset = sidePanelOffset;
  graphics.drawRect(this.sidePanelX - sidePanelW / 2, this.sidePanelY, sidePanelW, sidePanelH);
  statsBtn.setX(this.sidePanelX);
  statsBtn.setY(this.sidePanelY + sidePanelH - sidePanelOffset - btnH / 2);
  statsBtn.fixedToCamera = true;
  lastNumber.destroy();
  var sidePanelRight = offset + sidePanelW;
  var board = new Board(this.game, sidePanelRight + (this.game.width - sidePanelRight) / 2);
  var roulette = new Roulette(this.game, -this.game.width / 2, this.onSpinComplete);
  this.board = board;
  this.roulette = roulette;
  var topBarH = 2 * offsetY + btnH;
  var chunkW = this.game.width / 3;
  graphics = this.game.add.graphics(0, 0);
  graphics.beginFill(0, .14);
  graphics.drawRect(0, 0, this.game.width, topBarH);
  graphics.drawRect(chunkW, 0, chunkW, topBarH);
  var settingsBtn = new Button(this.game, offset + btnW / 2, topBarH / 2, "ui", "small-button.png", "small-button-light.png", this.btnSettingsClicked);
  var settingsIcon = this.game.add.image(0, 0, "ui", "icon-info.png");
  settingsIcon.anchor.setTo(.5);
  settingsBtn.addIcon(settingsIcon);
  this.settingsBtn = settingsBtn;
  var chipIcon = this.game.add.image(2 * chunkW - offset, topBarH / 2, "ui", "icon-chips.png");
  chipIcon.anchor.setTo(1, .5);
  chipIcon.scale.x = .5;
  chipIcon.scale.y = .5;
  var totalText = this.game.add.text(chunkW + offset, topBarH / 2, main.managers.language.get("total"), {font:"14pt bebas", fill:"#FFFFFF", align:"center"});
  totalText.anchor.setTo(0, .5);
  totalText.alpha = .5;
  var totalValue = this.game.add.text(chipIcon.x - chipIcon.width * 1.5, topBarH / 2, main.storage.data.money, {font:"16pt bebas", fill:"#FFFFFF", align:"center"});
  totalValue.anchor.setTo(1, .5);
  totalValue.alpha = .9;
  this.moneyText = totalValue;
  chipIcon = this.game.add.image(this.game.width - offset, topBarH / 2, "ui", "icon-chips.png");
  chipIcon.anchor.setTo(1, .5);
  chipIcon.scale.x = .5;
  chipIcon.scale.y = .5;
  var betText = this.game.add.text(2 * chunkW + offset, topBarH / 2, main.managers.language.get("bet"), {font:"14pt bebas", fill:"#FFFFFF", align:"center"});
  betText.anchor.setTo(0, .5);
  betText.alpha = .5;
  var betValue = this.game.add.text(chipIcon.x - chipIcon.width * 1.5, topBarH / 2, "0", {font:"16pt bebas", fill:"#FFFFFF", align:"center"});
  betValue.anchor.setTo(1, .5);
  betValue.alpha = .9;
  this.betText = betValue;
  this.particles = new Particles(this.game, 0, 0, 100);
  this.canInteract = true;
  this.game.input.onUp.add(this.release);
  this.game.world.setBounds(-this.game.width, 0, this.game.width * 2, this.game.height);
  var lastNumbers = main.storage.data.lastNumbers;
  var lastNumbersCount = Math.min(lastNumbers.length, main.game.lastNumberCount);
  var index = Math.max(0, lastNumbers.length - main.game.lastNumberCount);
  this.game.time.events.repeat(500 / lastNumbersCount, lastNumbersCount, function() {
    this.addLastNumber(lastNumbers[index++], true);
  }, this);
  if (!main.storage.data.tutorialPlayed) {
    this.startTutorial();
  } else {
    if (main.storage.data.money < 10) {
      this.showResetWindow();
    }
  }
  main.managers.audio.playMusic(main.managers.audio.actualMusic, true);
  analyticsOnGameStartEvent();
}, update:function() {
  main.game.self.roulette.update();
}, release:function() {
  if (!main.game.tutorialPlaying) {
    main.game.self.hideChipWindow();
  }
}, setInteraction:function(enable) {
  main.game.self.canInteract = enable;
  main.game.self.settingsBtn.setEnabled(enable);
  main.game.self.statsBtn.setEnabled(enable);
}, btnChipsClicked:function() {
  if (main.game.self.canInteract) {
    main.managers.audio.playSound("click");
    main.game.self.showChipWindow();
  }
}, windowChipClicked:function(chip, force) {
  if ((main.game.self.chipWindowOpened || force) && (!main.game.tutorialPlaying || chip.properties.value == 50)) {
    if (!force) {
      main.managers.audio.playSound("click");
    }
    main.game.selectedChip = chip;
    main.game.self.chipHighlight.x = chip.x;
    main.game.self.chipHighlight.y = chip.y;
    main.game.self.btnChipsSetFrame(chip.properties.id, main.storage.data.money >= chip.properties.value);
    if (!force) {
      main.storage.data.selectedChipID = chip.properties.id;
    }
    if (main.game.tutorialPlaying) {
      main.game.tutorialChipNew.x = main.phaserGame.width + 2 * main.game.tutorialChipNew.width;
      main.game.tutorialChipNew.y = main.phaserGame.height + 2 * main.game.tutorialChipNew.height;
      main.game.self.hideChipWindow();
    }
  }
}, btnLastBetClicked:function() {
  if (main.game.self.canInteract) {
    main.game.self.btnClearClicked(null, false);
    main.game.self.loadLastBets();
  }
}, btnUndoClicked:function() {
  if (main.game.self.canInteract && main.game.placedChips.length > 0) {
    main.managers.audio.playSound("click_back");
    main.game.self.placeBet(-main.game.self.board.removeLastChip());
  }
}, btnClearClicked:function(btn, playSound) {
  if (main.game.self.canInteract) {
    if (playSound == undefined || playSound) {
      if (main.game.placedChips.length >= 5) {
        main.managers.audio.playSound("clear_chips");
      } else {
        if (main.game.placedChips.length > 0) {
          main.managers.audio.playSound("click_back");
        }
      }
    }
    main.game.self.placeBet(-main.storage.data.bet);
    main.game.self.board.removeChips();
  }
}, btnSpinClicked:function() {
  if (main.game.self.canInteract === false) {
    return;
  }
  adinplay_onAdStarted = function() {
    game.paused = false;
    main.game.self._btnSpinClicked();
  }.bind(this);
  adinplay_onAdFinished = function() {
  };
  adinplay_playVideoAd();
}, _btnSpinClicked:function() {
  if (main.game.self.canInteract) {
    main.managers.audio.playSound("click");
    main.game.self.setInteraction(false);
    main.game.self.saveLastBets();
    main.game.self.roulette.spin();
    main.phaserGame.add.tween(main.phaserGame.camera).to({x:-main.phaserGame.width}, 1E3, Phaser.Easing.Exponential.Out, true);
  }
}, btnStatsClicked:function(btn) {
  if (main.game.self.canInteract) {
    main.game.self.setInteraction(false);
    main.managers.audio.playSound("click");
    var rowCount = 5;
    var rowH = main.game.self.betText.height + 2 * main.game.self.offsetY;
    var statsWindow = new Sprite(main.phaserGame.width / 2, main.phaserGame.world.centerY, main.sprites.button_big.w, rowCount * rowH + 2 * main.game.self.offsetY, "button_big");
    var rowBg;
    var y = -statsWindow.properties.h / 2 + main.game.self.offsetY + rowH / 2;
    for (var i = 0;i < rowCount;i += 2) {
      rowBg = main.phaserGame.add.image(0, y + i * rowH, "gradient_dark");
      rowBg.width = statsWindow.properties.w;
      rowBg.height = rowH;
      rowBg.anchor.setTo(.5);
      statsWindow.add(rowBg);
    }
    var lastNumbers = main.phaserGame.add.text(0, y, main.managers.language.get("last_numbers"), {font:"14pt bebas", fill:"#FFFFFF", align:"center"});
    lastNumbers.anchor.setTo(.5);
    lastNumbers.alpha = .5;
    statsWindow.add(lastNumbers);
    var color;
    var number;
    var numbers = main.storage.data.lastNumbers;
    var lastNumber;
    var lastNumberText;
    var x = -(numbers.length * (main.game.self.lastNumberW + main.game.self.offsetY) - main.game.self.offsetY) / 2 + main.game.self.lastNumberW / 2;
    for (var i = 0;i < numbers.length;i++) {
      number = numbers[i];
      if (number == 0) {
        color = 44113;
      } else {
        if (main.board.squareColors[number - 1] == 1) {
          color = 15670308;
        } else {
          color = 0;
        }
      }
      lastNumber = main.phaserGame.add.image(x + i * (main.game.self.lastNumberW + main.game.self.offsetY), y + rowH, "ui", "icon-last-no.png");
      lastNumber.anchor.setTo(.5);
      lastNumber.tint = color;
      lastNumberText = main.phaserGame.add.text(0, 1.75, number, {font:"10pt bebas", fill:"#FFFFFF", align:"center"});
      lastNumberText.anchor.setTo(.5);
      lastNumber.addChild(lastNumberText);
      statsWindow.add(lastNumber);
    }
    var result = main.phaserGame.add.text(0, y + 2 * rowH, main.managers.language.get("result"), {font:"14pt bebas", fill:"#FFFFFF", align:"center"});
    result.anchor.setTo(.5);
    result.alpha = .5;
    statsWindow.add(result);
    var lastSpin = main.phaserGame.add.text(-statsWindow.properties.w / 4, y + 3 * rowH, main.managers.language.get("last_spin"), {font:"14pt bebas", fill:"#FFFFFF", align:"center"});
    lastSpin.anchor.setTo(0, .5);
    lastSpin.alpha = .5;
    statsWindow.add(lastSpin);
    var session = main.phaserGame.add.text(-statsWindow.properties.w / 4, y + 4 * rowH, main.managers.language.get("session"), {font:"14pt bebas", fill:"#FFFFFF", align:"center"});
    session.anchor.setTo(0, .5);
    session.alpha = .5;
    statsWindow.add(session);
    var chipIcon = main.phaserGame.add.image(statsWindow.properties.w / 4, y + 3 * rowH, "ui", "icon-chips.png");
    chipIcon.anchor.setTo(1, .5);
    chipIcon.scale.x = .5;
    chipIcon.scale.y = .5;
    statsWindow.add(chipIcon);
    var score = main.game.self.lastSpinScore;
    lastSpin = main.phaserGame.add.text(chipIcon.x - chipIcon.width - main.game.self.offsetY, y + 3 * rowH, (score > 0 ? "+" : "") + score, {font:"16pt bebas", fill:"#FFFFFF", align:"center"});
    lastSpin.anchor.setTo(1, .5);
    lastSpin.alpha = .9;
    statsWindow.add(lastSpin);
    chipIcon = main.phaserGame.add.image(statsWindow.properties.w / 4, y + 4 * rowH, "ui", "icon-chips.png");
    chipIcon.anchor.setTo(1, .5);
    chipIcon.scale.x = .5;
    chipIcon.scale.y = .5;
    statsWindow.add(chipIcon);
    score = main.game.self.sessionScore;
    session = main.phaserGame.add.text(chipIcon.x - chipIcon.width - main.game.self.offsetY, y + 4 * rowH, (score > 0 ? "+" : "") + score, {font:"16pt bebas", fill:"#FFFFFF", align:"center"});
    session.anchor.setTo(1, .5);
    session.alpha = .9;
    statsWindow.add(session);
    var closeBtn = new Button(main.phaserGame, statsWindow.properties.w / 2, -statsWindow.properties.h / 2, "ui", "small-button.png", null, main.game.self.btnCloseStatsClicked);
    var closeIcon = main.phaserGame.add.image(0, 0, "ui", "icon-close.png");
    closeIcon.anchor.setTo(.5);
    closeIcon.scale.setTo(.75);
    closeIcon.tint = 5673809;
    closeBtn.setX(closeBtn.x - closeBtn.width / 2);
    closeBtn.setY(closeBtn.y + closeBtn.height / 2);
    closeBtn.scale.setTo(.75);
    closeBtn.addChild(closeIcon);
    statsWindow.add(closeBtn);
    main.game.self.statsWindow = statsWindow;
    statsWindow.x = btn.x;
    statsWindow.y = btn.y;
    statsWindow.scale.setTo(0);
    statsWindow.properties = {x:statsWindow.x, y:statsWindow.y};
    var overlay = main.phaserGame.add.image(0, 0, "overlay");
    overlay.width = main.phaserGame.width;
    overlay.height = main.phaserGame.height;
    overlay.alpha = 0;
    main.game.self.overlay = overlay;
    main.phaserGame.world.bringToTop(statsWindow);
    main.phaserGame.add.tween(overlay).to({alpha:1}, 225, Phaser.Easing.Linear.None, true);
    main.phaserGame.add.tween(statsWindow).to({x:main.phaserGame.width / 2, y:main.phaserGame.height / 2}, 225, Phaser.Easing.Back.Out, true);
    main.phaserGame.add.tween(statsWindow.scale).to({x:1, y:1}, 225, Phaser.Easing.Back.Out, true);
  }
}, btnCloseStatsClicked:function() {
  main.managers.audio.playSound("click");
  var window = main.game.self.statsWindow;
  var tween = main.phaserGame.add.tween(window.scale).to({x:0, y:0}, 100, Phaser.Easing.Linear.None, true);
  main.phaserGame.add.tween(window).to({x:window.properties.x, y:window.properties.y}, 100, Phaser.Easing.Linear.None, true);
  tween.onComplete.add(function() {
    main.game.self.overlay.destroy();
    window.destroy();
    main.game.self.setInteraction(true);
  });
}, btnSettingsClicked:function() {
  if (main.game.self.canInteract) {
    main.managers.audio.playSound("click");
    main.game.self.setInteraction(false);
    var settingsGroup = main.phaserGame.add.group();
    var contentGroup = main.phaserGame.add.group();
    var topPanel = main.phaserGame.add.image(0, 0, "overlay_full");
    topPanel.width = main.phaserGame.width;
    topPanel.height = 50;
    settingsGroup.add(topPanel);
    var chunk = main.phaserGame.width / 3;
    var indicator = main.phaserGame.add.image(0, 0, "gradient_light");
    indicator.width = chunk;
    indicator.height = 3;
    indicator.anchor.setTo(0, 1);
    settingsGroup.add(indicator);
    var settingsBtn = new Button(main.phaserGame, chunk / 2, main.game.self.offsetY, "ui", "icon-game-settings.png", null, function() {
      main.phaserGame.add.tween(contentGroup).to({x:0}, 250, Phaser.Easing.Exponential.Out, true);
      main.phaserGame.add.tween(indicator).to({x:0}, 250, Phaser.Easing.Exponential.Out, true);
    });
    settingsBtn.y += settingsBtn.height / 2;
    settingsGroup.add(settingsBtn);
    var text = main.phaserGame.add.text(settingsBtn.x, settingsBtn.y + settingsBtn.height / 2 + main.game.self.offsetY, main.managers.language.get("settings"), {font:"8pt bebas", fill:"#FFFFFF", align:"center"});
    text.anchor.setTo(.5, 0);
    settingsGroup.add(text);
    topPanel.height = 3 * main.game.self.offsetY + settingsBtn.height + text.height;
    indicator.y = topPanel.height;
    var instructionsBtn = new Button(main.phaserGame, chunk * 1.5, topPanel.height / 2, "ui", "icon-rules.png", null, function() {
      main.phaserGame.add.tween(contentGroup).to({x:-main.phaserGame.width}, 250, Phaser.Easing.Exponential.Out, true);
      main.phaserGame.add.tween(indicator).to({x:chunk}, 250, Phaser.Easing.Exponential.Out, true);
    });
    instructionsBtn.y -= (instructionsBtn.height + main.game.self.offsetY + text.height) / 2 - instructionsBtn.height / 2;
    settingsGroup.add(instructionsBtn);
    text = main.phaserGame.add.text(instructionsBtn.x, instructionsBtn.y + instructionsBtn.height / 2 + main.game.self.offsetY, main.managers.language.get("instructions"), {font:"8pt bebas", fill:"#FFFFFF", align:"center"});
    text.anchor.setTo(.5, 0);
    settingsGroup.add(text);
    var aboutBtn = new Button(main.phaserGame, chunk * 2.5, topPanel.height / 2, "ui", "icon-support.png", null, function() {
      main.phaserGame.add.tween(contentGroup).to({x:-2 * main.phaserGame.width}, 250, Phaser.Easing.Exponential.Out, true);
      main.phaserGame.add.tween(indicator).to({x:2 * chunk}, 250, Phaser.Easing.Exponential.Out, true);
    });
    aboutBtn.y -= (aboutBtn.height + main.game.self.offsetY + text.height) / 2 - aboutBtn.height / 2;
    settingsGroup.add(aboutBtn);
    text = main.phaserGame.add.text(aboutBtn.x, aboutBtn.y + aboutBtn.height / 2 + main.game.self.offsetY, main.managers.language.get("about"), {font:"8pt bebas", fill:"#FFFFFF", align:"center"});
    text.anchor.setTo(.5, 0);
    settingsGroup.add(text);
    var closeBtn = new Button(main.phaserGame, main.phaserGame.width, 0, "ui", "small-button.png", null, main.game.self.btnCloseSettingsClicked);
    var closeIcon = main.phaserGame.add.image(0, 0, "ui", "icon-close.png");
    closeIcon.anchor.setTo(.5);
    closeIcon.scale.setTo(.75);
    closeIcon.tint = 5673809;
    closeBtn.setX(closeBtn.x - closeBtn.width / 2);
    closeBtn.setY(closeBtn.y + closeBtn.height / 2);
    closeBtn.scale.setTo(.75);
    closeBtn.addChild(closeIcon);
    settingsGroup.add(closeBtn);
    var bg = main.phaserGame.add.image(0, topPanel.height, "bg");
    bg.width = main.phaserGame.width;
    bg.height = main.phaserGame.height - topPanel.height;
    settingsGroup.add(bg);
    settingsGroup.add(contentGroup);
    var centerY = topPanel.height + (main.phaserGame.height - topPanel.height) / 2;
    if (SOUNDS_ENABLED) {
      var soundsText = main.phaserGame.add.text(main.phaserGame.width * .25, centerY, main.managers.language.get("sounds"), {font:"14pt bebas", fill:"#FFFFFF", align:"center"});
      soundsText.anchor.setTo(0, .5);
      soundsText.y -= 1.5 * text.height;
      contentGroup.add(soundsText);
      var musicText = main.phaserGame.add.text(main.phaserGame.width * .25, centerY, main.managers.language.get("music"), {font:"14pt bebas", fill:"#FFFFFF", align:"center"});
      musicText.anchor.setTo(0, .5);
      musicText.y += 1.5 * text.height;
      contentGroup.add(musicText);
      var barW = main.phaserGame.width / 4;
      var barH = 5;
      var minX = main.phaserGame.width * .75 - barW;
      var maxX = minX + barW;
      var bars = main.phaserGame.add.graphics(0, 0);
      bars.beginFill(7829367, .85);
      bars.drawRect(minX, soundsText.y - barH / 2, barW, barH);
      bars.drawRect(minX, musicText.y - barH / 2, barW, barH);
      contentGroup.add(bars);
      var greenPartSound = main.phaserGame.add.image(minX, soundsText.y, "overlay");
      greenPartSound.anchor.setTo(0, .5);
      greenPartSound.width = barW * main.storage.data.sounds;
      greenPartSound.height = barH;
      greenPartSound.tint = 44113;
      contentGroup.add(greenPartSound);
      var greenPartMusic = main.phaserGame.add.image(minX, musicText.y, "overlay");
      greenPartMusic.anchor.setTo(0, .5);
      greenPartMusic.width = barW * main.storage.data.music;
      greenPartMusic.height = barH;
      greenPartMusic.tint = 44113;
      contentGroup.add(greenPartMusic);
      var soundSlider = main.game.self.createAudioSlider(minX + barW * main.storage.data.sounds, soundsText.y, minX, maxX, contentGroup, function() {
        main.storage.data.sounds = 1 / barW * (soundSlider.x - minX);
        greenPartSound.width = barW * main.storage.data.sounds;
      });
      var musicSlider = main.game.self.createAudioSlider(minX + barW * main.storage.data.music, musicText.y, minX, maxX, contentGroup, function() {
        main.managers.audio.setMusicVolume(1 / barW * (musicSlider.x - minX));
        greenPartMusic.width = barW * main.storage.data.music;
      });
    }
    text = main.phaserGame.add.text(main.phaserGame.width * 1.5, centerY, main.managers.language.get("instructions_text"), {font:"14pt bebas", fill:"#FFFFFF", align:"center", wordWrap:true, wordWrapWidth:main.phaserGame.width / 2});
    text.anchor.setTo(.5);
    contentGroup.add(text);
    var logo = main.phaserGame.add.image(main.phaserGame.width * 2.5, 0, "logo_inlogic");
    logo.anchor.setTo(.5, 0);
    contentGroup.add(logo);
    text = main.phaserGame.add.text(main.phaserGame.width * 2.5, 0, main.managers.language.get("title"), {font:"14pt bebas", fill:"#FFFFFF", align:"center"});
    text.anchor.setTo(.5, 1);
    contentGroup.add(text);
    var h = logo.height + main.game.self.offsetY + text.height;
    logo.y = centerY - h / 2;
    text.y = centerY + h / 2;
    main.game.self.settings = settingsGroup;
    settingsGroup.y = -main.phaserGame.height;
    main.phaserGame.add.tween(settingsGroup).to({y:0}, 250, Phaser.Easing.Exponential.Out, true);
  }
}, createAudioSlider:function(x, y, minX, maxX, group, onUpdate) {
  var slider = main.phaserGame.add.graphics(x, y);
  slider.beginFill(44113, 1);
  slider.drawCircle(0, 0, 25);
  slider.inputEnabled = true;
  slider.input.enableDrag();
  slider.input.allowVerticalDrag = false;
  slider.events.onDragStart.add(function() {
    main.managers.audio.playSound("click");
  });
  slider.events.onDragStop.add(function() {
    main.managers.audio.playSound("click");
  });
  slider.events.onDragUpdate.add(function() {
    if (slider.x < minX) {
      slider.x = minX;
    } else {
      if (slider.x > maxX) {
        slider.x = maxX;
      }
    }
    onUpdate();
  }, this);
  group.add(slider);
  return slider;
}, btnCloseSettingsClicked:function() {
  main.managers.audio.playSound("click");
  var tween = main.phaserGame.add.tween(main.game.self.settings).to({y:-main.phaserGame.height}, 250, Phaser.Easing.Exponential.Out, true);
  tween.onComplete.add(function() {
    main.game.self.settings.destroy();
    main.game.self.setInteraction(true);
  });
}, showResetWindow:function() {
  main.game.self.setInteraction(false);
  main.game.self.moneyReset = false;
  var window = new Sprite(this.game.width / 2, this.game.height / 2, this.game.width / 2, 160, "button_big");
  var text = this.game.add.text(0, -window.properties.h / 4, main.managers.language.get("out_of_chips"), {font:"14pt bebas", fill:"#FFFFFF", align:"center"});
  text.anchor.setTo(.5);
  window.add(text);
  this.onGameOver(GAME_OVER_LOSE);
  var btn = new Button(this.game, 0, window.properties.h / 4, "ui", "midle-button.png", null, this.resetMoney);
  text = this.game.add.text(0, window.properties.h / 4, "OK", {font:"12pt bebas", fill:"#FFFFFF", align:"center"});
  text.anchor.setTo(.5);
  window.add(btn);
  window.add(text);
  window.scale.setTo(0);
  main.game.self.resetWindow = window;
  var overlay = main.phaserGame.add.image(0, 0, "overlay");
  overlay.width = main.phaserGame.width;
  overlay.height = main.phaserGame.height;
  overlay.alpha = 0;
  main.game.self.overlay = overlay;
  main.phaserGame.world.bringToTop(window);
  main.phaserGame.add.tween(overlay).to({alpha:1}, 225, Phaser.Easing.Linear.None, true);
  main.phaserGame.add.tween(window.scale).to({x:1, y:1}, 225, Phaser.Easing.Back.Out, true);
}, onGameOver:function(TYPE_GAME_END) {
  if (TYPE_GAME_END === GAME_OVER_LOSE) {
  }
  this.showAd();
}, showAd:function() {
}, resetMoney:function() {
  if (!main.game.self.moneyReset) {
    main.game.self.moneyReset = true;
    main.game.self.updateMoney(5E3, 0);
    main.managers.storage.save();
    main.game.self.closeWindow();
    main.game.self.btnChipsSetFrame(main.game.selectedChip.properties.id, main.storage.data.money >= main.game.selectedChip.properties.value);
    main.game.self.bottomBtns[0].setEnabled(main.storage.data.lastBets.length > 0 && main.storage.data.money >= main.storage.data.lastBetsPrice);
  }
}, closeWindow:function() {
  main.managers.audio.playSound("click");
  var window = main.game.self.resetWindow;
  var tween = main.phaserGame.add.tween(window.scale).to({x:0, y:0}, 100, Phaser.Easing.Linear.None, true);
  tween.onComplete.add(function() {
    main.game.self.overlay.destroy();
    window.destroy();
    main.game.self.setInteraction(true);
  });
}, showChipWindow:function() {
  var window = main.game.self.chipWindow;
  main.game.self.updateChipWindow();
  main.game.self.setInteraction(false);
  if (!main.game.tutorialPlaying) {
    var overlay = main.phaserGame.add.image(0, 0, "overlay");
    overlay.width = main.phaserGame.width;
    overlay.height = main.phaserGame.height;
    overlay.alpha = 0;
    main.game.self.overlay = overlay;
    main.phaserGame.add.tween(overlay).to({alpha:1}, 225, Phaser.Easing.Linear.None, true);
  }
  main.phaserGame.world.bringToTop(window);
  main.phaserGame.add.tween(window.scale).to({x:1, y:1}, 225, Phaser.Easing.Back.Out, true);
  var tween = main.phaserGame.add.tween(window).to({x:window.properties.opened.x, y:window.properties.opened.y}, 225, Phaser.Easing.Back.Out, true);
  tween.onComplete.add(function() {
    if (main.game.tutorialPlaying) {
      main.game.overlay.bringToTop();
    }
    main.phaserGame.time.events.add(250, function() {
      if (main.game.tutorialPlaying) {
        var btn = new Button(main.phaserGame, main.game.tutorialChip.world.x, main.game.tutorialChip.world.y, "table", main.chip.sprites[8], null, main.game.self.windowChipClicked);
        btn.properties.id = 8;
        btn.properties.value = main.chip.values[8];
        main.game.tutorialChipNew = btn;
        main.game.self.updateTutorialArrow(btn);
      }
    }, this);
    main.game.self.chipWindowOpened = true;
  });
}, hideChipWindow:function() {
  if (main.game.self.chipWindowOpened) {
    var window = main.game.self.chipWindow;
    var tween = main.phaserGame.add.tween(window).to({x:window.properties.closed.x, y:window.properties.closed.y}, 100, Phaser.Easing.Linear.None, true);
    tween.onComplete.add(function() {
      main.game.self.chipWindowOpened = false;
      main.game.self.setInteraction(true);
      if (main.game.tutorialPlaying) {
        var red = main.phaserGame.add.image(main.game.tutorialRed.x, main.game.tutorialRed.y, "table", "tutorial-red.png");
        red.anchor.setTo(.5);
        main.game.tutorialRed.bringToTop();
        main.game.tutorialRed = red;
        main.game.tutorialChipNew.destroy();
        main.game.self.updateTutorialArrow(red);
        main.game.self.windowChipClicked(main.game.tutorialChip, true);
      } else {
        main.game.self.overlay.destroy();
      }
    });
    main.phaserGame.add.tween(window.scale).to({x:0, y:0}, 100, Phaser.Easing.Linear.None, true);
  }
}, updateChipWindow:function() {
  var window = main.game.self.chipWindow;
  var btn;
  for (var i = 5;i < window.children.length;i++) {
    btn = window.children[i];
    if (main.storage.data.money >= btn.properties.value) {
      btn.inputEnabled = true;
      btn.frameName = main.chip.sprites[i - 5];
    } else {
      btn.inputEnabled = false;
      btn.frameName = "Grey-" + main.chip.sprites[i - 5];
    }
  }
}, btnChipsSetFrame:function(id, enabled) {
  main.game.self.chipsBtn.properties.icon.frameName = (enabled ? "" : "Grey-") + main.chip.sprites[id];
}, placeBet:function(value) {
  main.game.self.updateMoney(-value, value);
  if (main.storage.data.money < value) {
    var window = main.game.self.chipWindow;
    var btn;
    for (var i = window.children.length - 1;i >= 5;i--) {
      btn = window.children[i];
      if (main.storage.data.money >= btn.properties.value && btn.properties.value != 25) {
        main.game.self.windowChipClicked(btn, true);
        main.storage.data.selectedChipID = btn.properties.id;
        value = btn.properties.value;
        break;
      }
    }
  }
  main.game.self.btnChipsSetFrame(main.storage.data.selectedChipID, main.storage.data.money >= value);
  if (main.game.tutorialPlaying) {
    main.game.tutorialRed.destroy();
    main.game.overlay.bringToTop();
    main.game.self.spinBtn.bringToTop();
    main.game.self.updateTutorialArrow(main.game.self.spinBtn);
  }
}, saveLastBets:function() {
  main.storage.data.lastBets = [];
  main.storage.data.lastBetsPrice = 0;
  var chip;
  for (var i = 0;i < main.game.placedChips.length;i++) {
    chip = main.game.placedChips[i].properties;
    main.storage.data.lastBets.push({id:chip.id, square:chip.square.properties.id});
    main.storage.data.lastBetsPrice += chip.value;
  }
}, loadLastBets:function() {
  if (main.storage.data.money >= main.storage.data.lastBetsPrice) {
    var chip;
    var square;
    for (var i = 0;i < main.storage.data.lastBets.length;i++) {
      chip = main.storage.data.lastBets[i];
      square = main.board.allSquares[chip.square];
      main.game.self.board.placeChip(square, chip.id);
    }
  }
}, onSpinComplete:function(number) {
  var circle = this.game.add.group();
  circle.x = main.game.self.roulette.wheel.x;
  circle.y = main.game.self.roulette.wheel.y;
  circle.scale.setTo(0);
  var light = main.phaserGame.add.image(0, 0, "shine");
  light.anchor.setTo(.5);
  circle.add(light);
  var bg = this.game.add.image(0, 0, "win_number");
  bg.anchor.setTo(.5);
  circle.add(bg);
  var text = this.game.add.text(0, 0, number, {font:"50pt bebas", fill:"#FFFFFF", align:"center"});
  text.anchor.setTo(.5);
  circle.add(text);
  if (number == 0) {
    bg.tint = 3568640;
  } else {
    if (main.board.squareColors[number - 1] == 0) {
      bg.tint = 0;
    } else {
      bg.tint = 16711680;
    }
  }
  main.game.self.particles.x = circle.x;
  main.game.self.particles.y = circle.y;
  main.game.self.particles.explode(4500);
  main.phaserGame.world.bringToTop(main.game.self.particles);
  main.phaserGame.add.tween(light).to({angle:light.angle + 90}, 4500, Phaser.Easing.Linear.None, true, 250);
  main.phaserGame.add.tween(light.scale).to({x:.75, y:.75}, 750, Phaser.Easing.Linear.None, true, 250, 4500 / 750, true);
  var tween = main.phaserGame.add.tween(circle.scale).to({x:2, y:2}, 500, Phaser.Easing.Exponential.Out, true, 250);
  tween.onComplete.add(function() {
    tween = main.phaserGame.add.tween(circle.scale).to({x:0, y:0}, 500, Phaser.Easing.Exponential.In, true, 2E3);
    tween.onComplete.add(function() {
      circle.destroy();
      tween = main.phaserGame.add.tween(main.phaserGame.camera).to({x:0}, 1E3, Phaser.Easing.Exponential.Out, true, 125);
      tween.onComplete.add(function() {
        main.game.self.roulette.spinning = false;
        main.game.self.highlightWinningSquares(number);
        main.game.self.evaluateBets(number);
      });
    });
  });
  if (main.game.tutorialPlaying) {
    main.game.overlay.destroy();
    main.game.tutorialArrow.destroy();
    main.game.tutorialPlaying = false;
    main.storage.data.tutorialPlayed = true;
  }
  main.managers.audio.playSound("winning_number");
}, addLastNumber:function(number, load) {
  var moveAndAdd = function() {
    main.game.self.sidePanelMoveDown(function() {
      main.game.self.sidePanelAddLast(number, load);
    }, load);
  };
  if (main.game.lastNumbers.length == 0) {
    main.game.self.sidePanelAddLast(number, load);
  } else {
    if (main.game.lastNumbers.length == main.game.lastNumberCount) {
      main.game.self.sidePanelRemoveFirst(moveAndAdd, load);
    } else {
      moveAndAdd();
    }
  }
}, sidePanelRemoveFirst:function(done, load) {
  var firstNumber = main.game.lastNumbers.shift();
  if (load) {
    firstNumber.destroy();
    done();
  } else {
    var tween = main.phaserGame.add.tween(firstNumber.scale).to({x:0, y:0}, 150, Phaser.Easing.Bounce.Out, true);
    tween.onComplete.add(function() {
      firstNumber.destroy();
      done();
    });
  }
}, sidePanelMoveDown:function(done, load) {
  var numbers = main.game.lastNumbers;
  var lastNumber;
  var tween;
  if (load) {
    numbers.forEach(function(lastNumber) {
      lastNumber.cameraOffset.y = lastNumber.y + lastNumber.height + main.game.self.sidePanelOffset;
    });
    done();
  } else {
    for (var i = 0;i < numbers.length - 1;i++) {
      lastNumber = numbers[i];
      main.phaserGame.add.tween(lastNumber.cameraOffset).to({y:lastNumber.y + lastNumber.height + main.game.self.sidePanelOffset}, 150, Phaser.Easing.Exponential.In, true);
    }
    lastNumber = numbers[numbers.length - 1];
    tween = main.phaserGame.add.tween(lastNumber.cameraOffset).to({y:lastNumber.y + lastNumber.height + main.game.self.sidePanelOffset}, 150, Phaser.Easing.Exponential.In, true);
    tween.onComplete.add(function() {
      done();
    });
  }
}, sidePanelAddLast:function(number, load) {
  var color = 0;
  if (number == 0) {
    color = 44113;
  } else {
    if (main.board.squareColors[number - 1] == 1) {
      color = 15670308;
    }
  }
  var lastNumber = main.phaserGame.add.image(main.game.self.sidePanelX, main.game.self.sidePanelY + main.game.self.sidePanelOffset, "ui", "icon-last-no.png");
  lastNumber.anchor.setTo(.5);
  lastNumber.tint = color;
  lastNumber.y += lastNumber.height / 2;
  lastNumber.fixedToCamera = true;
  var lastNumberText = main.phaserGame.add.text(0, 1.75, number, {font:"10pt bebas", fill:"#FFFFFF", align:"center"});
  lastNumberText.anchor.setTo(.5);
  lastNumber.addChild(lastNumberText);
  lastNumber.scale.x = 0;
  lastNumber.scale.y = 0;
  var numbers = main.game.lastNumbers;
  numbers.push(lastNumber);
  if (load) {
    lastNumber.scale.setTo(1);
  } else {
    main.phaserGame.add.tween(lastNumber.scale).to({x:1, y:1}, 150, Phaser.Easing.Bounce.Out, true);
    main.game.self.particles.x = lastNumber.x;
    main.game.self.particles.y = lastNumber.y;
    main.game.self.particles.explode(500);
    main.phaserGame.world.bringToTop(main.game.self.particles);
  }
  var alphaOffset = 2;
  if (numbers.length > alphaOffset) {
    for (var i = 0;i < numbers.length - alphaOffset;i++) {
      numbers[i].alpha = 100 / main.game.lastNumberCount * (main.game.lastNumberCount - numbers.length + i + alphaOffset + 1) / 100;
    }
  }
}, evaluateBets:function(number) {
  var chips = main.game.placedChips;
  var chip;
  var squares;
  var square;
  var winningChips = [];
  var losingChips = [];
  main.game.self.won = 0;
  main.game.self.winningChips = winningChips;
  main.game.self.losingChips = losingChips;
  for (var i = 0;i < chips.length;i++) {
    chip = chips[i];
    squares = chip.properties.square.properties.squares;
    for (var j = 0;j < squares.length;j++) {
      square = squares[j];
      if (square.properties.number == number) {
        main.game.self.won += chip.properties.value + main.game.squareWinMultiplier[chip.properties.square.properties.type] * chip.properties.value;
        winningChips.push(chip);
        break;
      } else {
        if (j == squares.length - 1) {
          losingChips.push(chip);
        }
      }
    }
  }
  var updateMoney = function() {
    main.game.placedChips = [];
    main.game.self.lastSpinScore = main.game.self.won - main.storage.data.bet;
    main.game.self.sessionScore += main.game.self.lastSpinScore;
    main.game.self.addLastNumber(number);
    main.game.self.updateMoney(main.game.self.won, -main.storage.data.bet);
    main.game.self.btnChipsSetFrame(main.game.selectedChip.properties.id, main.storage.data.money >= main.game.selectedChip.properties.value);
    main.game.self.board.removeChips(winningChips);
    main.game.self.board.removeChips(losingChips);
    main.game.self.setInteraction(true);
    main.game.self.bottomBtns[0].setEnabled(main.storage.data.lastBets.length > 0 && main.storage.data.money >= main.storage.data.lastBetsPrice);
    main.game.self.bottomBtns[1].setEnabled(false);
    main.game.self.bottomBtns[2].setEnabled(false);
    main.storage.data.lastNumbers.push(number);
    if (main.storage.data.lastNumbers.length > main.game.lastNumberStatsCount) {
      main.storage.data.lastNumbers.shift();
    }
    main.managers.storage.save();
    if (main.storage.data.money < 10) {
      main.game.self.showResetWindow();
    }
  };
  var animateWinningChips = function() {
    if (winningChips.length > 0) {
      main.game.self.animateWinningChips(function() {
        updateMoney();
      });
    } else {
      updateMoney();
    }
  };
  main.game.self.showWinLose(main.game.self.won > 0 ? main.game.self.won : -main.storage.data.bet, function() {
    if (main.game.self.losingChips.length > 0) {
      main.game.self.animateLosingChips(function() {
        animateWinningChips();
      });
    } else {
      animateWinningChips();
    }
  });
}, highlightWinningSquares:function(number) {
  var square;
  if (number == 0) {
    square = main.board.zeroSquare.properties.image;
    square.visible = true;
    main.game.self.highlightedSquares = [square];
    main.game.self.removeWinningSquareHighlight(true);
  } else {
    square = main.board.squares[number - 1].properties.image;
    square.visible = true;
    var squares = [square];
    var groupSquares = main.board.groupSquares;
    var groupSquare;
    for (var i = 0;i < groupSquares.length;i++) {
      groupSquare = groupSquares[i].properties;
      for (var j = 0;j < groupSquare.squares.length;j++) {
        square = groupSquare.squares[j].properties;
        if (square.number == number) {
          groupSquare.image.visible = true;
          squares.push(groupSquare.image);
          break;
        }
      }
    }
    main.game.self.highlightedSquares = squares;
    main.game.self.removeWinningSquareHighlight(true);
  }
}, removeWinningSquareHighlight:function(delay) {
  var squares = main.game.self.highlightedSquares;
  if (squares) {
    var removeHighlights = function() {
      for (var i = 0;i < squares.length;i++) {
        squares[i].visible = false;
      }
    };
    if (delay) {
      main.phaserGame.time.events.add(main.game.highlightWinningSquaresLength, function() {
        removeHighlights();
      }, this);
    } else {
      removeHighlights();
    }
  }
}, animateLosingChips:function(done) {
  var chips = main.game.self.losingChips;
  var chip;
  var tween;
  if (chips.length >= 5) {
    main.managers.audio.playSound("clear_chips_result");
  } else {
    main.managers.audio.playSound("chip");
  }
  for (var i = 0;i < chips.length;i++) {
    chip = chips[i];
    tween = main.phaserGame.add.tween(chip).to({x:main.phaserGame.width + chip.width, y:main.phaserGame.height + chip.height}, 500, Phaser.Easing.Quadratic.In, true, i * 25);
    if (i == chips.length - 1) {
      tween.onComplete.add(function() {
        done();
      });
    }
  }
}, animateWinningChips:function(done) {
  var chips = main.game.self.winningChips;
  var chip;
  var tween;
  if (chips.length >= 5) {
    main.managers.audio.playSound("clear_chips_result");
  } else {
    main.managers.audio.playSound("chip");
  }
  for (var i = 0;i < chips.length;i++) {
    chip = chips[i];
    tween = main.phaserGame.add.tween(chip).to({x:main.game.self.moneyText.x, y:main.game.self.moneyText.y}, 500, Phaser.Easing.Quadratic.In, true, i * 25);
    if (i == chips.length - 1) {
      tween.onComplete.add(function() {
        done();
      });
    }
  }
}, showWinLose:function(result, done) {
  if (result == 0) {
    done();
  } else {
    var text;
    var centerX = main.phaserGame.width / 2;
    var bar = main.phaserGame.add.group();
    bar.x = -centerX;
    bar.y = main.phaserGame.height / 2;
    var finishTween = function() {
      bar.destroy();
      done();
    };
    var chipIcon = this.game.add.image(0, 0, "ui", "icon-chips.png");
    chipIcon.scale.setTo(.5);
    chipIcon.anchor.setTo(1, .5);
    text = main.phaserGame.add.text(0, 0, "", {font:"20pt bebas", fill:"#FFFFFF", align:"center"});
    text.anchor.setTo(0, .5);
    var bg = main.phaserGame.add.image(0, 0, "gradient_dark");
    bg.anchor.setTo(.5);
    bg.height = Math.max(chipIcon.height, text.height) + main.game.self.offsetY;
    bar.add(bg);
    bar.add(text);
    bar.add(chipIcon);
    var border = main.phaserGame.add.image(0, -bg.height / 2, "gradient_light");
    border.height = 3;
    border.anchor.setTo(.5);
    bar.add(border);
    border = main.phaserGame.add.image(0, bg.height / 2, "gradient_light");
    border.height = 3;
    border.anchor.setTo(.5);
    bar.add(border);
    var tween = main.phaserGame.add.tween(bar).to({x:centerX}, 500, Phaser.Easing.Exponential.Out, true);
    tween.onComplete.add(function() {
      tween = main.phaserGame.add.tween(bar).to({x:3 * centerX}, 500, Phaser.Easing.Exponential.In, true, 2E3);
      tween.onComplete.add(function() {
        finishTween();
      });
    });
    if (result < 0) {
      text.setText("YOU LOSE  " + result + " ");
      main.managers.audio.playSound("lose");
    } else {
      text.setText("+" + result + " ");
      var circles = main.phaserGame.add.group();
      circles.x = centerX;
      circles.y = bar.y;
      var circle = main.phaserGame.add.image(0, 0, "win_golden");
      circle.anchor.setTo(.5);
      circles.add(circle);
      var h = circle.height;
      main.phaserGame.add.tween(circle).to({angle:circle.angle + 90}, 3E3, Phaser.Easing.Linear.None, true);
      var light = main.phaserGame.add.image(0, 0, "shine");
      light.anchor.setTo(.5);
      light.scale.setTo(2);
      circles.add(light);
      main.phaserGame.add.tween(light).to({angle:light.angle + 90}, 3E3, Phaser.Easing.Linear.None, true);
      main.phaserGame.add.tween(light.scale).to({x:1.5, y:1.5}, 750, Phaser.Easing.Linear.None, true, 0, 3E3 / 750, true);
      circle = main.phaserGame.add.image(0, 0, "win_brown");
      circle.anchor.setTo(.5);
      circles.add(circle);
      var youWinText = main.phaserGame.add.image(0, -h / 4, "ui", "text_you.png");
      youWinText.anchor.setTo(.5);
      circles.add(youWinText);
      youWinText = main.phaserGame.add.image(0, 0, "ui", "text_win.png");
      youWinText.anchor.setTo(.5);
      circles.add(youWinText);
      bar.y += h / 4;
      circles.scale.setTo(0);
      main.phaserGame.world.bringToTop(bar);
      var tween = main.phaserGame.add.tween(circles.scale).to({x:1, y:1}, 500, Phaser.Easing.Exponential.Out, true);
      tween.onComplete.add(function() {
        main.game.self.particles.x = circles.x;
        main.game.self.particles.y = circles.y;
        main.game.self.particles.explode(2500);
        main.phaserGame.world.bringToTop(main.game.self.particles);
        tween = main.phaserGame.add.tween(circles.scale).to({x:0, y:0}, 500, Phaser.Easing.Exponential.In, true, 2E3);
        tween.onComplete.add(function() {
          circles.destroy();
        });
      });
      main.managers.audio.playSound("win");
    }
    var w = text.width + chipIcon.width;
    text.x -= w / 2;
    chipIcon.x += w / 2;
  }
}, updateMoney:function(money, bet) {
  main.storage.data.money += money;
  main.storage.data.bet += bet;
  main.game.self.moneyText.setText(main.storage.data.money);
  main.game.self.betText.setText(main.storage.data.bet);
}, startTutorial:function() {
  main.game.tutorialPlaying = true;
  var overlay = this.game.add.image(0, 0, "overlay");
  overlay.width = this.game.width;
  overlay.height = this.game.height;
  overlay.inputEnabled = true;
  main.game.overlay = overlay;
  var arrowGroup = this.game.add.group();
  main.game.tutorialArrow = arrowGroup;
  var arrow = this.game.add.image(0, 0, "ui", "tutorial_arrow.png");
  arrow.anchor.setTo(.5, 1);
  arrowGroup.add(arrow);
  arrow = this.game.add.image(0, -arrow.height / 2, "ui", "tutorial_arrow.png");
  arrow.anchor.setTo(.5, 1);
  arrow.alpha = .75;
  arrowGroup.add(arrow);
  arrow = this.game.add.image(0, -arrow.height, "ui", "tutorial_arrow.png");
  arrow.anchor.setTo(.5, 1);
  arrow.alpha = .5;
  arrowGroup.add(arrow);
  main.game.self.chipsBtn.bringToTop();
  arrowGroup.x = main.game.self.chipsBtn.x;
  arrowGroup.y = main.game.self.chipsBtn.y - main.game.self.chipsBtn.height / 2 - 10;
  main.game.tutorialArrowTween = this.game.add.tween(arrowGroup).to({y:arrowGroup.y - 25}, 250, Phaser.Easing.Linear.None, true, 0, -1, true);
}, updateTutorialArrow:function(object) {
  main.phaserGame.tweens.remove(main.game.tutorialArrowTween);
  main.game.tutorialArrow.x = object.x;
  main.game.tutorialArrow.y = object.y - object.height / 2 - 10;
  main.game.tutorialArrowTween = main.phaserGame.add.tween(main.game.tutorialArrow).to({y:main.game.tutorialArrow.y - 25}, 250, Phaser.Easing.Linear.None, true, 0, -1, true);
  main.phaserGame.world.bringToTop(main.game.tutorialArrow);
}};

