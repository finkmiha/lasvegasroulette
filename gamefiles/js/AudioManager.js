var AudioManager = function(game) {
  this.game = game;
};
AudioManager.prototype = {music:[], sounds:[], actualMusic:null, addMusic:function(key, volume, loop) {
  this.music[key] = this.game.add.audio(key, volume, loop);
  if (this.actualMusic == null) {
    this.actualMusic = key;
  }
}, addSound:function(key, volume, loop) {
  this.sounds[key] = this.game.add.audio(key, volume, loop);
}, playMusic:function(key, reset) {
  if (key != this.actualMusic || reset) {
    if (main.storage.data.music && SOUNDS_ENABLED) {
      this.stopMusic();
      this.music[key].play();
      this.music[key].volume = main.storage.data.music;
    }
    this.actualMusic = key;
  }
  try {
    game.sound.context.resume();
  } catch (e) {
  }
}, playSound:function(key) {
  if (main.storage.data.sounds && SOUNDS_ENABLED) {
    this.sounds[key].play();
    this.sounds[key].volume = main.storage.data.sounds;
  }
  try {
    game.sound.context.resume();
  } catch (e) {
  }
}, stopSound:function(key) {
  this.sounds[key].stop();
}, setSoundPitch:function(key, pitch) {
  this.sounds[key]._sound.playbackRate.value = pitch;
}, pauseMusic:function() {
  if (this.actualMusic != null && main.storage.data.music) {
    this.music[this.actualMusic].pause();
  }
}, resumeMusic:function() {
  if (this.actualMusic != null && main.storage.data.music) {
    this.music[this.actualMusic].resume();
  }
  try {
    game.sound.context.resume();
  } catch (e) {
  }
}, stopMusic:function() {
  if (this.actualMusic != null) {
    this.music[this.actualMusic].stop();
  }
}, setMusicVolume:function(volume) {
  if (!SOUNDS_ENABLED) {
    return;
  }
  main.storage.data.music = volume;
  if (this.actualMusic != null) {
    this.music[this.actualMusic].volume = volume;
  }
}, toggleMusic:function() {
  main.storage.data.music = !main.storage.data.music;
  if (main.storage.data.music && this.actualMusic != null) {
    this.playMusic(this.actualMusic, true);
  } else {
    this.stopMusic();
  }
}, toggleSounds:function() {
  main.storage.data.sounds = !main.storage.data.sounds;
  if (!main.storage.data.sounds) {
    for (var key in this.sounds) {
      if (this.sounds.hasOwnProperty(key)) {
        this.sounds[key].stop();
      }
    }
  }
}};

