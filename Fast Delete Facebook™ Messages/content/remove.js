class confirm {
    success() {
        $("#body").remove();
        $.confirm({
            title: `${chrome.i18n.getMessage("success_delete_all_title")}`,
            content: `${chrome.i18n.getMessage("success_delete_all_messages")}`,
            theme: 'supervan',
            buttons: {
                confirm: {
                    "text": "Ok",
                    action: function () {
                        chrome.extension.sendMessage({'action': 'close'}, function (response) {});
                    }
                }
            }
        });

    }
}

let element = document.querySelector('[aria-label="Conversation List"]');
(function ($$) {
    class Processing {
        constructor($$) {
            this.timeOut = 500;
            this.$$ = $$;
            this.loader = `<div id="body"><div class="loader loader--style5" title="4"><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"  width="24px" height="30px" viewBox="0 0 24 30" style="enable-background:new 0 0 50 50;" xml:space="preserve"><rect x="0" y="0" width="4" height="10" fill="#333"><animateTransform attributeType="xml" attributeName="transform" type="translate" values="0 0; 0 20; 0 0" begin="0" dur="0.6s" repeatCount="indefinite" /></rect><rect x="10" y="0" width="4" height="10" fill="#333"><animateTransform attributeType="xml" attributeName="transform" type="translate" values="0 0; 0 20; 0 0" begin="0.2s" dur="0.6s" repeatCount="indefinite" /></rect><rect x="20" y="0" width="4" height="10" fill="#333"> <animateTransform attributeType="xml" attributeName="transform" type="translate" values="0 0; 0 20; 0 0" begin="0.4s" dur="0.6s" repeatCount="indefinite" /></rect></svg></div></div>`;
            $("html, body").css("overflow", "hidden");
            $("body").append(this.loader);
        }

        stepOne() {
            if (null !== $$('div[aria-label="Conversation actions"]')) {
                this.$$('div[aria-label="Conversation actions"]').click();
                setTimeout(this.stepThree.bind(this), this.timeOut);
            } else {
                new confirm().success()
            }
        }

        stepThree() {
            let a = document.getElementsByClassName('uiContextualLayer').length;
            document.getElementsByClassName('uiContextualLayer')[a - 1].getElementsByTagName('a')[2].click();
            setTimeout(this.stepFour.bind(this), this.timeOut);
        }

        stepFour() {
            let b = document.getElementsByClassName('uiLayer').length;
            document.getElementsByClassName('uiLayer')[b - 1].getElementsByTagName('button')[1].click();
            if (null !== $$('div[aria-label="Conversation actions"]')) {
                setTimeout(this.stepOne.bind(this), this.timeOut);
            } else {
                new confirm().success()

            }
        };
    }

    new Processing($$).stepOne();
})(function (selector) {
    return document.querySelector(selector);
});

