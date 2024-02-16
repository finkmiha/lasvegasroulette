var StorageManager = function(game) {
};
StorageManager.prototype = {save:function() {
  try {
    localStorage.setItem(main.storage.name, JSON.stringify(main.storage.data));
  } catch (e) {
  }
}, load:function() {
  try {
    var data = JSON.parse(localStorage.getItem(main.storage.name));
    if (data != null) {
      main.storage.data = data;
    }
  } catch (e) {
  }
}};

