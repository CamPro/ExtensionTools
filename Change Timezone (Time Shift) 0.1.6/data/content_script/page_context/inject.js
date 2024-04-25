{
  const options = JSON.parse(timeZoneStorage);
  const getTimezoneOffset = Date.prototype.getTimezoneOffset;
  //
  const processedNames = [
    "_date",
    "_offset",
    "getTime",
    "setTime",
    "getTimezoneOffset",
    //
    "toJSON",
    "valueOf",
    "constructor",
    //
    "toString",
    "toGMTString",
    "toISOString",
    //
    "getUTCDay",
    "getUTCDate",
    "getUTCMonth",
    "getUTCHours",
    "getUTCMinutes",
    "getUTCSeconds",
    "getUTCFullYear",
    "getUTCMilliseconds",
    //
    "toTimeString",
    "toLocaleString",
    "toLocaleTimeString",
    "toLocaleDateString"
  ];
  //
  const propertyNames = Object.getOwnPropertyNames(Date.prototype).filter(function (item) {
    return processedNames.indexOf(item) === -1;
  });
  //
  const convertToGMT = function (n) {
    const format = function (v) {return (v < 10 ? '0' : '') + v};
    return (n <= 0 ? '+' : '-') + format(Math.abs(n) / 60 | 0) + format(Math.abs(n) % 60);
  };
  //
  Object.defineProperty(Date.prototype, "_offset", {
    "configurable": true,
    get() {
      return getTimezoneOffset.call(this);
    }
  });
  //
  Object.defineProperty(Date.prototype, "_date", {
    configurable: true,
    get() {
      return this._newdate !== undefined ? this._newdate : new Date(this.getTime() + (this._offset - options.value) * 60 * 1000);
    }
  });
  //
  Date.prototype.getTimezoneOffset = new Proxy(Date.prototype.getTimezoneOffset, {
    apply(target, self, args) {
      return isNaN(self) ? Reflect.apply(target, self, args) : options.value;
    }
  });
  //
  Date.prototype.toString = new Proxy(Date.prototype.toString, {
    apply(target, self, args) {
      return isNaN(self) ? Reflect.apply(target, self, args) : self.toDateString() + ' ' + self.toTimeString();
    }
  });
  //
  Date.prototype.toLocaleString = new Proxy(Date.prototype.toLocaleString, {
    apply(target, self, args) {
      args[1] = args[1] !== undefined ? args[1] : {};
      args[1].timeZone = options.name;
      //
      return isNaN(self) ? Reflect.apply(target, self, args) : Reflect.apply(target, self, args);
    }
  });  
  //
  Date.prototype.toLocaleDateString = new Proxy(Date.prototype.toLocaleDateString, {
    apply(target, self, args) {
      args[1] = args[1] !== undefined ? args[1] : {};
      args[1].timeZone = options.name;
      //
      return isNaN(self) ? Reflect.apply(target, self, args) : Reflect.apply(target, self, args);
    }
  });  
  //
  Date.prototype.toLocaleTimeString = new Proxy(Date.prototype.toLocaleTimeString, {
    apply(target, self, args) {
      args[1] = args[1] !== undefined ? args[1] : {};
      args[1].timeZone = options.name;
      //
      return isNaN(self) ? Reflect.apply(target, self, args) : Reflect.apply(target, self, args);
    }
  });
  //
  Date.prototype.toTimeString = new Proxy(Date.prototype.toTimeString, {
    apply(target, self, args) {
      const result = Reflect.apply(target, self._date, args);
      //
      const replace_1 = convertToGMT(self._offset);
      const replace_2 = convertToGMT(options.value);
      const replace_3 = "(" + options.name.replace(/\//g, " ") + " Standard Time)";
      //
      return isNaN(self) ? Reflect.apply(target, self, args) : result.replace(replace_1, replace_2).replace(/\(.*\)/, replace_3);
    }
  });
  //
  propertyNames.forEach(function (name) {
    if (["setHours", "setMinutes", "setMonth", "setDate", "setYear", "setFullYear"].indexOf(name) !== -1) {
      Date.prototype[name] = new Proxy(Date.prototype[name], {
        apply(target, self, args) {
          if (isNaN(self)) {
            return Reflect.apply(target, self, args);
          } else {
            const adjusted = self._date.getTime();
            const current = Reflect.apply(target, self._date, args);
            const result = self.setTime(self.getTime() + current - adjusted);
            //
            return result;
          }
        }
      });
    } else if (["setUTCDate", "setUTCFullYear", "setUTCHours", "setUTCMinutes", "setUTCMonth"].indexOf(name) !== -1) {
      /*
        Date.prototype[name] = new Proxy(Date.prototype[name], {
          apply(target, self, args) {
            if (isNaN(self)) {
              return Reflect.apply(target, self, args);
            } else {
              const current = Reflect.apply(target, self, args);
              self._newdate = new _Date(self.getTime() + (options.value + self._offset) * 60 * 1000);
              //
              return current;
            }
          }
        });
      */
    } else {
      Date.prototype[name] = new Proxy(Date.prototype[name], {
        apply(target, self, args) {
          return isNaN(self) ? Reflect.apply(target, self, args) : Reflect.apply(target, self._date, args);
        }
      });
    }
  });
  //
  Intl.DateTimeFormat.prototype.resolvedOptions = new Proxy(Intl.DateTimeFormat.prototype.resolvedOptions, {
    apply(target, self, args) {
      const result = Reflect.apply(target, self, args);
      result.timeZone = options.name;
      //
      return result;
    }
  });
  //
  Intl.DateTimeFormat = new Proxy(Intl.DateTimeFormat, {
    apply(target, self, args) {
      args[1] = args[1] !== undefined ? args[1] : {};
      args[1].timeZone = options.name;
      //
      return Reflect.apply(target, self, args);
    },
    construct(target, args, newTarget) {
      args[1] = args[1] !== undefined ? args[1] : {};
      args[1].timeZone = options.name;
      //
      return Reflect.construct(target, args, newTarget);
    }
  });
}