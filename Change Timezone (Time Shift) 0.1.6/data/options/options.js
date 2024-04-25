var background = (function () {
  let tmp = {};
  chrome.runtime.onMessage.addListener(function (request) {
    for (let id in tmp) {
      if (tmp[id] && (typeof tmp[id] === "function")) {
        if (request.path === "background-to-options") {
          if (request.method === id) {
            tmp[id](request.data);
          }
        }
      }
    }
  });
  /*  */
  return {
    "receive": function (id, callback) {
      tmp[id] = callback;
    },
    "send": function (id, data) {
      chrome.runtime.sendMessage({
        "method": id, 
        "data": data,
        "path": "options-to-background"
      }, function () {
        return chrome.runtime.lastError;
      });
    }
  }
})();

var config = {
  "set": function (o) {
    if (window[o.pref]) {
      window[o.pref].value = o.value
    }
  },
  "store": function (n) {
    let name = document.querySelector("input[data-pref='options.timezone.name']");
    let offset = document.querySelector("input[data-pref='options.timezone.value']");
    let select = document.querySelector("select[data-pref='options.timezone.index']");
    let target = select[select.selectedIndex];
    /*  */
    name.value = target.value;
    offset.value = n ? n + Number(offset.value) : -1 * Number(target.dataset.value);
    /*  */
    background.send("changed", {"pref": "options.timezone.name", "value": name.value});
    background.send("changed", {"pref": "options.timezone.value", "value": offset.value});
    background.send("changed", {"pref": "options.timezone.index", "value": select.selectedIndex});
  },
  "load": function () {
    let prefs = document.querySelectorAll("*[data-pref]");
    [].forEach.call(prefs, function (elem) {
      let pref = elem.getAttribute("data-pref");
      window[pref] = config.connect(elem, pref);
    });
    /*  */
    let plus = document.querySelector("#plus");
    let test = document.querySelector("#test");
    let minus = document.querySelector("#minus");
    let support = document.querySelector("#support");
    let donation = document.querySelector("#donation");
    let select = document.querySelector("select[data-pref='options.timezone.index']");
    /*  */
    plus.addEventListener("click", function () {config.store(30)});
    minus.addEventListener("click", function () {config.store(-30)});
    select.addEventListener("change", function () {config.store(0)});
    test.addEventListener("click", function () {background.send("test")});
    support.addEventListener("click", function () {background.send("support")});
    donation.addEventListener("click", function () {background.send("donation")});
    /*  */
    window.removeEventListener("load", config.load, false);
  },
  "connect": function (elem) {
    let att = "value";
    let pref = elem.getAttribute("data-pref");
    if (elem) {
      if (elem.type === "checkbox") att = "checked";
      if (elem.localName === "textarea") att = "value";
      if (elem.localName === "span") att = "textContent";
      if (elem.localName === "select") att = "selectedIndex";
      /*  */
      background.send("get", pref);
      elem.addEventListener("change", function () {
        background.send("changed", {
          "pref": pref,
          "value": this[att]
        });
      });
    }
    /*  */
    return {
      get value () {return elem[att]},
      set value (val) {
        if (elem.type === "file") return;
        elem[att] = val;
      }
    }
  }
};

background.receive("set", config.set);
window.addEventListener("load", config.load, false);