var ADS_ENABLED = false;
var ADS_DELAY = 120;
var ADS_ON_FIRST_PLAY = false;
var ADS_MOBILE_WIDTH = 800;
var ADS_MOBILE_HEIGHT = 480;
var adinplay_onAdStarted = function() {
};
var adinplay_onAdFinished = function() {
};
function adinplay_init() {
  if (!ADS_ENABLED) {
    return;
  }
  if (typeof aiptag === "undefined") {
    return;
  }
  var partner_id = "inlogic";
  var url_params = getJsonFromUrl();
  if (url_params.hasOwnProperty("partner_id")) {
    partner_id = url_params.partner_id;
  }
  aiptag = aiptag || {};
  aiptag.cmd = aiptag.cmd || [];
  aiptag.cmd.display = aiptag.cmd.display || [];
  aiptag.cmd.player = aiptag.cmd.player || [];
  aiptag.subid = partner_id;
  aiptag.consented = true;
  ads_time = 0;
  if (ADS_ON_FIRST_PLAY) {
    ads_time = -ADS_DELAY;
  }
  aiptag.cmp = {show:true, position:"centered", button:true, buttonText:"Privacy settings", buttonPosition:"bottom-left"};
  aiptag.cmd.player.push(function() {
    var W = game.width;
    var H = game.height;
    if (!Phaser.Device.desktop) {
      W = ADS_MOBILE_WIDTH;
      H = ADS_MOBILE_HEIGHT;
    }
    adplayer = new aipPlayer({AD_WIDTH:W, AD_HEIGHT:H, AD_FULLSCREEN:1, AD_CENTERPLAYER:0, AD_FADING:0, AD_DISPLAY:"default", LOADING_TEXT:"loading advertisement", PREROLL_ELEM:function() {
      return document.getElementById("ads");
    }, AIP_COMPLETE:function() {
      adinplay_resumeMusic();
      adinplay_enableInput();
      adinplay_onAdStarted();
    }, AIP_REMOVE:function() {
      adinplay_onAdFinished();
    }});
  });
}
function adinplay_playVideoAd() {
  if (!ADS_ENABLED) {
    adinplay_enableInput();
    adinplay_onAdStarted();
    return;
  }
  if (typeof aiptag === "undefined") {
    adinplay_init();
    adinplay_enableInput();
    adinplay_onAdStarted();
    return;
  }
  if (typeof adplayer === "undefined") {
    adinplay_init();
    adinplay_enableInput();
    adinplay_onAdStarted();
    return;
  }
  if (game.time.totalElapsedSeconds() - ads_time < ADS_DELAY) {
    adinplay_enableInput();
    adinplay_onAdStarted();
    return;
  }
  ads_time = game.time.totalElapsedSeconds();
  adinplay_disableInput();
  adinplay_pauseMusic();
  aiptag.cmd.player.push(function() {
    adplayer.startPreRoll();
  });
}
function adinplay_disableInput() {
  if (typeof adinplay_overlay == "undefined") {
    adinplay_overlay = game.make.sprite(game.width / 2, game.height / 2, "void");
    adinplay_overlay.anchor.set(0, 1);
    adinplay_overlay.inputEnabled = true;
  }
  adinplay_overlay.position.setTo(game.width / 2, game.height / 2);
  adinplay_overlay.width = game.width;
  adinplay_overlay.height = game.heigth;
  adinplay_overlay.visible = true;
}
function adinplay_enableInput() {
  if (typeof adinplay_overlay == "undefined") {
    return;
  }
  adinplay_overlay.visible = false;
}
function adinplay_pauseMusic() {
  game.sound.mute = true;
}
function adinplay_resumeMusic() {
  game.sound.mute = false;
}
function getJsonFromUrl() {
  var query = location.search.substr(1);
  var result = {};
  var queryList = query.split("&");
  for (var i = 0;i < queryList.length;i++) {
    var pos = queryList[i].indexOf("=");
    var item = [queryList[i].substring(0, pos), queryList[i].substring(pos + 1)];
    result[item[0]] = decodeURIComponent(item[1]);
  }
  return result;
}
;
