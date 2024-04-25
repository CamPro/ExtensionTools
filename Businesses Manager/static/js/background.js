chrome.runtime.onMessage.addListener(function (rq, sender, sendResponse) {
  // setTimeout to simulate any callback (even from storage.sync)
  setTimeout(function () {
    sendResponse({ status: true });
  }, 1);
  return true; // uncomment thchangeInfois line to fix error
});

chrome.browserAction.onClicked.addListener(() => {
  chrome.tabs.create({
    url: chrome.extension.getURL("popup.html"),
  });
  return true;
});

function goToUrl(id, url) {
  chrome.tabs.update(id, { url });
  return new Promise((resolve) => {
    chrome.tabs.onUpdated.addListener(function onUpdated(tabId, info, tab) {
      if (tabId === id && info.status === "complete") {
        chrome.tabs.onUpdated.removeListener(onUpdated);
        resolve(tab.url);
      }
      return true;
    });
  });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function sendMessagePromise(tabId, item) {
  return new Promise((resolve, reject) => {
    chrome.tabs.sendMessage(tabId, item, (response) => {
      if (response.complete) {
        resolve(response.data);
      } else {
        reject("Something wrong");
      }
    });
  });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.action) {
    case "action_create_link": {
      chrome.tabs.getAllInWindow(null, async function (tabs) {
        var tabid = 0;
        for (let i = 0; i < tabs.length; i++) {
          if (
            tabs[i] &&
            tabs[i].url &&
            tabs[i].url.includes("business.facebook.com")
          ) {
            tabid = tabs[i].id;
            break;
          }
        }

        let {
          business_ids,
          role,
          amountLink,
          access_token,
          email,
        } = request.data;
        chrome.runtime.sendMessage({
          type: "changeLoading",
          data: {
            id: business_ids[0],
            loading: true,
          },
        });

        if (!access_token) {
          await goToUrl(
            tabid,
            "https://business.facebook.com/settings/info?business_id=" +
              business_ids[0]
          );
          access_token = await sendMessagePromise(tabid, {
            action: "getToken",
            business_id: business_ids[0],
          });
        }

        for await (business_id of business_ids) {
          if (access_token == 1690125) {
            continue;
          }

          const res = await sendMessagePromise(tabid, {
            action: "getLinkShare",
            data: {
              access_token,
              bmId: business_id,
              role,
              email,
              amountLink,
            },
          });
          if (res) {
            chrome.runtime.sendMessage({
              type: "result_link_share",
              data: res,
            });
          }
        }
      });
      break;
    }
    case "get": {
      chrome.tabs.getAllInWindow(null, async function (tabs) {
        var tabid = 0;
        for (let i = 0; i < tabs.length; i++) {
          if (tabs[i].url.includes("business.facebook.com")) {
            tabid = tabs[i].id;
            break;
          }
        }
        if (tabid === 0) {
          tabid = await new Promise((resolve) => {
            chrome.tabs.create(
              {
                url: "https://business.facebook.com/select",
                index: 0,
                selected: false,
              },
              (tab) => {
                resolve(tab.id);
              }
            );
          });
        }
        if (tabid > 0) {
          await goToUrl(tabid, "https://business.facebook.com/select");
          const idBm = await sendMessagePromise(tabid, {
            action: "getInfo",
          });
          await goToUrl(
            tabid,
            "https://business.facebook.com/settings/info?business_id=" + idBm
          );
          await sendMessagePromise(tabid, {
            action: "getBmViaAPI",
          });
        }
      });
      break;
    }

    case "get_user_bm": {
      let { access_token, bmId } = request.data;

      chrome.tabs.getAllInWindow(null, async function (tabs) {
        var tabid = 0;
        for (let i = 0; i < tabs.length; i++) {
          if (tabs[i].url.includes("business.facebook.com")) {
            tabid = tabs[i].id;
            break;
          }
        }
        if (!access_token) {
          await goToUrl(
            tabid,
            "https://business.facebook.com/settings/info?business_id=" + bmId
          );
          access_token = await sendMessagePromise(tabid, {
            action: "getToken",
            business_id: bmId,
          });
          console.log(access_token);
        }
        const res = await sendMessagePromise(tabid, {
          action: "getUserBM",
          data: {
            access_token,
            bmId,
          },
        });
        if (res) {
          chrome.runtime.sendMessage({
            type: "get_user_bm_success",
            data: res,
          });
        }
      });
      break;
    }

    case "change_permission": {
      chrome.tabs.getAllInWindow(null, async function (tabs) {
        var tabid = 0;
        for (let i = 0; i < tabs.length; i++) {
          if (tabs[i].url.includes("business.facebook.com")) {
            tabid = tabs[i].id;
            break;
          }
        }
        await sendMessagePromise(tabid, {
          action: "changePermission",
          data: request.data,
        });
      });
      break;
    }
    case "delete_user": {
      chrome.tabs.getAllInWindow(null, async function (tabs) {
        var tabid = 0;
        for (let i = 0; i < tabs.length; i++) {
          if (tabs[i].url.includes("business.facebook.com")) {
            tabid = tabs[i].id;
            break;
          }
        }
        await sendMessagePromise(tabid, {
          action: "deleteUser",
          data: request.data,
        });
      });

      break;
    }

    case "createAdAccount": {
      chrome.tabs.getAllInWindow(null, async function (tabs) {
        var tabid = 0;
        for (let i = 0; i < tabs.length; i++) {
          if (tabs[i].url.includes("business.facebook.com")) {
            tabid = tabs[i].id;
            break;
          }
        }
        await sendMessagePromise(tabid, {
          action: "createAdAccount",
          data: request.data,
        });
      });

      break;
    }

    case "change_info": {
      chrome.tabs.getAllInWindow(null, async function (tabs) {
        var tabid = 0;
        for (let i = 0; i < tabs.length; i++) {
          if (
            tabs[i] &&
            tabs[i].url &&
            tabs[i].url.includes("business.facebook.com")
          ) {
            tabid = tabs[i].id;
            break;
          }
        }

        let { business_ids, info } = request.data;
        chrome.runtime.sendMessage({
          type: "changeLoading",
          data: {
            id: business_ids[0],
            loading: true,
          },
        });

        await goToUrl(
          tabid,
          "https://business.facebook.com/settings/info?business_id=" +
            business_ids[0]
        );

        for await (business_id of business_ids) {
          const res = await sendMessagePromise(tabid, {
            action: "changeInfo",
            data: {
              bmId: business_id,
              info,
            },
          });
          if (res) {
            chrome.runtime.sendMessage({
              type: "result_link_share",
              data: res,
            });
          }
        }
      });
      break;
    }
    default:
      break;
  }
  return false;
});
