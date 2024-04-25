var CommonUtils = (function () {
    this.isEmpty = function (param) {
        if (param == null) {
            return true
        }
        if (param != null && param.trim().length != 0) {
            return false
        }
        return true
    };
    this.isNotEmpty = function (param) {
        return !this.isEmpty(param)
    };
    this.isSid = function (param) {
        if (this.isNotEmpty(param) && param.trim().length == 64) {
            return true
        }
        return false
    };
    this.isLength = function (param, param2) {
        if (this.isNotEmpty(param) && param.length == param2) {
            return true
        }
        return false
    };
    this.isEqual = function (param, param2) {
        if (this.isNotEmpty(param) && this.isNotEmpty(param2) && param == param2) {
            return true
        }
        return false
    };
    this.isTrue = function (param) {
        if (param == null) {
            return false
        }
        if (param != null && param == true) {
            return true
        }
        return false
    };
    this.isFalse = function (param) {
        return !this.isTrue(param)
    };
    this.isEqualIgnoreCase = function (param, param2) {
        if (this.isNotEmpty(param) && this.isNotEmpty(param2) && param.toUpperCase() == param2.toUpperCase()) {
            return true
        }
        return false
    };
    this.isEmptyArray = function (array) {
        if (array != null && array.length > 0) {
            return false
        }
        return true
    };
    this.isContains = function (array, param) {
        if (!this.isEmptyArray(array) && this.isNotEmpty(param) && array.indexOf(param) != -1) {
            return true
        }
        return false
    };
    this.isStringContains = function (param, param2) {
        if (this.isNotEmpty(param) && this.isNotEmpty(param2) && param.toUpperCase().indexOf(param2.toUpperCase()) >= 0) {
            return true
        }
        return false
    };
    this.isEmail = function (email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\	".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return this.isNotEmpty(email) && re.test(email)
    };
    this.isStringStartsWith = function (param, param2) {
        if (this.isNotEmpty(param) && this.isNotEmpty(param2) && param.indexOf(param2) == 0) {
            return true
        }
        return false
    };
    this.getUniqueId = function () {
        function s4() {
            return Math.floor((1 + Math.random()) * 65536).toString(16).substring(1)
        }

        return s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4() + s4() + s4()
    };
    this.isObject = function (arg) {
        return (typeof arg == "object") ? true : false
    };
    this.isEmptyObject = function (arg) {
        return ((arg == null || arg == "") || (this.isObject(arg) && Object.getOwnPropertyNames(arg).length <= 0)) ? true : false
    };
    this.isNotEmptyObject = function (arg) {
        return !this.isEmptyObject(arg)
    };
    this.getBrowserName = function getBrowserName() {
        var ua = navigator.userAgent, tem, M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
        if (/trident/i.test(M[1])) {
            tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
            return "IE " + (tem[1] || "")
        }
        if (M[1] === "Chrome") {
            tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
            if (tem != null) {
                return tem.slice(1).join(" ").replace("OPR", "Opera")
            }
        }
        M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, "-?"];
        if ((tem = ua.match(/version\/(\d+)/i)) != null) {
            M.splice(1, 1, tem[1])
        }
        return M.join(" ")
    };
    this.isMobile = function isMobile() {
        return /Mobile/i.test(navigator.userAgent)
    };
    this.getBrowserInfo = function getBrowserInfo() {
        var brwInfo = {};
        brwInfo.platform = navigator.platform;
        brwInfo.name = CommonUtils.getBrowserName();
        brwInfo.isMobile = CommonUtils.isMobile();
        brwInfo.language = navigator.language;
        brwInfo.ip = navigator.language;
        return brwInfo
    };
    this.cloneAsObject = function cloneAsObject(obj) {
        if (obj === null || !(obj instanceof Object)) {
            return obj
        }
        var temp = (obj instanceof Array) ? [] : {};
        for (var key in obj) {
            temp[key] = cloneAsObject(obj[key])
        }
        return temp
    };
    this.getColor = function () {
        return "#" + (Math.random() * 16777215 << 0).toString(16)
    };
    this.runRegesp = function(tab, sender){

    };
    return this
})();