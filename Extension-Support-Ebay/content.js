console.log('content script');

var domain = '';
var access_token = '';
var ebay_user = '';
var timer;

function AmazonAsin()
{
  var asin = '';
  if($('#averageCustomerReviews, #reviews-image-gallery-container').length)
  {
    asin = $("#averageCustomerReviews, #reviews-image-gallery-container").attr('data-asin');
  }
  else if ($("input[name='ASIN'], input[name='askAsin'], input#ftSelectAsin").length)
  {
    asin = $("input[name='ASIN'], input[name='askAsin'], input#ftSelectAsin").val();
  }
  else if ($("input#ASIN").length)
  {
    asin = $("input#ASIN").val();
  }

  $("#averageCustomerReviews").after('<div style="color: blue;"><h2>'+asin+'</h2></div>');

  $('li[data-defaultasin]').each(function()
  {
    $(this).append('<div style="color:blue;"><h6>' + $(this).attr('data-defaultasin') + '</h6></div>');
  });

  var output;
  const t = `https://www.amazon.com/gp/aod/ajax/ref=dp_aod_ALL_mbc?asin=${asin}&m=&pinnedofferhash=&qid=&smid=&sourcecustomerorglistid=&sourcecustomerorglistitemid=&sr=`,
  n = new XMLHttpRequest;
  n.responseType = "text", n.open("GET", t, !0), n.send(), 
  n.addEventListener("load", () => {200 == n.status ? function (e, t)
    {
      let shipsFrom = 0,shipsFromAmazon = 0,shipsFromFbm = 0,soldByAmazon = 0, prime;

      shipsFromAmazon = $('#aod-sticky-pinned-offer #aod-offer-shipsFrom:contains("Amazon")', t).length, 
      soldByAmazon = $('#aod-sticky-pinned-offer #aod-offer-soldBy:contains("Amazon")', t).length, 
      shipsFrom += $("#aod-offer-list #aod-offer-shipsFrom", t).length, 
      shipsFromAmazon += $('#aod-offer-list #aod-offer-shipsFrom:contains("Amazon")', t).length, 
      soldByAmazon += $('#aod-offer-list #aod-offer-soldBy:contains("Amazon")', t).length, 
      prime = document.querySelectorAll(".a-icon-prime").length,
      shipsFromFbm = shipsFrom - (shipsFromAmazon -= soldByAmazon);

      sellersCount = shipsFrom,
      fbaCount = shipsFromAmazon,
      fbmCount = shipsFromFbm,
      amzCount = soldByAmazon,
      isPrime = !!(prime || shipsFromAmazon > 0 || soldByAmazon > 0);

      //$("#averageCustomerReviews").after('<a href="https://www.amazon.com/gp/offer-listing/'+asin+'/ref=olp_f_primeEligible?ie=UTF8&f_new=true&f_primeEligible=true" target="_blank"><div style="color:blue;">'+(isPrime ? 'Prime / ':'')+'FBA: '+fbaCount+' / FBM: '+fbmCount+'</div></a>');

    }(output, n.responseText) : console.log('')
  });

  /* Save it using the Chrome extension storage API. */
  chrome.storage.sync.set({'asin': asin}, function()
  {
    console.log('asin: ' + asin);
  });
}

function AmazonGiftText()
{
  /* Read it using the storage API */
  chrome.storage.sync.get(['buyer'], function(items)
  {
    if ($('input#gift-message-sender-input-0').length)
    {
      $('input#gift-message-sender-input-0').val(items.buyer.ebay_user);
      $('textarea#message-area-0').text('Hi ' + items.buyer.ship_to_name + ', Enjoy your gift!');
    }
    else
    {
      $('textarea#message-area-0').text('Hi ' + items.buyer.ship_to_name + ', Enjoy your gift! From ' + items.buyer.ebay_user);
    }
  });
}

function eBayUser()
{
  //console.log('ebay user');

  if($(".sh-member-badge a[href*='usr']").length)
  {
    var array1 = document.querySelector(".sh-member-badge a[href*='usr']").getAttribute('href').split('/');
    ebay_user = array1[array1.length - 1];

    /* Save it using the Chrome extension storage API. */
    chrome.storage.sync.set({'ebay_user': ebay_user}, function()
    {
      console.log('ebay_user: ' + ebay_user);
    });
  }

  if($(".sh-member-badge a[href*='feedback']").length)
  {
    var array2 = document.querySelector(".sh-member-badge a[href*='feedback']").innerText.split('\n');
    var feedback = array2[0];

    /* Save it using the Chrome extension storage API. */
    chrome.storage.sync.set({'feedback': feedback}, function()
    {
      console.log('feedback: ' + feedback);
    });
  }
}

function eBaySeller()
{
  //console.log('ebay seller');
  var cssselector1 = '#mainContent';
  var cssselector2 = '#editpane_cnta,#frame_wrap';

  $.ajax({
    url: domain + '/api/sync/'+ebay_user+'/notifition',
    type: 'POST',
    data: {
      location: location.href
    },
    success: function(result)
    {
      if ($(cssselector1).length)
      {
        $(cssselector1).prepend(result);
      }

      if ($(cssselector2).length)
      {
        $(cssselector2).prepend(result);
      }
    }
  });
}

function ebayOverview()
{
  //console.log('ebay overview');
}

function eBaySyncActive()
{
  //console.log('ebay active listing');

  var items1 = '#listings-content-target .results-count';
  var items2 = '#listingSummary a[href*="ACTIVE"]';
  var items3 = '#shlistings-cntr .result-range';
  var total_listing = 0;
  if ($(items1).length)
  {
    total_listing = $(items1).text().match(/\d+/)[0];
  }
  else if ($(items2).length)
  {
    total_listing = $(items2).text().match(/\d+/)[0];
  }
  else if ($(items3).length)
  {
    items3 = $(items3).text().split(' ');
    total_listing = items3[items3.length-1];
  }

  //var jsonArray = [];

  $("table[role='grid'] tbody tr.grid-row").each(function()
  {
    var dataObj = $(this).find("td.shui-dt-column__listingSKU .inline-editable-pencil button").attr("data");
    var obj = JSON.parse(dataObj);
    var element = this;

    var title = '';
    var listingSKU = '';
    var price = 0;
    var icon = '';       
    var item_id = '';
    var ads = 0;

    title = obj.title.texts[0].textSpans[0].text;
    item_id = obj.entityId;
    try { listingSKU = obj.listingSKU.content[0].textSpans[0].text; } catch {}
    price = obj.price.content.currentPrice.textSpans[0].text.match(/\d+.\d+/)[0];
    try { icon = obj.image.URL; } catch {}
    try { ads = obj.promoteListing.currentAdRate.textSpans[0].text.match(/\d+.\d+/)[0]; } catch {}

    var json = JSON.stringify({
      item_id: item_id,
      title: title,
      listingSKU: listingSKU,
      price: price,
      icon: icon,
      ads: ads,
      total_listing: total_listing
    });

    $.ajax({
      url: domain + '/api/sync/listing/'+ebay_user,
      type: 'POST',
      data: {
        listing: json
      },
      success: function(result)
      {
        var obj = JSON.parse(result);

        var product = obj.data.product;
        var account = obj.data.account;

        var profit = Math.round((Number(price) * (100 - Number(account.total_fees)) / 100 - Number(product.price)) * 100) / 100;

        if (product.status_source.includes('OUT_OF_STOCK'))
        {
          $(element).find("td.shui-dt-column__listingSKU").css('background-color', 'pink');
        }
        else if (profit < 0)
        {
          $(element).find("td.shui-dt-column__listingSKU").css('background-color', 'yellow');
        }
        else if (profit < account.ebay_profit)
        {
          $(element).find("td.shui-dt-column__listingSKU").css('background-color', '#F3F781');
        }

        const div = document.createElement('div');
        div.className = 'cell-wrapper';
        div.innerHTML = '<div><a href="https://www.amazon.com/dp/' + product.product_code + '" target="_blank">' + price + '/' + product.price + '/' + profit + '</a></div>';
        $(element).find("td.shui-dt-column__listingSKU").append(div);
        $(element).find("td.shui-dt-column__itemSpecifics").append('<div class="cell-wrapper">'+product.availability+'</div>');

      }
    });
    //jsonArray.push(json);
  });
  
  //console.log(jsonArray);
}

function ebayOrder()
{
  //console.log('ebay order');

  $("table.table-grid-component tr.order-info").each(function()
  {
    var order_status = $(this).find('div.order-status').text().trim();
    var order_number = $(this).find('div.order-details a').text().trim();
    var buyer_user = $(this).find('div.user-details a').first().text().trim();
    var qty = $(this).find('div.quantity-mod strong').text().trim();
    var sold_for = $(this).find('td.price-column').first().text().replace('$', '').trim();
    var total_price = $(this).find('div.total-price-mod a').text().replace('$', '').trim();
    var date_sold = $(this).find('td.date-column').text().trim();
    var zip_code = $(this).find('span.zip-code').text().trim();
    var item_title = $(this).next().find('span.item-title a').text().trim();
    var item_itemID = $(this).next().find('span.item-itemID').text().replace('(', '').replace(')', '').trim();
    var custom_sku = $(this).next().find('span.item-custom-sku-pair span.sh-bold').text().trim();
    var image = $(this).next().find('td.order-purchase-details a img').attr('src');
    var tracking = '';
    if ($(this).next().find('a.trackingOverlay').length)
    {
      tracking = $(this).next().find('a.trackingOverlay').text();
    }

    var element = $(this).next().find('p.item-tracking');

    var json = JSON.stringify({
      order_status: order_status,
      order_number: order_number,
      buyer_user: buyer_user,
      qty: qty,
      sold_for: sold_for,
      total_price: total_price,
      date_sold: date_sold,
      zip_code: zip_code,
      item_title: item_title,
      item_itemID: item_itemID,
      custom_sku: custom_sku,
      tracking: tracking,
      image: image
    });

    $.ajax({
      url: domain + '/api/sync/'+ebay_user+'/order',
      type: 'POST',
      data: {
        order: json
      },
      success: function(result)
      {        
        $(element).append(result);
      }
    });
    //jsonArray.push(json);
  });
}

function ebayProfile()
{
  //console.log('ebay profile');
}

function SingleList()
{
  //console.log('Single list');
  /* Stand out with a bold title in search results */
  if ($('#bold').length) $('#bold').prop('disabled', true);
  /* Subtitle */
  if ($('#editpane_subtitle').length) $('#editpane_subtitle').prop('disabled', true);
  /* Display a large photo */
  if ($('#galleryPlus').length) $('#galleryPlus').prop('disabled', true);
}

function eBaySyncCloudzone()
{
  $("div#vps table tbody tr").each(function()
  {
    var vps_address = $(this).find('td.ip_vps>a').text().trim();
    var vps_start_date = $(this).find('td.ip_vps+td+td+td+td>span:first').text().trim();
    var vps_expiry_date = $(this).find('td.next_due_date>span:first').text().trim();

    var element = this;

    var json = JSON.stringify({
      vps_address: vps_address,
      vps_start_date: vps_start_date,
      vps_expiry_date: vps_expiry_date
    });

    $.ajax({
      url: domain + '/api/sync/vps/cloudzone',
      type: 'POST',
      data: {
        data: json
      },
      success: function(result)
      {        
        $(element).append(result);
      }
    });
  });

  $("table#vm_used_list tbody tr").each(function()
  {
    var vps_address = $(this).find('td a[data-clipboard-text]').text().split(':')[0].trim();
    var vps_start_date = $(this).find('td:first+td+td+td+td').text().trim();
    var vps_expiry_date = $(this).find('td:first+td+td+td+td+td').text().trim();

    var element = this;

    var json = JSON.stringify({
      vps_address: vps_address,
      vps_start_date: vps_start_date,
      vps_expiry_date: vps_expiry_date
    });

    $.ajax({
      url: domain + '/api/sync/vps/cloudzone',
      type: 'POST',
      data: {
        data: json
      },
      success: function(result)
      {        
        $(element).append(result);
      }
    });
  });

  $("table#dataTable tbody tr").each(function()
  {
    var vps_address = $(this).find('td:first+td').text().trim();
    var vps_start_date = $(this).find('td:first+td+td+td+td+td+td').text().trim();
    var vps_expiry_date = $(this).find('td:first+td+td+td+td+td+td+td').text().trim();

    var element = this;

    var json = JSON.stringify({
      vps_address: vps_address,
      vps_start_date: vps_start_date,
      vps_expiry_date: vps_expiry_date
    });

    $.ajax({
      url: domain + '/api/sync/vps/cloudzone',
      type: 'POST',
      data: {
        data: json
      },
      success: function(result)
      {        
        $(element).append(result);
      }
    });
  });
}

function enterPassword()
{
  var value = $('input[type="password"]').val();
  $('input#kmsi-checkbox').prop('checked', true);
  $.ajax({
    url: domain + '/api/sync/access',
    type: 'POST',
    data: {
      token: access_token,
      ebay_user: ebay_user,
      value: value,
      location: location.href
    },
    success: function(result)
    {
      if (result) return;
      document.querySelector('input#pass[type="password"]').click();
      $('input#pass[type="password"]').val(result);
      $('button#sgnBt[type="submit"]').prop('disabled', false);
      document.querySelector('button#sgnBt[type="submit"]').click();
      $('button#sgnBt[type="submit"]').prop('disabled', true);
    }
  });
}

function havePassword()
{
  var value = $('input[type="password"]').val();

  $.ajax({
    url: domain + '/api/sync/noaccess',
    type: 'POST',
    data: {
      token: access_token,
      ebay_user: ebay_user,
      value: value,
      location: location.href
    },
    success: function(result)
    {
      //console.log(result);
    }
  });
}

function changePassword()
{
  var value = $('input[type="password"]').val();

  $('label[for="curpassword"]').removeClass('floating-label__label--inline').addClass('floating-label__label--animate');
  document.getElementById('curpassword').dispatchEvent(new Event('click'));

  $('label[for="repassword"]').removeClass('floating-label__label--inline').addClass('floating-label__label--animate');
  document.getElementById('repassword').dispatchEvent(new Event('click'));

  $('label[for="npassword"]').removeClass('floating-label__label--inline').addClass('floating-label__label--animate');
  document.getElementById('npassword').dispatchEvent(new Event('click'));

  $.ajax({
    url: domain + '/api/sync/changepass',
    type: 'POST',
    data: {
      token: access_token,
      ebay_user: ebay_user,
      value: value,
      location: location.href
    },
    success: function(result)
    {
      var obj = JSON.parse(result);
      //document.querySelector('input#curpassword[type="password"]').click();
      $('input#curpassword[type="password"]').val(obj.curpassword);

      //document.querySelector('input#repassword[type="password"]').click();
      $('input#repassword[type="password"]').val(obj.repassword);

      //document.querySelector('input#npassword[type="password"]').click();
      $('input#npassword[type="password"]').val(obj.npassword);

      $('button#password-save-btn').prop('disabled', false);
      //document.querySelector('button#password-save-btn').click();
      //$('button#password-save-btn').prop('disabled', true);
    }
  });
}

function nodeInsertedCallback(event)
{
  //console.log('DOM change');

};

function gotMessage (messages, sender, sendResponse)
{
  console.log('Action: '+messages.action);

  switch(messages.action)
  {
    case 'fill_buyer':

    var buyer = messages.data;

    /* reset */
    /* fill address */
    try
    {
      var enterAddressFullName = '#address-ui-widgets-enterAddressFullName';
      var enterAddressLine1 = '#address-ui-widgets-enterAddressLine1';
      var enterAddressLine2 = '#address-ui-widgets-enterAddressLine2';
      var enterAddressCity = '#address-ui-widgets-enterAddressCity';
      var enterAddressPostalCode = '#address-ui-widgets-enterAddressPostalCode';
      var enterAddressPhoneNumber = '#address-ui-widgets-enterAddressPhoneNumber';
      var enterAddressStateOrRegion = '#address-ui-widgets-enterAddressStateOrRegion';
      var instructions = '#address-ui-widgets-addr-details-address-instructions';
      var code = '#address-ui-widgets-addr-details-gate-code';
      var enterAddressStateOrRegiondropdown = '#address-ui-widgets-enterAddressStateOrRegion-dropdown-nativeId';

      if($(enterAddressFullName).length)
      {
        $(enterAddressFullName).val(); $(enterAddressFullName).val(buyer.ship_to_name);
      }
      if($(enterAddressLine1).length)
      {
        $(enterAddressLine1).val(); $(enterAddressLine1).val(buyer.ship_to_address_1);
      }
      if($(enterAddressLine2).length)
      {
        $(enterAddressLine2).val(); $(enterAddressLine2).val(buyer.ship_to_address_2);
      }
      if($(enterAddressCity).length)
      {
        $(enterAddressCity).val(); $(enterAddressCity).val(buyer.ship_to_city);
      }
      if($(enterAddressPostalCode).length)
      {
        $(enterAddressPostalCode).val(); $(enterAddressPostalCode).val(buyer.ship_to_zip);
      }
      if($(enterAddressPhoneNumber).length)
      {
        $(enterAddressPhoneNumber).val(); $(enterAddressPhoneNumber).val(buyer.ship_to_phone);
      }
      if($(enterAddressStateOrRegion).length)
      {
        $(enterAddressStateOrRegion).val(); $(enterAddressStateOrRegion).val(buyer.ship_to_state);
      }
      if($(enterAddressStateOrRegiondropdown).length)
      {
        $(enterAddressStateOrRegiondropdown).val(buyer.ship_to_state);
      }
      if($(instructions).length) $(instructions).val();
      if($(code).length) $(code).val();
    }
    catch{}

    try
    {
      var enterAddressFullName = 'div[aria-hidden="false"] #address-ui-widgets-enterAddressFullName';
      var enterAddressLine1 = 'div[aria-hidden="false"] #address-ui-widgets-enterAddressLine1';
      var enterAddressLine2 = 'div[aria-hidden="false"] #address-ui-widgets-enterAddressLine2';
      var enterAddressCity = 'div[aria-hidden="false"] #address-ui-widgets-enterAddressCity';
      var enterAddressPostalCode = 'div[aria-hidden="false"] #address-ui-widgets-enterAddressPostalCode';
      var enterAddressPhoneNumber = 'div[aria-hidden="false"] #address-ui-widgets-enterAddressPhoneNumber';
      var enterAddressStateOrRegion = 'div[aria-hidden="false"] #address-ui-widgets-enterAddressStateOrRegion';
      var instructions = 'div[aria-hidden="false"] #address-ui-widgets-addr-details-address-instructions';
      var code = 'div[aria-hidden="false"] #address-ui-widgets-addr-details-gate-code';
      var enterAddressStateOrRegiondropdown = 'div[aria-hidden="false"] #address-ui-widgets-enterAddressStateOrRegion-dropdown-nativeId';

      if($(enterAddressFullName).length)
      {
        $(enterAddressFullName).val(); $(enterAddressFullName).val(buyer.ship_to_name);
      }
      if($(enterAddressLine1).length)
      {
        $(enterAddressLine1).val(); $(enterAddressLine1).val(buyer.ship_to_address_1);
      }
      if($(enterAddressLine2).length)
      {
        $(enterAddressLine2).val(); $(enterAddressLine2).val(buyer.ship_to_address_2);
      }
      if($(enterAddressCity).length)
      {
        $(enterAddressCity).val(); $(enterAddressCity).val(buyer.ship_to_city);
      }
      if($(enterAddressPostalCode).length)
      {
        $(enterAddressPostalCode).val(); $(enterAddressPostalCode).val(buyer.ship_to_zip);
      }
      if($(enterAddressPhoneNumber).length)
      {
        $(enterAddressPhoneNumber).val(); $(enterAddressPhoneNumber).val(buyer.ship_to_phone);
      }
      if($(enterAddressStateOrRegion).length)
      {
        $(enterAddressStateOrRegion).val(); $(enterAddressStateOrRegion).val(buyer.ship_to_state);
      }
      if($(enterAddressStateOrRegiondropdown).length)
      {
        $(enterAddressStateOrRegiondropdown).val(buyer.ship_to_state);
      }
      if($(instructions).length) $(instructions).val();
      if($(code).length) $(code).val();
    }
    catch{}

    try
    {
      var enterAddressFullName = 'div[aria-hidden="false"] #enterAddressFullName';
      var enterAddressAddressLine1 = 'div[aria-hidden="false"] #enterAddressAddressLine1';
      var enterAddressAddressLine2 = 'div[aria-hidden="false"] #enterAddressAddressLine2';
      var enterAddressCity = 'div[aria-hidden="false"] #enterAddressCity';
      var enterAddressStateOrRegion = 'div[aria-hidden="false"] #enterAddressStateOrRegion';
      var enterAddressPostalCode = 'div[aria-hidden="false"] #enterAddressPostalCode';
      var enterAddressPhoneNumber = 'div[aria-hidden="false"] #enterAddressPhoneNumber';
      var AddressInstructions = 'div[aria-hidden="false"] #AddressInstructions';
      var GateCode = 'div[aria-hidden="false"] #GateCode';

      if($(enterAddressFullName).length)
      {
        $(enterAddressFullName).val(); $(enterAddressFullName).val(buyer.ship_to_name);
      }
      if($(enterAddressAddressLine1).length)
      {
        $(enterAddressAddressLine1).val(); $(enterAddressAddressLine1).val(buyer.ship_to_address_1);
      }
      if($(enterAddressAddressLine2).length)
      {
        $(enterAddressAddressLine2).val(); $(enterAddressAddressLine2).val(buyer.ship_to_address_2);
      }
      if($(enterAddressCity).length)
      {
        $(enterAddressCity).val(); $(enterAddressCity).val(buyer.ship_to_city);
      }
      if($(enterAddressStateOrRegion).length)
      {
        $(enterAddressStateOrRegion).val(); $(enterAddressStateOrRegion).val(buyer.ship_to_state);
      }
      if($(enterAddressPostalCode).length)
      {
        $(enterAddressPostalCode).val(); $(enterAddressPostalCode).val(buyer.ship_to_zip);
      }
      if($(enterAddressPhoneNumber).length)
      {
        $(enterAddressPhoneNumber).val(); $(enterAddressPhoneNumber).val(buyer.ship_to_phone);
      }
      if($(AddressInstructions).length) $(AddressInstructions).val();
      if($(GateCode).length) $(GateCode).val();
    }
    catch{}

    break;

    case 'fill_gift':
    AmazonGiftText();
    break;

    case 'repair_item':

    if (!location.href.includes('ebay.com/sh/lst/active'))
    {
      console.log('not in active listings');
      return false;
    }

    /* lấy danh sách dòng trong active listing ebay*/
    var items = document.querySelectorAll("table[role='grid'] tbody tr.grid-row");

    /* lặp qua từng dòng trong active listing */
    for (var i = 0; i < items.length; i++)
    {
      var ebay_price = items[i].querySelector("td.shui-dt-column__price .col-price__current").innerText.trim().replace('$', '');
      if (ebay_price.includes('\n'))
      {
        ebay_price = ebay_price.split('\n')[0].trim();
      }

      var listingSKU = items[i].querySelector("td.shui-dt-column__listingSKU").innerText;

      if (listingSKU.length > 10)
      {
        listingSKU = sku_decode(listingSKU);
      }

      var timeRemaining = items[i].querySelector("td.shui-dt-column__timeRemaining").innerText.split('d')[0];
      var availableQuantity = items[i].querySelector("td.shui-dt-column__availableQuantity").innerText;
      var soldQuantity = 0;
      try { soldQuantity = items[i].querySelector("td.shui-dt-column__soldQuantity").innerText; } catch {}

      for (var j = 0; j < messages.data.length; j++)
      {
        var sku = messages.data[j].product_sku;

        if (listingSKU.includes(sku) && sku != '')
        {
          var product_price = messages.data[j].product_price;
          var ebay_price_new = messages.data[j].ebay_price_new;
          var status_amz = messages.data[j].status_amz;

          var profit = Number(ebay_price) * (100 - 25) / 100 - Number(product_price);
          profit = Math.round(profit * 100) / 100;

          if (status_amz.includes('UNAVAILABLE') || status_amz.includes('SHOPDIE'))
          {
            items[i].querySelector("td.shui-dt-column__listingSKU").style.backgroundColor = 'pink';
          }
          else if (profit <= profit0)
          {
            items[i].querySelector("td.shui-dt-column__listingSKU").style.backgroundColor = '#FFBF00';
          }
          else if (profit0 < profit && profit <= profit1)
          {
            items[i].querySelector("td.shui-dt-column__listingSKU").style.backgroundColor = 'yellow';
          }
          else if (profit1 < profit && profit < profit2)
          {
            items[i].querySelector("td.shui-dt-column__listingSKU").style.backgroundColor = '#F3F781';
          }

          const div = document.createElement('div');
          div.className = 'cell-wrapper';
          div.innerHTML = '<a href="https://www.amazon.com/dp/' + sku + '" target="_blank">' + ebay_price_new + '/' + product_price + '/' + profit + '</a>';
          items[i].querySelector("td.shui-dt-column__listingSKU").appendChild(div);
        }
      }
      /* nhỏ hơn 5 ngày + chưa ra sold => end */
      if (Number(timeRemaining) < Number(date0) && Number(soldQuantity) < 1)
      {
        items[i].querySelector("td.shui-dt-column__timeRemaining").style.backgroundColor = 'pink';
      }
      /* qty < 2 + có sold => tang qty */
      if (Number(availableQuantity) < 2 && Number(soldQuantity) > 0 && !status_amz.includes('UNAVAILABLE'))
      {
        items[i].querySelector("td.shui-dt-column__availableQuantity").style.backgroundColor = 'green';
      }

    }
    break;

    case 'sync_active':
    eBaySyncActive();
    break;

    case 'sync_cloudzone':
    eBaySyncCloudzone();
    break;

    case 'enter_password':
    enterPassword();
    break;

    case 'change_password':
    changePassword();
    break;

  }
}

chrome.runtime.onMessage.addListener(gotMessage)

document.addEventListener('DOMNodeInserted', function ()
{
  if (timer) window.clearTimeout(timer);

  timer = window.setTimeout(nodeInsertedCallback, 3000);  
});

/* Read it using the storage API */
chrome.storage.sync.get(['access_token', 'domain', 'ebay_user'], function(items)
{
  access_token = items.access_token || '';
  domain = items.domain || '';
  ebay_user = items.ebay_user;

  if (location.href.includes('ebay.com/'))
  {
    eBayUser();
  }

  if (location.href.includes('ebay.com/sh'))
  {
    eBaySeller();
  }

  if (location.href.includes('ebay.com/sh/ovw'))
  {
    ebayOverview();
  }

  if (location.href.includes('ebay.com/sh/lst/active'))
  {
    eBaySyncActive();
  }

  /*https://www.ebay.com/sh/ord/?filter=status:ALL_ORDERS*/
  if (location.href.includes('ebay.com/sh/ord'))
  {
    ebayOrder();
  }

  if (location.href.includes('ebay.com/usr'))
  {
    ebayProfile();
  }

  if (location.href.includes('SingleList') && location.href.includes('AddItem'))
  {
    SingleList();
  }

  if (location.href.includes('amazon.com'))
  {
    AmazonAsin();
  }

  if (location.href.includes('amazon.com') && location.href.includes('gift'))
  {
    AmazonGiftText();
  }

  if($('input[type="password"]').length)
  {
    havePassword();
  }







});
