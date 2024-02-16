var Sprite = function(x, y, w, h, key) {
  var sprite = main.phaserGame.add.group();
  sprite.x = x;
  sprite.y = y;
  var light = main.phaserGame.add.image(0, 0, "dialog_light");
  light.width = w + 20;
  light.height = h + 20;
  light.anchor.setTo(.5);
  sprite.add(light);
  var middle = main.phaserGame.add.image(0, 0, key, 1);
  middle.width = w;
  middle.height = h - 2 * main.sprites[key].h;
  middle.anchor.setTo(.5);
  sprite.add(middle);
  var top = main.phaserGame.add.image(0, -middle.height / 2, key, 0);
  top.width = w;
  top.anchor.setTo(.5, 1);
  sprite.add(top);
  var bottom = main.phaserGame.add.image(0, middle.height / 2, key, 2);
  bottom.width = w;
  bottom.anchor.setTo(.5, 0);
  sprite.add(bottom);
  sprite.properties = {w:w, h:h};
  return sprite;
};

