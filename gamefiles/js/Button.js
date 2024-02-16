var Button = function(game, x, y, key, frame, light, callback) {
  this.activeFrame = frame;
  if (light) {
    var self = this;
    var highlight = game.add.image(x, y, key, light);
    highlight.anchor.setTo(.5);
    highlight.visible = false;
    Phaser.Button.call(this, game, x, y, key, function() {
      callback(this);
    }, this);
    this.onInputOver.add(function() {
      if (self.enabled) {
        highlight.visible = true;
      }
    });
    this.onInputOut.add(function() {
      highlight.visible = false;
    });
    this.onInputDown.add(function() {
      if (self.enabled && self.icon) {
        self.icon.tint = 6946705;
      }
    });
    this.onInputUp.add(function() {
      self.updateIcon();
    });
    this.setEnabled = function(enabled) {
      self.enabled = enabled;
      if (!enabled) {
        var frame = self.activeFrame.substring(0, self.activeFrame.length - 4) + "-inactive.png";
        if (game.cache.getFrameByName("ui", frame)) {
          self.frameName = frame;
        }
        highlight.visible = false;
        self.updateIcon();
      } else {
        self.frameName = self.activeFrame;
        self.updateIcon();
      }
    };
    this.addIcon = function(icon) {
      this.icon = icon;
      self.addChild(icon);
      self.updateIcon();
    };
    this.updateIcon = function() {
      if (self.icon) {
        self.icon.tint = self.enabled ? 5673809 : 3952700;
      }
    };
    this.setEnabled(true);
  } else {
    if (callback === undefined) {
      Phaser.Button.call(this, game, x, y, key, function() {
      }, this, frame, frame, frame);
    } else {
      Phaser.Button.call(this, game, x, y, key, function() {
        callback(this);
      }, this, frame, frame, frame);
    }
  }
  this.anchor.setTo(.5);
  this.properties = {};
  this.setX = function(x) {
    if (light) {
      highlight.x = x;
    }
    this.x = x;
  };
  this.setY = function(y) {
    if (light) {
      highlight.y = y;
    }
    this.y = y;
  };
  game.add.existing(this);
};
Button.prototype = Object.create(Phaser.Button.prototype);
Button.constructor = Button;

