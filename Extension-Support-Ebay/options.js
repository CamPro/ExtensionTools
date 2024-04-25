console.log('options script');

/* Read it using the storage API */
chrome.storage.sync.get(['access_token', 'domain', 'ebay_user'], function(items)
{
	//$('#access_token').val(items.access_token || '');
	$('#domain').val(items.domain || '');
	$('#ebay_user').val(items.ebay_user || '');
});

$('#save').click(function ()
{
	console.log('click save')

	var access_token = $('#access_token').val();
	var domain = $('#domain').val();

	if (domain.endsWith('/'))
	{
		domain = domain.substring(0, domain.length - 1);
	}

	/* Save it using the Chrome extension storage API. */
	chrome.storage.sync.set({'access_token': access_token, 'domain': domain}, function()
	{
		$('#save').text('Save success');
		setTimeout(function(){ $('#save').text('Save'); }, 2000);
	});

});
