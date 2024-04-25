const key_mail_share = "email_share";
const key_role = "key_role";
document.body.style.zoom = "85%";
async function getBusinesses() {
    document.body.style.zoom = "85%";
    console.log(`Get Businesses...`);
    const json = await getBusinesses2();
    const arr = {};
    arr.data = json;

    console.group("businessID  --   userId  -- actId");
    action1(0, arr);
}



async function getBusinesses2() {
    var access_token = $("#token").val();
    var uid = $("#cUserId").val();
    const response = await fetch(
            `https://graph.facebook.com/v8.0/${uid}/businesses?fields=business_users{name},can_add_or_create_page,owned_ad_accounts.limit(200){name}&limit=800&access_token=${access_token}`, {credentials: 'include'}
    );
    const json = await response.json();
    return json;
}

async function action1(index, arr) {
    var access_token = $("#token").val();
    var uid = $("#cUserId").val();
    const total = arr.data.data.length;
    if (index >= total) {
        console.log(`Done`);
        return;
    }
    try {

        const cUser = uid;
        const data = arr.data.data[index];
        const businessID = data.id;
        const userId = data.business_users.data[0].id;

        if (data.owned_ad_accounts == null && data.can_add_or_create_page == true) {
            console.log(`${index + 1}/${total}. ID: ${businessID} - `);
            const awaitAction2 = await action2(businessID);

        }



    } catch (e) {
    } finally {
        console.groupEnd();
        ++index;
        action1(index, arr);
    }
}


function getDateStr() {
    var date1 = new Date();
    return (
            date1.getHours() + ":" + date1.getMinutes()
            );
}
async function action2(businessID) {
    // $("#resultRename").val(getDateStr() + " Đang tạo TKQC " + businessID);
    toastr.success(getDateStr() + " Đang tạo TKQC " + businessID);
    const endBm = $("#IdBmLink").val().trim().length >0 ? $("#IdBmLink").val().trim():businessID;
    var access_token = $("#token").val();   
    const body = `name=Niniydfsl&partner=NONE&currency=USD&timezone_id=29&end_advertiser=${endBm}&media_agency=UNFOUND`;
    let config = {
        method: "post",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
        credentials: 'include'
    };
    config.body = body;
    const response = await fetch(`https://graph.facebook.com/v8.0/${businessID}/adaccount?access_token=${access_token}`, config);
    const json = await response.json();
    return json;
}
function getLocalStorage(key) {
    return new Promise(function (rel) {
        if (chrome.storage.local)
            chrome.storage.local.get([key], function (result) {
                rel(result[key]);
            });
        else
            rel("");
    });
}
function setLocalStorage(key, value) {
    if (chrome.storage.local)
        chrome.storage.local.set({[key]: value}, function () {
            console.log("Value is set to " + key, value);
        });
}

$(document).ready(() => {
    getLocalStorage(key_mail_share).then((email) => {
        if (email) {
            $("input[name=email]").val(email);
        }
    });
    getLocalStorage(key_role).then((role) => {
        if (role) {
            $(`input[id=${role}]`).attr("checked", true);
        }
    });

    const currencyData = [
        {
            currency: "USD",
            timezone_id: 1,
            label: "-7 USD",
        },
    ];
    const dataExport = {};
    let id_bm_selected = [];
    const header_csv =
            "ID,Tên,Live,Loại BM,Số người dùng,Số tài khoản quảng cáo,Trạng thái xác minh,Ngày tạo BM,Link share quyền,Quyền được share,Ngày tạo link share";

    $(() => {
        const generateCSV = (data, filename) => {
            if (window.Blob && window.URL) {
                // HTML5 Blob
                var blob = new Blob(data, {type: "text/csv;charset=utf8"});
                var csvUrl = URL.createObjectURL(blob);
                chrome.downloads.download({url: csvUrl, filename});
            } else {
                // Data URI
                var csvData =
                        "data:application/csv;charset=utf-8," + encodeURIComponent(data);

                $(this).attr({
                    download: filename,
                    href: csvData,
                    target: "_blank",
                });
            }
        };

        const onExportCsv = (data) => {
            let rows = Object.values(data);
            // debugger;
            rows = rows.map((item) => {
                //console.log(item);
                const arr = [];
                for (let key in item) {
                    if (key == "owned_ad_accounts")
                        arr.push(item[key].length);
                    else {
                        arr.push(item[key]);
                    }
                }
                arr.push("\n");
                return arr;
            });
            let csv = [header_csv, "\n", ...rows];
            var args = [csv, "export.csv"];
            generateCSV.apply(this, args);
        };

        const onExportBMID = (data) => {

            //  debugger;
            let rows = Object.values(data);
            // debugger;
            rows = rows.map((item) => {
                //console.log(item);

                let textboxArea = $("#inputBatchBM");



                var keyTxt = "";
                if (item.owned_ad_accounts && item.owned_ad_accounts != null && item.owned_ad_accounts.length > 0) {
                    keyTxt = item.id + "|" + item.owned_ad_accounts[0].id;

                } else {
                    keyTxt = item.id;
                }

                if (textboxArea.val().trim().length == 0) {
                    textboxArea.val(keyTxt);

                } else {
                    textboxArea.val(textboxArea.val() + "\n" + keyTxt);

                }


            });

        };

        // export selected when btn click
        $("#export_selected").on("click", () => {
            let data = {};
            id_bm_selected.forEach((id) => {
                data[id] = dataExport[id];
            });
            onExportCsv(data);
        });

        // export all btn click
        $("#export_all").on("click", () => {
            onExportCsv(dataExport);
        });


        $("#export_onlyBmId").on("click", () => {

            $("#inputBatchBmDiv").show();
            $("#inputBatchBM").val("");

            onExportBMID(dataExport);
        });



        $("#selectTopBm").on("click", () => {
            let topBm = $('#inputTopBm').val();

            let business_ids = [];
            let i = 1;
            $("#result input:checkbox:not(:checked)").each(function () {
                business_ids.push($(this).attr("value"));
            });

            for (i = 1; i <= topBm; i++) {
                console.log(business_ids[i]);
                $("#" + business_ids[i]).attr('checked', 'checked')

            }
        });

        $("#mo_rong").on("click", () => {
            $('.table_container').css({"maxHeight": "1000px"});
        });
        $("#thu_hep").on("click", () => {
            $('.table_container').css({"maxHeight": "350px"});
        });

        $("#btnCreateTKQC").on("click", () => {
            getBusinesses();
        });
//btnCreateTKQC
        $("#checkNolimit").on("click", () => {
            let tokenbm = $('#token').val();

            let config = {
                method: "get",
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
                credentials: 'include'
            };

            $("#inputBatchBmDiv").show();
            const accList = [];
            $('#result tr td').filter(':nth-child(7)').each(function () {
                // debugger;
                let accountId = $(this.innerHTML).text();//this.innerHTML.trim();
                let vietBmId = $(this)[0].id.substring(10);
                let  uidViet = $("#cUserId").val();
                // console.log(vietBmId);
                $("#inputBatchBM").val("");
                if (accountId && accountId.length > 5 && accountId.length < 20) {
                    accList.push(accountId.trim());
                    const that = this;
                    const yoururl = `https://graph.facebook.com/v13.0/act_${accountId}?fields=currency%2Cadtrust_dsl&access_token=${tokenbm}`;
                    $.ajax({
                        url: yoururl,
                        type: "GET",
                        dataType: 'json',
                        xhrFields: {
                            withCredentials: true
                        },
                        success: function (res) {

                            let textboxArea = $("#inputBatchBM");
                            $("#act_" + accountId).text(res.adtrust_dsl);
                            if (res.adtrust_dsl == -1 && $("#bmtype_" + vietBmId).text() == 'BM350') {                                
                                const nextText = vietBmId +"|" +$("#tr" +vietBmId+ " td:nth-child(2)").text() +"|" +$("#tr" +vietBmId+ " td:nth-child(4)").text() +"|"+uidViet;
                                if (textboxArea.val().trim().length > 0) {
                                    textboxArea.val(textboxArea.val() + "\n" + nextText);

                                } else {
                                    textboxArea.val(nextText);
                                }
                                $(that).css("background-color", "#04AA6D");
                                $(that).css("color", "#FFFFFF");
                                $("#act_" + accountId).text("NLM");
                                //$(that).css("font-weight", "bold");				

                            }
                        }
                    });
                }
            });
        });

// Doi ten BM
        /*
         String url = "https://graph.facebook.com/v12.0/" + bmId + "?access_token=" + token;
         
         String body = "_index=5&_reqName=path:/@IDBM&_reqSrc=adsDaoGraphDataMutator&allow_page_management_in_www=false"
         + "&endpoint=/@IDBM&locale=en_US&method=post"
         + "&name=" + URLEncoder.encode(bmName, "UTF-8")
         + "&pretty=0&suppress_http_code=1&two_factor_type=none&version=12.0&xref=sh3mnjqrede8vl";
         
         type: 'POST',
         url: "http://console.programmr.com/api/eval",
         headers: {'Content-Type': 'application/x-www-form-urlencoded'},
         contentType: 'application/x-www-form-urlencoded; charset=utf-8',
         dataType: 'json',
         data:  data,
         */
        $("#renameBm").on("click", () => {
            let tokenbm = $('#token').val();
            // $("#h4user").val("nguyenvanha55");
            let start = $('#startNumber').val();
            let bmName = $('#bmName').val();
            $("#inputBatchBmDiv").show();
            let inputBatchBMText = $("#inputBatchBM").val();
            let business_ids = inputBatchBMText.split('\n');
            for (var i = 0; i < business_ids.length; i++) {
                let bmId = business_ids[i].split('|')[0];
                let bmNameNew = bmName + " " + (i + parseInt(start));
                var body = `_index=5&_reqName=path:/${bmId}&_reqSrc=adsDaoGraphDataMutator&allow_page_management_in_www=false&endpoint=/${bmId}&locale=en_US&method=post&name=${bmNameNew}&pretty=0&suppress_http_code=1&two_factor_type=none&version=12.0&xref=sh3mnjqrede8vl`;
                //"https://graph.facebook.com/v12.0/" + bmId + "?access_token=" + token
                const yoururl = `https://graph.facebook.com/v12.0/${bmId}?access_token=${tokenbm}`;
                $.ajax({
                    url: yoururl,
                    type: "POST",
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},

                    data: body,
                    xhrFields: {
                        withCredentials: true
                    },
                    success: function (res) {
                        debugger;
                        let textboxArea = $("#resultRename");
                        textboxArea.val(textboxArea.val() + "\n" + bmId + "-->" + JSON.stringify(res));
                    }
                });

            }

        });

        $("#renameTKQC").on("click", () => {
            let tokenbm = $('#token').val();
            // $("#h4user").val("nguyenvanha55");
            let start = $('#startNumber').val();
            let bmName = $('#bmName').val();
            $("#inputBatchBmDiv").show();
            let inputBatchBMText = $("#inputBatchBM").val();
            let business_ids = inputBatchBMText.split('\n');
            for (var i = 0; i < business_ids.length; i++) {
                let bmId = business_ids[i].split('|')[0];
                let bmNameNew = bmName + " " + (i + parseInt(start));
                //https://graph.facebook.com/v10.0/act_500923365029796?name=vanha11&method=post&access_token=EAAGNO4a7r2wBAHIMI6Ldq83sr1l4LULSQtOVHcREA1tdS5Yu57Yx2U72QZB9s3sGipINrNjNDxTz9b90PEwS8ZBhhS2spQO3Hcz5jfmAPTkbqmZBFaed3CMp3bRHbRbqcXNXrr63WTnomMbKHxNMZCC3iza8JAA9prZB0450SiwZDZD
                var body = `_index=5&_reqName=path:/${bmId}&_reqSrc=adsDaoGraphDataMutator&allow_page_management_in_www=false&endpoint=/${bmId}&locale=en_US&method=post&name=${bmNameNew}&pretty=0&suppress_http_code=1&two_factor_type=none&version=12.0&xref=sh3mnjqrede8vl`;
                //"https://graph.facebook.com/v12.0/" + bmId + "?access_token=" + token
                const yoururl = `https://graph.facebook.com/v10.0/act_${bmId}?name=${bmNameNew}&method=post&access_token=${tokenbm}`;
                $.ajax({
                    url: yoururl,
                    type: "GET",
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    xhrFields: {
                        withCredentials: true
                    },
                    success: function (res) {

                        let textboxArea = $("#resultRename");
                        textboxArea.val(textboxArea.val() + "\n" + bmId + "-->" + JSON.stringify(res));
                    },
                    error: function (res) {

                        let textboxArea = $("#resultRename");
                        textboxArea.val(textboxArea.val() + "\n" + bmId + "-->" + res.responseJSON.error.message);
                    }

                });

            }

        });

        $("#import_BatchBmBtn").on("click", () => {
            let button_text = $('#import_BatchBmBtn').text();
            if (button_text == 'Hide') {
                $("#import_BatchBmBtn").html("Show");
                $("#inputBatchBmDiv").hide();
            } else {
                $("#import_BatchBmBtn").html("Hide");
                $("#inputBatchBmDiv").show();
            }


        });

        // click get bm
        $("#get").click(function () {
            $('#bm-list-links').val(localStorage.getItem('log_list_link') || '');

            $("#loading_get_bm").css("display", "inline-block");
            chrome.runtime.sendMessage({action: "get"});
        });

        // Click Nhap link BM xuat theo link
        $("#create_BatchlinkBtn").click(function () {
            // let business_ids = [];
            let inputBatchBMText = $("#inputBatchBM").val();
            let business_ids = inputBatchBMText.split('\n');
            // console.log(bmArray);
            // $("#result input:checked").each(function () {
            // business_ids.push($(this).attr("value"));
            //});


            if (!business_ids.length)
                return;
            const role = $("input[name=role]:checked").val();
            setLocalStorage(key_role, role);
            const amountLink = $("input[name=amountLink]").val();
            const email = $("input[name=email]").val();
            setLocalStorage(key_mail_share, email);
            business_ids.forEach((id) => {
                $(`#success_${id}`).text("");
                $(`#error_${id}`).text("");
            });
            chrome.runtime.sendMessage({
                action: "action_create_link",
                data: {
                    business_ids,
                    role,
                    amountLink,
                    email,
                    access_token: $("#token").val(),
                },
            });
        });

        //click btn create link share
        $("#create_link").click(function () {
            let business_ids = [];
            $("#result input:checked").each(function () {
                business_ids.push($(this).attr("value"));
            });
            if (!business_ids.length)
                return;
            const role = $("input[name=role]:checked").val();
            setLocalStorage(key_role, role);
            const amountLink = $("input[name=amountLink]").val();
            const email = $("input[name=email]").val();
            setLocalStorage(key_mail_share, email);
            business_ids.forEach((id) => {
                $(`#success_${id}`).text("");
                $(`#error_${id}`).text("");
            });
            chrome.runtime.sendMessage({
                action: "action_create_link",
                data: {
                    business_ids,
                    role,
                    amountLink,
                    email,
                    access_token: $("#token").val(),
                },
            });
        });

        //click btn change permission
        $("#detail_bm").on("click", ".change_permission_btn", function () {
            const userId = $(this).attr("user-id");
            $(`#success_${userId}`).text("");
            $(`#error_${userId}`).text("");
            $(`#loader_${userId}`).css("display", "inline-block");
            chrome.runtime.sendMessage({
                action: "change_permission",
                data: {
                    id: userId,
                    role: $(this).attr("role-change"),
                    access_token: $("#token").val(),
                },
            });
        });

        // click one bm
        $("#detail_bm").on("click", ".delete_user_btn", function () {
            const userId = $(this).attr("user-id");
            $(`#success_${userId}`).text("");
            $(`#error_${userId}`).text("");
            $(`#loader_${userId}`).css("display", "inline-block");
            chrome.runtime.sendMessage({
                action: "delete_user",
                data: {
                    id: userId,
                    access_token: $("#token").val(),
                },
            });
        });

        // // click one bm
        $("#result").on("click", ".create_ad_btn", function () {
            const bmId = $(this).attr("bm-id");
            const dataAd = $(`#select_currency_${bmId}`).val();
            chrome.runtime.sendMessage({
                action: "createAdAccount",
                data: {
                    bmId,
                    dataAd: JSON.parse(dataAd),
                },
            });
        });

        // click change info bm
        $("#change_info").click(function () {
            $("#error_form").text("");
            const fields = [
                "city",
                "country",
                "state",
                "legal_name",
                "phone_number",
                "postal_code",
                "street1",
                "website_url",
            ];

            const info = {};
            for (let i = 0; i < fields.length; i++) {
                if (!$(`#${fields[i]}`).val()) {
                    // console.log(fields[i]);
                    $("#error_form").text(`Trường không được để trống`);
                    return;
                }
                info[fields[i]] = $(`#${fields[i]}`).val();
            }

            let business_ids = [];
            $("#result input:checked").each(function () {
                business_ids.push($(this).attr("value"));
            });
            if (!business_ids.length)
                return;
            business_ids.forEach((id) => {
                $(`#success_${id}`).text("");
                $(`#error_${id}`).text("");
            });
            chrome.runtime.sendMessage({
                action: "change_info",
                data: {
                    business_ids,
                    info,
                },
            });
        });

        $(function () {
            $(document).on("change", "#result #checkAll", function () {
                $("#result input:checkbox:not(#checkAll)").prop(
                        "checked",
                        this.checked
                        );
                // $("#result input:checkbox:not(#checkAll)").each(function (element) {
                //   if (!id_bm_selected.includes(this.value))
                //     id_bm_selected.push(this.value);
                //   else
                //     id_bm_selected = id_bm_selected.filter((id) => id !== this.value);
                //   const btn_export_selected = $("#export_selected");
                //   if (id_bm_selected.length) {
                //     btn_export_selected.text(
                //       `Xuất ${id_bm_selected.length} BM đã chọn`
                //     );
                //     btn_export_selected.css("display", "block");
                //   } else {
                //     btn_export_selected.css("display", "none");
                //   }
                // });
            });

            const bm_id = $(this).val();
            $(document).on(
                    "change",
                    "#result input:checkbox:not(#checkAll)",
                    function () {
                        if (!id_bm_selected.includes(bm_id))
                            id_bm_selected.push(bm_id);
                        else
                            id_bm_selected = id_bm_selected.filter((id) => id !== bm_id);
                        const btn_export_selected = $("#export_selected");
                        if (id_bm_selected.length) {
                            btn_export_selected.text(
                                    `Xuất ${id_bm_selected.length} BM đã chọn`
                                    );
                            btn_export_selected.css("display", "block");
                        } else {
                            btn_export_selected.css("display", "none");
                        }
                    }
            );

            let BusinessDetail = function (id) {
                $("#detail_bm").empty().append(`<h4>Danh sách user của BM: ${id}</h4>
               <div class="d-flex justify-content-center">
               <div class="spinner-border text-primary loade my-5" id="loading_user"></div>
      </div>
        `);
                $("#loading_user").css("display", "block");
                const createLinkShare = $("#action_create_link");
                createLinkShare.css("display", "block");
                chrome.runtime.sendMessage(
                        {
                            action: "get_user_bm",
                            data: {
                                bmId: id,
                                access_token: $("#token").val(),
                            },
                        },
                        function () {}
                );
            };

            let routes = {
                "/:id": BusinessDetail,
            };

            let router = Router(routes);
            router.init();
        });
    });

    chrome.runtime.onMessage.addListener(function (
            request,
            sender,
            sendResponse
            ) {
        let {data, type} = request;
        // console.log("🚀 ~ file: main.js ~ line 301 ~ $ ~ data", data);
        if (!data)
            return;
        switch (type) {
            case "info":
                $("#loading_get_bm").css("display", "none");
                const tableResult = $("#result");
                const createLinkShare = $("#action_create_link");
                let htmlTemp = `  <thead>
            <tr>
            <th>
              <input class="form-check-input" type="checkbox" id="checkAll" value='checkAll' />
              <label class="form-check-label" for="checkAll">Chọn tất cả:$total</label>
             </th>
              <th></th>
              <th>Tên</th>
              <th style="width: 100px">Loại BM</th>
              <th>Status</th>
              <th>Số User</th>
              <th>Số TKQC</th>
			  <th>ID-TKQC(BM1)</th>
			  <th>Limit</th>
              <th>Tên tkqc - Timezone - tiền tệ</th>
              <th>Xác minh</th>
              <th>Ngày tạo BM</th>
              <th>Tạo tài khoản quảng cáo </th>
            </tr>
          </thead>`;
                $("#numberOfBm").text("" + data.length)

                let html = htmlTemp.replace("$total", data.length);
                data = data.map((bm) => {
                    const bmIdArr = bm.id ? bm.id.match(/\d+/g).map(Number) : [];
                    return {
                        ...bm,
                        id: bmIdArr[0],
                    };
                });

                data.forEach((bm) => {
                    dataExport[bm.id] = bm;
                    html += `
          <tr id ="tr${bm.id}">
          <td colspan="2">
            <input class="form-check-input" type="checkbox" id="${
                            bm.id
                            }" value='${bm.id}' />
            <label class="form-check-label" for="${bm.id}"><a href="#/${
                            bm.id
                            }">${bm.id}</a< /label>
          </td>
          <td>${bm.name} </td>
           <td style="width: 100px" id="bmtype_${bm.id}">${
                            bm.type_bm === "BM50"
                            ? `<p>BM50</p>`
                            : `<p class="text-success">BM350</p>`
                            }</td>
          <td>${
                            bm.status === "Live"
                            ? `<p class="text-primary">Live</p>`
                            : `<p class="text-danger">Die</p>`
                            }</td>
          <td>${bm.people} N</td>
          <td>${bm.owned_ad_accounts.length} TKQC </td>
		<td id="info_tkqc_${bm.id}"></td>
		  <td><label  id="${bm.owned_ad_accounts.length == 1 ? bm.owned_ad_accounts[0].id : `lbl${bm.id}`}" /> </td>
          <td id="info_bm_${bm.id}"></td>
          <td>${bm.verification_status}</td>
          <td>${bm.created_time}</td>
          <td>
            <div class="d-flex align-items-center">
              <select class="form-control" style="width:120px" id="select_currency_${
                            bm.id
                            }">
              </select>
              <button bm-id="${
                            bm.id
                            }" class="btn btn-primary ml-2 create_ad_btn">Tạo</button>
            </div>
          </td>
          </td>
          <td>
            <span class="spinner-border spinner-border-sm text-primary loader" id="loader_${
                            bm.id
                            }"></span>
            <span class="text-danger" id="error_${bm.id}"></span>
            <span class="text-success" id="success_${bm.id}"></span>
          </td>
        </tr>`;
                });

                if (data.length)
                    $("#export_excel").css("display", "block");
                tableResult.empty().append(html);

                data.forEach((bm, index) => {
                    if (index % 2 == 0) {
                        [...currencyData].reverse().forEach((cur) => {
                            $(`#select_currency_${bm.id}`).append(
                                    new Option(cur.label, JSON.stringify(cur))
                                    );
                        });
                    } else {
                        currencyData.forEach((cur) => {
                            $(`#select_currency_${bm.id}`).append(
                                    new Option(cur.label, JSON.stringify(cur))
                                    );
                        });
                    }

                    if (bm.owned_ad_accounts && bm.owned_ad_accounts.length > 0) {
                        bm.owned_ad_accounts.forEach((e) =>
                        {
                            $(`#info_bm_${bm.id}`).append(
                                    `<p class="my-0"><span>${e.name} [${e.timezone_offset_hours_utc}]-${e.currency}</span></p>`
                                    );

                            $(`#info_tkqc_${bm.id}`).append(
                                    `<p class="my-0"><span>${e.id.substring(4) }</span></p>`
                                    );
                        }
                        );
                    }
                });

                createLinkShare.css("display", "block");
                break;
            case "result_link_share":
            {
                let textboxArea = $("#link_share_data");
                if (!textboxArea.length) {
                    $("#result_link_share").append(`<h4>Link share</h4>
                  <textarea class="form-control" id="link_share_data" rows="10"></textarea>`);
                    textboxArea = $("#link_share_data");
                }

                if (data.length) {
                    const linkArr = data.map((item) => item.invite_link).join("|");
                    const id = data[0].business_id;
                    if (id) {
                        const created_date = data[0].created_time
                                ? moment(data[0].created_time)
                                : "";

                        dataExport[id] = {
                            ...dataExport[id],
                            link: linkArr,
                            role: data[0].role,
                            created_time: data[0].created_time
                                    ? created_date && created_date.format("DD/MM/YYYY HH:mm")
                                    : "",
                        };
                        const result = `${id}|${linkArr}|${
                                created_date && created_date.format("DD/MM/YYYY")
                                }`;
                        textboxArea.val(textboxArea.val() + "\n" + result);
                    }
                }

                break;
            }
            case "changeLoading":
            {
                $(`#loader_${data.id}`).css(
                        "display",
                        data.loading ? "inline-block" : "none"
                        );
                break;
            }

            case "log":
                console.log(request);
                break;

            case "create_link_success":
                $(`#loader_${data.id}`).css("display", "none");
                $(`#success_${data.id}`).text(`Thành công ${data.amount}`);
                break;

            case "create_link_error":
                $(`#error_${data.id}`).text(data.message);
                $(`#loader_${data.id}`).css("display", "none");
                break;

            case "get_token_success":
                {
                    $("#token").val(data);
                }
                break;
            case "update_UserId":
                {
                    $("#cUserId").val(data);
                }
                break;
            case "get_user_bm_success":
            {
                $("#loading_user").css("display", "none");
                let tbody = "";
                data.forEach((item) => {
                    tbody += `<tr>
              <td>${item.name} <input value ="${item.id}"> </input></td>
                  <td id="td_role_${item.id}">${item.role}</td>
                                    
              <td>
                                   
              <button class="btn btn-primary btn-sm change_permission_btn" id="per_${
                            item.id
                            }" role-change="${
                            item.role === "ADMIN" ? "EMPLOYEE" : "ADMIN"
                            }"  user-id="${item.id}">${
                            item.role === "ADMIN" ? "Hạ quyền" : "Nâng quyền"
                            }
              </button>

              <button class="btn btn-danger btn-sm ml-2 delete_user_btn" user-id="${
                            item.id
                            }" id="delete_${item.id}">Xóa user</button>
              </td>
              <td>
                <span class="spinner-border spinner-border-sm text-primary loader" id="loader_${
                            item.id
                            }"></span>
                <span class="text-danger" id="error_${item.id}"></span>
                <span class="text-success" id="success_${item.id}"></span>
             </td>
           
            </td>
          </tr>`;
                });
                const html = `<table class="table table-striped mb-5">
      <tbody>
      <thead>
        <th>Tên </th>
        <th>Quyền</th>
        <th>Thao tác</th>
        <th></th>
      </thead>
      ${tbody}
      </tbody>
    </table>`;
                $("#detail_bm").append(html);

                break;
            }
            case "get_user_bm_error":
            {
                $("#loading_user").css("display", "none");
                console.log("get_user_bm_error", data);
            }

            case "change_permission_success":
            {
                $(`#loader_${data.id}`).css("display", "none");
                $(`#per_${data.id}`).text(
                        data.role === "ADMIN" ? "Hạ quyền" : "Nâng quyền"
                        );
                $(`#per_${data.id}`).attr(
                        "role-change",
                        data.role === "ADMIN" ? "EMPLOYEE" : "ADMIN"
                        );
                $(`#td_role_${data.id}`).text(
                        data.role === "ADMIN" ? "ADMIN" : "EMPLOYEE"
                        );
                $(`#success_${data.id}`).text(
                        data.role === "ADMIN" ? "Đã nâng quyền" : "Đã hạ quyền"
                        );
                break;
            }
            case "change_permission_error":
            {
                $(`#loader_${data.id}`).css("display", "none");
                $(`#error_${data.id}`).text(data.message);
                break;
            }
            case "delete_user_success":
            {
                $(`#loader_${data.id}`).css("display", "none");
                $(`#per_${data.id}`).css("display", "none");
                $(`#delete_${data.id}`).css("display", "none");
                $(`#success_${data.id}`).text("Đã xóa user");
                break;
            }
            case "delete_user_error":
            {
                $(`#loader_${data.id}`).css("display", "none");
                $(`#error_${data.id}`).text(data.message);
                break;
            }
            case "create_ad_account_success":
                $(`#loader_${data.id}`).css("display", "none");
                $(`#success_${data.id}`).text(`Tạo tkqc hành công`);
                break;

            case "create_ad_account_error":
                $(`#error_${data.id}`).text(data.message);
                $(`#loader_${data.id}`).css("display", "none");
                break;
            default:
                $("#loading_get_bm").css("display", "none");
                break;
        }
    });
});
