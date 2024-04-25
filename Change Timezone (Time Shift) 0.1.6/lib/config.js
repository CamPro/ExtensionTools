var config = {};

config.test = {"page": "https://webbrowsertools.com/timezone/"};

config.addon = {
  set state (val) {app.storage.write("state", val)},
  get state () {return app.storage.read("state") !== undefined ? app.storage.read("state") : "ON"}
};

config.welcome = {
  set lastupdate (val) {app.storage.write("lastupdate", val)},
  get lastupdate () {return app.storage.read("lastupdate") !== undefined ? app.storage.read("lastupdate") : 0}
};

config.options = {
  "timezone": {
    set name (val) {app.storage.write("timezone-name", val)},
    set index (val) {app.storage.write("timezone-index", val)},
    set value (val) {app.storage.write("timezone-value", val)},
    get value () {return app.storage.read("timezone-value") !== undefined ? app.storage.read("timezone-value") : 0},
    get index () {return app.storage.read("timezone-index") !== undefined ? app.storage.read("timezone-index") : 150},
    get name () {return app.storage.read("timezone-name") !== undefined ? app.storage.read("timezone-name") : "Etc/Greenwich"}
  }
};

config.get = function (name) {
  return name.split('.').reduce(function (p, c) {return p[c]}, config);
};

config.set = function (name, value) {
  function set(name, value, scope) {
    name = name.split('.');
    if (name.length > 1) {
      set.call((scope || this)[name.shift()], name.join('.'), value);
    } else {
      this[name[0]] = value;
    }
  }
  //
  set(name, value, config);
};