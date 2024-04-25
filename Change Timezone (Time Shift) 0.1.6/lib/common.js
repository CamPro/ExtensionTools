var core = {
  "start": function () {
    core.load();
  },
  "install": function () {
    core.load();
  },
  "load": function () {
    app.contextmenu.create({
      "contexts": ["action"],
      "title": "What is my Timezone?", 
      "id": "change-timezone-test-page"
    }, app.error);
  },
  "action": {
    "storage": function (changes, namespace) {
      /*  */
    },
    "button": function () {
      config.addon.state = config.addon.state === "ON" ? "OFF" : "ON";
      /*  */
      app.button.icon(null, config.addon.state);
      app.button.title(null, "Change Timezone: " + config.addon.state);
    },
    "contextmenu": function (e) {
      if (e) {
        if (e.menuItemId === "change-timezone-test-page") {
          app.tab.open(config.test.page);
        }
      }
    },
    "inject": function (e) {
      if (config.addon.state === "ON") {
        const code = config.options.timezone;
        const arg = JSON.stringify(code);
        /*  */
        app.tab.inject.js({
          "args": [arg],
          "world": "MAIN",
          "injectImmediately": true,
          "target": {
            "tabId": e.tabId,
            "frameIds": [e.frameId]
          },
          "func": function (q) {
            window.timeZoneStorage = q;
          }
        }, function () {
          app.tab.inject.js({
            "world": "MAIN",
            "injectImmediately": true,
            "target": {
              "tabId": e.tabId,
              "frameIds": [e.frameId]
            },
            "files": [
              "/data/content_script/page_context/inject.js"            ]
          });
        });
      }
    }
  }
};

app.storage.load(function () {
  app.button.icon(null, config.addon.state);
  app.button.title(null, "Change Timezone: " + config.addon.state);
  /*  */
  app.webnavigation.on.committed.add();
});

app.options.receive("get", function (pref) {
  app.options.send("set", {
    "pref": pref,
    "value": config.get(pref)
  });
});

app.options.receive("changed", function (o) {
  config.set(o.pref, o.value);
  app.options.send("set", {
    "pref": o.pref,
    "value": config.get(o.pref)
  });
});

app.options.receive("test", function () {app.tab.open(config.test.page)});
app.options.receive("support", function () {app.tab.open(app.homepage())});
app.options.receive("donation", function () {app.tab.open(app.homepage() + "?reason=support")});

app.button.on.clicked(core.action.button);
app.contextmenu.on.clicked(core.action.contextmenu);
app.webnavigation.on.committed.callback(core.action.inject);

app.on.startup(core.start);
app.on.installed(core.install);
app.on.storage(core.action.storage);