var app = angular.module("fbMessageCleanerApp", []);
app.controller("fbMessageCleanerCtrl", function ($scope, $http) {
    $scope.contentViewScreen = START_ANALYZE_SCREEN;
    $scope.progressStatus = 0;
    var intervalId = 0;
    $scope.constructDeleteChatPayload = function (userInfo) {
        alert('x');
        //return `ids[0]={{CHAT_ID}}&__user=${$scope.userInfo.accountId}&__a=1&__dyn=&__af=o&__req=l&__be=-1&__pc=${$scope.userInfo.pkgCoHort}&fb_dtsg=${$scope.userInfo.token}&ttstamp=&__rev=${$scope.userInfo.revision}&__srp_t=${$scope.userInfo.pageGenTime}`
    };
    $scope.initSelectAndDelete = function initSelectAndDelete() {
        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {req: SELECT_AND_DELETE}, function (response) {
                if (response == true) {
                    window.close()
                } else {
                    $scope.fbCleanerReport = {
                        msg: chrome.i18n.getMessage("app_not_found_message"),
                        type: ERROR
                    };
                    $scope.updateContentScreenView(DELETE_SCREEN)
                }
            })
        })
    };
    $scope.startAnalyze = function startAnalyze() {
        $scope.updateProgress();
        $scope.fbCleanerReport = {
            msg: chrome.i18n.getMessage('app_in_progress'),
            type: WARNING
        };
        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
            $scope.updateContentScreenView(ANALYZING_SCREEN);
            chrome.tabs.sendMessage(tabs[0].id, {req: CHAT_SUMMARY}, function (response) {
                window.setTimeout(function () {
                    $scope.progressStatus = 0;
                    if (response) {
                        $scope.fbCleanerReport = {
                            msg: chrome.i18n.getMessage("app_found_message_msg"),
                            type: ALERT
                        };
                        $scope.updateContentScreenView(DELETE_SCREEN)
                    } else {
                        $scope.fbCleanerReport = {
                            msg: chrome.i18n.getMessage("app_not_found_message"),
                            type: ERROR
                        };

                        $scope.updateContentScreenView(START_ANALYZE_SCREEN)
                    }
                    if (!$scope.$$phase) {
                        $scope.$apply()
                    }
                }, delayInMS)
            })
        })
    };
    $scope.startDeletion = function startDeletion() {
        $scope.fbCleanerReport = {
            msg: chrome.i18n.getMessage("app_popup_warning_msg"),
            type: WARNING
        };
        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
            $scope.updateContentScreenView(DELETING_SCREEN)
            chrome.tabs.sendMessage(tabs[0].id, {req: DELETE_SUMMARY}, function (response) {
                if (response) {
                    window.setTimeout(function () {
                        $scope.updateContentScreenView(START_ANALYZE_SCREEN);
                        $scope.fbCleanerReport = {
                            msg: chrome.i18n.getMessage("app_delete_successfull_msg"),
                            type: ALERT
                        };
                        if (!$scope.$$phase) {
                            $scope.$apply()
                        }
                    }, delayInMS);
                    if (!$scope.$$phase) {
                        $scope.$apply()
                    }
                } else {
                    $scope.fbCleanerReport = {msg: chrome.i18n.getMessage("app_not_found_message"), type: ERROR};
                    $scope.updateContentScreenView(DELETE_SCREEN);
                    $scope.classname = "screen2";
                }
            })
        })
    };
    $scope.insertFbIframe = function insertFbIframe() {};
    $scope.updateContentScreenView = function updateContentScreenView(screen) {
        $scope.contentViewScreen = screen;
        if (!$scope.$$phase) {
            $scope.$apply()
        }
    };
    $scope.updateProgress = function updateProgress() {
        intervalId = window.setInterval(function () {
            if ($scope.progressStatus < 100) {
                $scope.progressStatus += 5;
                if (!$scope.$$phase) {
                    $scope.$apply()
                }
            } else {
                clearInterval(intervalId)
            }
        }, 100)
    };
    $scope.openFacebook = function openFacebook() {
        chrome.tabs.create({url: FB_MESSAGE_URL})
    };
    $scope.init = function init() {
        $scope.startAnalyze();
        $scope.contentViewScreen = ANALYZING_SCREEN;

        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
            if (tabs[0].url.search(VERIFY_FB_MESSAGE_URL) >= 0) {
                $scope.contentViewScreen = ANALYZING_SCREEN
            } else {
                window.open(FB_MESSAGE_URL, "_blank")
            }
            if (!$scope.$$phase) {
                $scope.$apply()
            }
        })
    };
    $scope.classname = 'screen1';
    $scope.init()

});

app.config(["$compileProvider", function ($compileProvider) {
    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|local|data|chrome-extension):/)
}]);