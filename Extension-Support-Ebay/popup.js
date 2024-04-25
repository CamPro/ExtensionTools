console.log('popup script');

/* Đoạn này xử lý để load giá trị đã lưu trong storage vào option html */
var domain = '';
var access_token = '';
var ebay_user = '';

/* Read it using the storage API */
chrome.storage.sync.get(['access_token', 'domain', 'ebay_user'], function(items)
{
  access_token = items.access_token || '';
  domain = items.domain || '';
  ebay_user = items.ebay_user || '';

  $('#domain').text(domain);
  $('#ebay_user').text(ebay_user);

});

$('#order').click(function ()
{
  console.log('click order');

  var order_id = $('#order_id').val();

  if (!order_id) return false;
  
  jQuery.ajax({
    url: domain + '/api/order/' + order_id + '/buyer',
    type: 'POST',
    success: function(result)
    {
      console.log(result);
      var obj = JSON.parse(result);
      SendAction('fill_buyer', obj.data);

      /* Save it using the Chrome extension storage API. */
      chrome.storage.sync.set({'ebay_user': obj.data.ebay_user, 'buyer': obj.data}, function()
      {
        console.log('Buyer saved');
      });

    }
  }); 
});
/* Đoạn này xử lý khi click vào nút `gift` */
$('#gift').click(function ()
{
  console.log('click gift');
  SendAction('fill_gift');
});
/* Đoạn này xử lý khi click vào nút `sync_active` */
$('#sync_active').click(function ()
{
  console.log('click sync active');
  SendAction('sync_active');
});
/* Đoạn này xử lý khi click vào nút `sync_active` */
$('#sync_cloudzone').click(function ()
{
  console.log('click sync cloudzone');
  SendAction('sync_cloudzone');
});
/* Đoạn này xử lý khi click vào nút `sync_active` */
$('#enter_password').click(function ()
{
  SendAction('enter_password');
});
/* Đoạn này xử lý khi click vào nút `sync_active` */
$('#change_password').click(function ()
{
  SendAction('change_password');
});

function SendAction(action, data='')
{
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs)
  {
    //if(!tabs[0].url.includes('amazon.com')) return false;

    var messages = { action: action, data: data }

    chrome.tabs.sendMessage(tabs[0].id, messages);
  });
}
