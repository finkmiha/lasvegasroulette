var Languages = function(game) {
  this.game = game;
};
Languages.prototype = {load:function() {
  var languages = ["en", "de", "es", "fr", "it", "pt", "ru", "no"];
  var selectedLanguage = languages[0];
  var xml = this.game.cache.getText("lang_strings");
  var data = JSON.parse(xml)["stringresources"]["strings"]["string"];
  var gameTexts = [];
  var id;
  for (var i = 0;i < data.length;i++) {
    id = data[i]["-id"];
    if (gameTexts[id] == null) {
      gameTexts[id] = [];
    }
    for (var j = 0;j < languages.length;j++) {
      gameTexts[id][languages[j]] = data[i][languages[j]];
    }
  }
  main.managers.language.texts = gameTexts;
  this.languages = languages;
  this.selectedLanguage = selectedLanguage;
}, setLanguage:function(language) {
  if (this.languages.indexOf(language) > -1) {
    this.selectedLanguage = language;
  }
}, get:function(id) {
  var lines = main.managers.language.texts[id];
  if (lines != undefined) {
    var line = lines[this.selectedLanguage];
    if (line == undefined) {
      return NaN;
    } else {
      return line;
    }
  } else {
    return NaN;
  }
}};

