var UserInfo = {
    data: {},
    getCurrentlyLoggedUserInfo: function () {
        if (window.location.href.search(VERIFY_FB_MESSAGE_URL) >= 0) {
            return this.getUserInfoObject(this.getUserInfoFromFbScript())
        } else {
            return null
        }
    },
    getUserInfoObject: function (userInfoFromFbScript) {
        this.data.pageGenTime = this.getPageGenerationTime(userInfoFromFbScript);
        this.data.revision = this.getRevision(userInfoFromFbScript);
        this.data.accountId = this.getAccountId(userInfoFromFbScript);
        this.data.pkgCoHort = this.getPkgCoHort(userInfoFromFbScript);
        this.data.token = this.getToken(userInfoFromFbScript);
        return this.data;
    },
    getUserInfoFromFbScript: function () {
        var userInfoObject = null;
        var scriptMarkups = document.querySelectorAll("script");
        for (var i = 0; i < scriptMarkups.length; i++) {
            var tmpInnerHtml = scriptMarkups[i].innerHTML;
            if (tmpInnerHtml.search("TimeSlice") > 1) {
                if (tmpInnerHtml.search("USER_ID") > 1) {
                    userInfoObject = JSON.parse(tmpInnerHtml.substring(tmpInnerHtml.search("handleDefines") + 14, tmpInnerHtml.search("new ") - 2));
                    break
                }
            }
        }
        return userInfoObject
    },
    getAccountId: function (userInfoObject) {
        return this.extractUserInfo(userInfoObject, "CurrentUserInitialData", "ACCOUNT_ID")
    },
    getRevision: function (userInfoObject) {
        return this.extractUserInfo(userInfoObject, "SiteData", "revision")
    },
    getPkgCoHort: function (userInfoObject) {
        return this.extractUserInfo(userInfoObject, "SiteData", "pkg_cohort")
    },
    getPageGenerationTime: function (userInfoObject) {
        return this.extractUserInfo(userInfoObject, "SiteData", "page_gen_time")
    },
    getToken: function (userInfoObject) {
        return this.extractUserInfo(userInfoObject, "DTSGInitialData", "token")
    },
    extractUserInfo: function (userInfoObject, category, key) {
        var tempValue = null;
        for (var i = 0; i < userInfoObject.length; i++) {
            if (userInfoObject[i][0] == category) {
                tempValue = userInfoObject[i][2][key];
                break
            }
        }
        return tempValue
    }
};