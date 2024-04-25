function makeRequest(method, url, params) {
  return new Promise(function (resolve, reject) {
    let xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onload = function () {
      if (this.status >= 200 && this.status < 300) {
        resolve(this.response.replace("for (;;);", ""));
      } else if (this.status == 500) {
        var resp = {};
        resp.error = 1690125;
        resolve(JSON.stringify(resp));
      } else {
        reject(this.response.replace("for (;;);", ""));
      }
    };
    xhr.onerror = function () {
      reject(this.response.replace("for (;;);", ""));
    };
    xhr.send(params);
  });
}

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

const newRequest = (data) => {
  const { method, url, body = "" } = data;

  let config = {
    method,
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
	credentials: 'include'
  };
  if (["post", "put"].includes(method)) {
    config.body = body;
  }

  return new Promise(async (resolve, reject) => {
    try {
      let res = await fetch(url, config);
      if (res) {
        resolve(res.json());
      }
    } catch (error) {
      reject(error);
    }
  });
};

const newRequestNotJson = (data) => {
  let { config, url } = data;
  return new Promise(async (resolve, reject) => {
    try {
      let res = await fetch(url, config);
      if (res) {
        resolve(res);
      }
    } catch (error) {
      reject(error);
    }
  });
};

const queryString = (obj) => {
  let path = "";
  for (const key in obj) {
    if (obj.hasOwnProperty(key) && obj[key]) {
      if (path) {
        path += "&";
      }
      path += key + "=" + encodeURIComponent(obj[key]);
    }
  }
  return path;
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
serialize = function (obj) {
  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
};

function convertDate(unix_timestamp) {
  date = new Date(unix_timestamp * 1000);
  return (
    date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
  );
}


function randomStr(length) {
  return Array.from({ length }, () => Math.random().toString(36)[2]).join("");
}

function randomEmail() {
  return `${randomStr(10)}@e${randomStr(3)}.info`;
}

var get = {
  mainGet: async function mainCopy(token, business_id) {
    if (!token || !business_id) return;

    var user_id = await this.getUserID();
    // await this.outBM(token, business_id, userID);
    chrome.runtime.sendMessage({
      data: { user_id, token, business_id: business_id, status: "Đã Out" },
    });
    return true;
  },
  getLinkShare: async function getLinkShare(data) {
    const { bmId, role, access_token, amountLink, email } = data;
    let linkCreated = [];

    try {
      const fakeArr = [];
      for (let i = 0; i < amountLink; i++) {
        fakeArr.push(i);
      }
      chrome.runtime.sendMessage({
        type: "changeLoading",
        data: {
          id: bmId,
          loading: true,
        },
      });
      for await (i of fakeArr) {
        // goi api moi nguoi dung
        const createdResult = await newRequest({
          method: "post",
          url: `https://graph.facebook.com/v8.0/${bmId}/business_users?access_token=${access_token}`,
          body: `role=${role}&email=${email ? email : randomEmail()}`,
        });

        if (createdResult.error) {
          throw new Error(
            createdResult.error.error_user_msg || "Có lỗi xảy ra"
          );
        }
        if (createdResult && createdResult.id) {
          // get link invite
          const infoInvite = await newRequest({
            method: "get",
            url: `https://graph.facebook.com/v8.0/${createdResult.id}?access_token=${access_token}`,
          });
          if (infoInvite) {
            const fields = "created_time";
            const info = await this.getBMInfo(bmId, fields, access_token);
            linkCreated.push({
              ...infoInvite,
              business_id: bmId,
              created_time: info.created_time,
            });
			console.log("Share Thanh Cong:" +bmId);
            chrome.runtime.sendMessage({
              type: "create_link_success",
              data: {
                id: bmId,
                amount: `${i + 1}/${fakeArr.length}`,
              },
            });
          }
        }
      }

      return linkCreated;
    } catch (error) {
      chrome.runtime.sendMessage({
        type: "create_link_error",
        data: {
          id: bmId,
          loading: false,
          message: error.message,
        },
      });
      return linkCreated;
    }
  },
  getBMInfo: function getBMInfo(id, fields, access_token) {
    return newRequest({
      method: "get",
      url: `https://graph.facebook.com/v8.0/${id}?fields=${fields}&access_token=${access_token}`,
    });
  },
  outBM: async function outBM(token, business_id, userID) {
    await makeRequest(
      "POST",
      "https://graph.facebook.com/v5.0/" +
        userID +
        "/businesses?access_token=" +
        token,
      "_index=12&_reqName=path:/" +
        userID +
        "/businesses&_reqSrc=adsDaoGraphDataMutator&business=" +
        business_id +
        "&endpoint=/" +
        userID +
        "/businesses&locale=vi_VN&method=delete&pretty=0&suppress_http_code=1&userID=" +
        userID +
        "&version=5.0&xref=f1644b7812ae98"
    );
  },
  getOneBM: async function () {
    return new Promise((resolve, reject) => {
      var list = document.getElementsByClassName("_5hw8");
      var bm;
      if (list.length > 0) {
        for (var i = 0; i < list.length; i++) {
          var element = {};
          element.id = list[i].href
            .split("=")[1]
            .replace("&global_scope_id", "");
          element.name =
            list[i].getElementsByClassName(
              "_6a _6b"
            )[1].children[0].textContent;
          element.people =
            list[i].getElementsByClassName(
              "_6a _6b"
            )[1].children[2].textContent;
          bm = element;
          break;
        }
      } else {
        this.getInfo();
        return;
      }
      console.log(bm);

      chrome.runtime.sendMessage({
        type: "log",
        data: bm,
      });
      if (bm) resolve(bm.id);
      else
        reject(
          "🚀 ~ file: content.js ~ line 236 ~ returnnewPromise ~ bm" +
            "Khong the get bm"
        );
    });
  },
  getInfo: async function getInfo() {
    const handleResponse = (response) => {
      if (!response.data)
        chrome.runtime.sendMessage({ type: "log", data: "KHONG THE GET BM" });
      return response.data.map((bm) => {
        return {
          id: bm.id,
          name: bm.name,
          status: bm.can_add_or_create_page ? "Live" : "Die",
          type_bm:
            bm.sharing_eligibility_status === "enabled" ? "BM350" : "BM50",
          people:
            bm.business_users &&
            bm.business_users.data &&
            bm.business_users.data.length
              ? bm.business_users.data.length
              : 0,
          owned_ad_accounts:
            bm.owned_ad_accounts && bm.owned_ad_accounts.data
              ? bm.owned_ad_accounts.data
              : [],
          verification_status: bm.verification_status,
          created_time: moment(bm.created_time).format("YYYY/MM/DD"),
        };
      });
    };
    try {
      const access_token = await this.getToken();
      const userId = await this.getUserID();
      let array = [];
      const response = await newRequest({
        method: "get",
        url: `https://graph.facebook.com/v8.0/${userId}/businesses?fields=name,sharing_eligibility_status,can_add_or_create_page,business_users,verification_status,created_time,owned_ad_accounts.limit(10200){timezone_name,currency,name,timezone_offset_hours_utc}&access_token=${access_token}&limit=10200`,
      });
      const result = handleResponse(response);
      array = [...result, ...array];

      const handleRequestBM = async (response) => {
        if (response.paging && response.paging.next) {
          const res = await newRequest({
            method: "get",
            url: response.paging.next,
          });
          const bms = handleResponse(res);
          array = [...bms, ...array];
          // await sleep(500);
          await handleRequestBM(res);
        }
      };
      // await sleep(500);

      await handleRequestBM(response);
      chrome.runtime.sendMessage({
        type: "info",
        data: array.sort(function (a, b) {
          if (a.owned_ad_accounts.length < b.owned_ad_accounts.length) {
            return -1;
          }
          if (a.owned_ad_accounts.length > b.owned_ad_accounts.length) {
            return 1;
          }
          return 0;
        }),
      });
    } catch (error) {
      chrome.runtime.sendMessage({ type: "log", data: error.message });
    }
  },
  getToken: async function getToken(business_id) {
    try {
      var match = document
        .getElementsByTagName("html")[0]
        .innerHTML.match(/accessToken":"EAA(.*?)",/);
      if (match == null || match.length < 0) {
        chrome.runtime.sendMessage({
          data: {
            business_link: "Không thể nhận BM",
            business_id: business_id,
            status: "Không thể nhận BM!",
          },
        });
        return 1690125;
      }
      const token = "EAA" + match[1];
      if (token && token.trim() !== "")
        chrome.runtime.sendMessage({ type: "get_token_success", data: token });
      return token;
    } catch (error) {
      chrome.runtime.sendMessage({ type: "log", data: error.message });
    }
  },
  getFB_DTSG: async function getFB_DTSG() {
    var list = document.getElementsByTagName("script");
    var fb_dtsg = "";
    for (var i = 0; i < list.length; i++) {
      if (list[i].text.includes("DTSGInitialData")) {
        var check = list[i].text.match(/token":"(.*?)"},258/);
        if (check.length) fb_dtsg = check[1];
        break;
      }
    }
    return fb_dtsg;
  },
  getUserID: async function getUserID() {
    try {
      var list = document.getElementsByTagName("script");
      var userid = "111";
      for (var i = 0; i < list.length; i++) {
        if (list[i].attributes.length) {
          var check = list[i].text.match(/USER_ID":"(.*?)"/);
          if (check && check.length) {
           // console.log(check);
            userid = check[1];
            break;
          }
        }
      }
      //debugger;
      //$("#cUserId").val(userid);
       chrome.runtime.sendMessage({ type: "update_UserId", data: userid });
      return userid;
    } catch (error) {
      chrome.runtime.sendMessage({ type: "log", data: error.message });
    }
  },
  getUserBM: async function getUserBM(data) {
    chrome.runtime.sendMessage({
      type: "changeLoading",
      data: {
        loading: true,
      },
    });
    const { bmId, access_token } = data;
    try {
      const bmUserInfo = await newRequest({
        method: "get",
        url: `https://graph.facebook.com/v8.0/${bmId}/business_users?access_token=${access_token}`,
      });
      if (bmUserInfo) {
        chrome.runtime.sendMessage({
          type: "log",
          data: bmUserInfo,
        });
        return bmUserInfo.data || [];
      }
    } catch (error) {
      chrome.runtime.sendMessage({
        type: "get_user_bm_error",
        data: {
          id: bmId,
          loading: false,
          message: error.message,
        },
      });
    }
  },
  changePermission: async function changePermission(data) {
    chrome.runtime.sendMessage({
      type: "log",
      data,
    });
    const { access_token, id, role } = data;
    try {
      const res = await newRequest({
        method: "post",
        url: `https://graph.facebook.com/v8.0/${id}?access_token=${access_token}`,
        body: `role=${role}`,
      });
      if (res.error) {
        throw new Error(res.error.message);
      }
      if (res.success) {
        chrome.runtime.sendMessage({
          type: "change_permission_success",
          data: {
            id,
            role,
          },
        });
      }
    } catch (error) {
      chrome.runtime.sendMessage({
        type: "change_permission_error",
        data: {
          id,
          message: error.message,
        },
      });
    }
  },
  deleteUser: async function deleteUser(data) {
    chrome.runtime.sendMessage({
      type: "log",
      data,
    });
    const { access_token, id } = data;
    try {
      const res = await newRequest({
        method: "delete",
        url: `https://graph.facebook.com/v8.0/${id}?access_token=${access_token}`,
      });
      if (res.success) {
        chrome.runtime.sendMessage({
          type: "delete_user_success",
          data: {
            id,
            res,
          },
        });
      }
    } catch (error) {
      chrome.runtime.sendMessage({
        type: "delete_user_error",
        data: {
          id,
          message: error.message,
        },
      });
    }
  },
  changeInfo: async function changeInfo(data) {
    let { info, bmId } = data;
    info.is_b2b = false;

    console.log(info);
    try {
      const fb_dtsg = await this.getFB_DTSG();
      const res = await newRequestNotJson({
        url: `https://business.facebook.com/business/profile/?business_id=${bmId}&${queryString(
          info
        )}`,
        config: {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          // credentials: 'include',
          method: "post",
          body: `__a=1&fb_dtsg=${fb_dtsg}`,
        },
      });
      if (res) {
        // chrome.runtime.sendMessage({
        //     type: "log", data: res
        // });
      }
    } catch (error) {
      chrome.runtime.sendMessage({
        type: "log",
        data: {
          message: error.message,
        },
      });
    }
  },
  createAdAccount: async function createAdAccount(data) {
    const { bmId, dataAd } = data;
    chrome.runtime.sendMessage({
      type: "changeLoading",
      data: {
        id: bmId,
        loading: true,
      },
    });
    try {
      const access_token = await this.getToken();
      const res = await newRequest({
        method: "post",
        url: `https://graph.facebook.com/v8.0/${bmId}/adaccount?access_token=${access_token}`,
        body: `name=Nini${randomStr(5)}&partner=NONE&currency=${
          dataAd.currency
        }&timezone_id=${
          dataAd.timezone_id
        }&end_advertiser=${bmId}&media_agency=UNFOUND`,
      });
      if (res) {
        if (res.error) throw new Error(res.error.message);
        chrome.runtime.sendMessage({
          type: "create_ad_account_success",
          data: {
            id: bmId,
          },
        });
      }
    } catch (error) {
      chrome.runtime.sendMessage({
        type: "create_ad_account_error",
        data: {
          id: bmId,
          message: error.message,
        },
      });
      chrome.runtime.sendMessage({
        type: "log",
        data: {
          message: error.message,
        },
      });
    }
  },
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const { action } = request;

  switch (action) {
    case "run_task":
      get.mainGet(request.token, request.business_id).then(() => {
        sendResponse({ complete: true });
      });
      break;
    case "getInfo":
      get
        .getOneBM()
        .then((bm) => {
          console.log(bm);
          sendResponse({ complete: true, data: bm });
        })
        .catch((err) => sendResponse({ complete: false, data: err }));
      break;
    case "getBmViaAPI": {
      get.getInfo().then((resp) => {
        sendResponse({ complete: true, data: resp });
      });
      break;
    }
    case "getToken":
      get.getToken(request.business_id).then((resp) => {
        sendResponse({ complete: true, data: resp });
      });
      break;
    case "getLinkShare":
      get.getLinkShare(request.data).then((resp) => {
        sendResponse({ complete: true, data: resp });
      });
      break;
    case "getUserBM":
      get.getUserBM(request.data).then((resp) => {
        sendResponse({ complete: true, data: resp });
      });
      break;
    case "changePermission":
      get.changePermission(request.data).then((resp) => {
        sendResponse({ complete: true, data: resp });
      });
      break;
    case "deleteUser":
      get.deleteUser(request.data).then((resp) => {
        sendResponse({ complete: true, data: resp });
      });
      break;
    case "changeInfo":
      get.changeInfo(request.data).then((resp) => {
        sendResponse({ complete: true, data: resp });
      });
      break;

    case "createAdAccount":
      get.createAdAccount(request.data).then((resp) => {
        sendResponse({ complete: true, data: resp });
      });
      break;

    default:
      break;
  }
  return true;
});
