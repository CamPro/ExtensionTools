
! function(n) {
    var a = {
        PLUGIN_NAME: "timer",
        TIMER_RUNNING: "running",
        TIMER_PAUSED: "paused",
        TIMER_REMOVED: "removed",
        DAYINSECONDS: 86400
    };

    function s(t) {
        var e;
        return t = t || 0, e = Math.floor(t / 60), {
            days: t >= a.DAYINSECONDS ? Math.floor(t / a.DAYINSECONDS) : 0,
            hours: 3600 <= t ? Math.floor(t % a.DAYINSECONDS / 3600) : 0,
            totalMinutes: e,
            minutes: 60 <= t ? Math.floor(t % 3600 / 60) : e,
            seconds: t % 60,
            totalSeconds: t
        }
    }

    function r(t) {
        return ((t = parseInt(t, 10)) < 10 && "0") + t
    }

    function e() {
        return Math.round((Date.now ? Date.now() : (new Date).getTime()) / 1e3)
    }

    function i(t) {
        var e, n;
        return 0 < t.indexOf("sec") ? n = Number(t.replace(/\ssec/g, "")) : 0 < t.indexOf("min") ? (e = (t = t.replace(/\smin/g, "")).split(":"), n = Number(60 * e[0]) + Number(e[1])) : t.match(/\d{1,2}:\d{2}:\d{2}:\d{2}/) ? (e = t.split(":"), n = Number(e[0] * a.DAYINSECONDS) + Number(3600 * e[1]) + Number(60 * e[2]) + Number(e[3])) : t.match(/\d{1,2}:\d{2}:\d{2}/) && (e = t.split(":"), n = Number(3600 * e[0]) + Number(60 * e[1]) + Number(e[2])), n
    }

    function o(t, e) {
        t.state = e, n(t.element).data("state", e)
    }
    var d = {
        getDefaultConfig: function() {
            return {
                seconds: 0,
                editable: !1,
                duration: null,
                callback: function() {
                    console.log("Time up!")
                },
                repeat: !1,
                countdown: !1,
                format: null,
                updateFrequency: 500
            }
        },
        unixSeconds: e,
        secondsToPrettyTime: function(t) {
            var e = s(t);
            return e.days ? e.days + ":" + r(e.hours) + ":" + r(e.minutes) + ":" + r(e.seconds) : e.hours ? e.hours + ":" + r(e.minutes) + ":" + r(e.seconds) : e.minutes ? e.minutes + ":" + r(e.seconds) + " min" : e.seconds + " sec"
        },
        secondsToFormattedTime: function(t, e) {
            for (var n = s(t), i = [{
                    identifier: "%d",
                    value: n.days
                }, {
                    identifier: "%h",
                    value: n.hours
                }, {
                    identifier: "%m",
                    value: n.minutes
                }, {
                    identifier: "%s",
                    value: n.seconds
                }, {
                    identifier: "%g",
                    value: n.totalMinutes
                }, {
                    identifier: "%t",
                    value: n.totalSeconds
                }, {
                    identifier: "%D",
                    value: r(n.days)
                }, {
                    identifier: "%H",
                    value: r(n.hours)
                }, {
                    identifier: "%M",
                    value: r(n.minutes)
                }, {
                    identifier: "%S",
                    value: r(n.seconds)
                }, {
                    identifier: "%G",
                    value: r(n.totalMinutes)
                }, {
                    identifier: "%T",
                    value: r(n.totalSeconds)
                }], o = 0; o < i.length; o++) e = e.replace(i[o].identifier, i[o].value);
            return e
        },
        durationTimeToSeconds: function(t) {
            if (!isNaN(Number(t))) return t;
            var e = (t = t.toLowerCase()).match(/\d+d/),
                n = t.match(/\d+h/),
                i = t.match(/\d+m/),
                o = t.match(/\d+s/);
            if (!(e || n || i || o)) throw new Error("Invalid string passed in durationTimeToSeconds!");
            var s = 0;
            return e && (s += Number(e[0].replace("d", "")) * a.DAYINSECONDS), n && (s += 3600 * Number(n[0].replace("h", ""))), i && (s += 60 * Number(i[0].replace("m", ""))), o && (s += Number(o[0].replace("s", ""))), s
        },
        prettyTimeToSeconds: i,
        setState: o,
        makeEditable: function(t) {
            n(t.element).on("focus", function() {
                t.pause()
            }), n(t.element).on("blur", function() {
                t.totalSeconds = i(n(t.element)[t.html]()), t.resume()
            })
        },
        intervalHandler: function(t) {
            if (t.totalSeconds = e() - t.startTime, t.config.countdown) return t.totalSeconds = t.config.duration - t.totalSeconds, 0 === t.totalSeconds && (clearInterval(t.intervalId), o(t, a.TIMER_STOPPED), t.config.callback(), n(t.element).data("seconds")), void t.render();
            t.render(), t.config.duration && 0 < t.totalSeconds && (t.totalSeconds % t.config.duration == 0 || t.totalSeconds > t.config.duration) && (t.config.callback && t.config.callback(), t.config.repeat || (clearInterval(t.intervalId), o(t, a.TIMER_STOPPED), t.config.duration = null))
        }
    };

    function c(t, e) {
        if (this.element = t, this.originalConfig = n.extend({}, e), this.totalSeconds = 0, this.intervalId = null, this.html = "html", "INPUT" !== t.tagName && "TEXTAREA" !== t.tagName || (this.html = "val"), this.config = d.getDefaultConfig(), e.duration && (e.duration = d.durationTimeToSeconds(e.duration)), "string" != typeof e && (this.config = n.extend(this.config, e)), this.config.seconds && (this.totalSeconds = this.config.seconds), this.config.editable && d.makeEditable(this), this.startTime = d.unixSeconds() - this.totalSeconds, this.config.duration && this.config.repeat && this.config.updateFrequency > 1e3 && (this.config.updateFrequency = 1e3), this.config.countdown) {
           // if (!this.config.duration) throw new Error("Countdown option set without duration!");
            if (this.config.editable) throw new Error("Cannot set editable on a countdown timer!");
            this.config.startTime = d.unixSeconds() - this.config.duration, this.totalSeconds = this.config.duration
        }
    }
    c.prototype.start = function() {
        this.state !== a.TIMER_RUNNING && (d.setState(this, a.TIMER_RUNNING), this.render(), this.intervalId = setInterval(d.intervalHandler.bind(null, this), this.config.updateFrequency))
    }, c.prototype.pause = function() {
        this.state === a.TIMER_RUNNING && (d.setState(this, a.TIMER_PAUSED), clearInterval(this.intervalId))
    }, c.prototype.resume = function() {
        this.state === a.TIMER_PAUSED && (d.setState(this, a.TIMER_RUNNING), this.config.countdown ? this.startTime = d.unixSeconds() - this.config.duration + this.totalSeconds : this.startTime = d.unixSeconds() - this.totalSeconds, this.intervalId = setInterval(d.intervalHandler.bind(null, this), this.config.updateFrequency))
    }, c.prototype.remove = function() {
        clearInterval(this.intervalId), d.setState(this, a.TIMER_REMOVED), n(this.element).data(a.PLUGIN_NAME, null), n(this.element).data("seconds", null)
    }, c.prototype.reset = function() {
        var t = this.originalConfig;
        this.remove(), n(this.element).timer(t)
    }, c.prototype.render = function() {
        this.config.format ? n(this.element)[this.html](d.secondsToFormattedTime(this.totalSeconds, this.config.format)) : n(this.element)[this.html](d.secondsToPrettyTime(this.totalSeconds)), n(this.element).data("seconds", this.totalSeconds)
    }, n.fn.timer = function(e) {
        return e = e || "start", this.each(function() {
            n.data(this, a.PLUGIN_NAME) instanceof c || n.data(this, a.PLUGIN_NAME, new c(this, e));
            var t = n.data(this, a.PLUGIN_NAME);
            "string" == typeof e ? "function" == typeof t[e] && t[e]() : t.start()
        })
    }
}(jQuery);
/*
* jQuery-Simple-Timer
*
* Creates a countdown timer.
*
* Example:
*   $('.timer').startTimer();
*
*/
/*
(function (factory) {
  // Using as a CommonJS module
  if(typeof module === "object" && typeof module.exports === "object") {
    // jQuery must be provided as argument when used
    // as a CommonJS module.
    //
    // For example:
    //   let $ = require("jquery");
    //   require("jquery-simple-timer")($);
    module.exports = function(jq) {
      factory(jq, window, document);
    }
  } else {
    // Using as script tag
    //
    // For example:
    //   <script src="jquery.simple.timer.js"></script>
    factory(jQuery, window, document);
  }
}(function($, window, document, undefined) {

  // Polyfill new JS features for older browser
  Number.isFinite = Number.isFinite || function(value) {
    return typeof value === 'number' && isFinite(value);
  }

  var timer;

  var Timer = function(targetElement){
    this._options = {};
    this.targetElement = targetElement;
    return this;
  };

  Timer.start = function(userOptions, targetElement){
    timer = new Timer(targetElement);
    mergeOptions(timer, userOptions);
    return timer.start(userOptions);
  };

  // Writes to `this._options` object so that other
  // functions can access it without having to
  // pass this object as argument multiple times.
  function mergeOptions(timer, opts) {
    opts = opts || {};

    // Element that will be created for hours, minutes, and seconds.
    timer._options.elementContainer = opts.elementContainer || 'div';

    var classNames = opts.classNames || {};

    timer._options.classNameSeconds       = classNames.seconds  || 'jst-seconds'
      , timer._options.classNameMinutes   = classNames.minutes  || 'jst-minutes'
      , timer._options.classNameHours     = classNames.hours    || 'jst-hours'
      , timer._options.classNameClearDiv  = classNames.clearDiv || 'jst-clearDiv'
      , timer._options.classNameTimeout   = classNames.timeout || 'jst-timeout';
  }

  Timer.prototype.start = function(options) {

    var that = this;

    var createSubElements = function(timerBoxElement){
      var seconds = document.createElement(that._options.elementContainer);
      seconds.className = that._options.classNameSeconds;

      var minutes = document.createElement(that._options.elementContainer);
      minutes.className = that._options.classNameMinutes;

      var hours = document.createElement(that._options.elementContainer);
      hours.className = that._options.classNameHours;

      var clearElement = document.createElement(that._options.elementContainer);
      clearElement.className = that._options.classNameClearDiv;

      return timerBoxElement.
        append(hours).
        append(minutes).
        append(seconds).
        append(clearElement);
    };

    this.targetElement.each(function(_index, timerBox) {
      var that = this;
      var timerBoxElement = $(timerBox);
      var cssClassSnapshot = timerBoxElement.attr('class');

      timerBoxElement.on('complete', function() {
        clearInterval(timerBoxElement.intervalId);
      });

      timerBoxElement.on('complete', function() {
        timerBoxElement.onComplete(timerBoxElement);
      });

      timerBoxElement.on('complete', function(){
        timerBoxElement.addClass(that._options.classNameTimeout);
      });

      timerBoxElement.on('complete', function(){
        if(options && options.loop === true) {
          timer.resetTimer(timerBoxElement, options, cssClassSnapshot);
        }
      });

      timerBoxElement.on('pause', function() {
        clearInterval(timerBoxElement.intervalId);
        timerBoxElement.paused = true;
      });

      timerBoxElement.on('resume', function() {
        timerBoxElement.paused = false;
        const secondsLeft = timerBoxElement.data('timeLeft');
        const onComplete = timerBoxElement.onComplete;
        that.startCountdown(timerBoxElement, { secondsLeft, onComplete });
      });

      createSubElements(timerBoxElement);
      return this.startCountdown(timerBoxElement, options);
    }.bind(this));
  };

  /**
   * Resets timer and add css class 'loop' to indicate the timer is in a loop.
   * $timerBox {jQuery object} - The timer element
   * options {object} - The options for the timer
   * css - The original css of the element

  Timer.prototype.resetTimer = function($timerBox, options, css) {
    var interval = 0;
    if(options.loopInterval) {
      interval = parseInt(options.loopInterval, 10) * 1000;
    }
    setTimeout(function() {
      $timerBox.trigger('reset');
      $timerBox.attr('class', css + ' loop');
      timer.startCountdown($timerBox, options);
    }, interval);
  }

  Timer.prototype.fetchSecondsLeft = function(element){
    var secondsLeft = element.data('seconds-left');
    var minutesLeft = element.data('minutes-left');

    if(Number.isFinite(secondsLeft)){
      return parseInt(secondsLeft, 10);
    } else if(Number.isFinite(minutesLeft)) {
      return parseFloat(minutesLeft) * 60;
    }else {
      throw 'Missing time data';
    }
  };

  Timer.prototype.startCountdown = function(element, options) {
    options = options || {};

    var intervalId = null;
    var defaultComplete = function(){
      clearInterval(intervalId);
      return this.clearTimer(element);
    }.bind(this);

    element.onComplete = options.onComplete || defaultComplete;
    element.allowPause = options.allowPause || false;
    if(element.allowPause){
      element.on('click', function() {
        if(element.paused){
          element.trigger('resume');
        }else{
          element.trigger('pause');
        }
      });
    }

    var secondsLeft = options.secondsLeft || this.fetchSecondsLeft(element);

    var refreshRate = options.refreshRate || 1000;
    var endTime = secondsLeft + this.currentTime();
    var timeLeft = endTime - this.currentTime();

    this.setFinalValue(this.formatTimeLeft(timeLeft), element);

    intervalId = setInterval((function() {
      timeLeft = endTime - this.currentTime();
      // When timer has been idle and only resumed past timeout,
      // then we immediatelly complete the timer.
      if(timeLeft < 0 ){
        timeLeft = 0;
      }
      element.data('timeLeft', timeLeft);
      this.setFinalValue(this.formatTimeLeft(timeLeft), element);
    }.bind(this)), refreshRate);

    element.intervalId = intervalId;
  };

  Timer.prototype.clearTimer = function(element){
    element.find('.jst-seconds').text('00');
    element.find('.jst-minutes').text('00:');
    element.find('.jst-hours').text('00:');
  };

  Timer.prototype.currentTime = function() {
    return Math.round((new Date()).getTime() / 1000);
  };

  Timer.prototype.formatTimeLeft = function(timeLeft) {

    var lpad = function(n, width) {
      width = width || 2;
      n = n + '';

      var padded = null;

      if (n.length >= width) {
        padded = n;
      } else {
        padded = Array(width - n.length + 1).join(0) + n;
      }

      return padded;
    };

    var hours = Math.floor(timeLeft / 3600);
    timeLeft -= hours * 3600;

    var minutes = Math.floor(timeLeft / 60);
    timeLeft -= minutes * 60;

    var seconds = parseInt(timeLeft % 60, 10);

    if (+hours === 0 && +minutes === 0 && +seconds === 0) {
      return [];
    } else {
      return [lpad(hours), lpad(minutes), lpad(seconds)];
    }
  };

  Timer.prototype.setFinalValue = function(finalValues, element) {

    if(finalValues.length === 0){
      this.clearTimer(element);
      element.trigger('complete');
      return false;
    }

    element.find('.' + this._options.classNameSeconds).text(finalValues.pop());
    element.find('.' + this._options.classNameMinutes).text(finalValues.pop() + ':');
    element.find('.' + this._options.classNameHours).text(finalValues.pop() + ':');
  };


  $.fn.startTimer = function(options) {
    this.TimerObject = Timer;
    Timer.start(options, this);
    return this;
  };

}));
*/