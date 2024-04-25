$(function() {
    updateData()
});
function updateData() {
    startIntervalIndex++
    if (startIntervalIndex > 2) {
        clearInterval(startInterval)
    }
    chrome.storage.sync.get(['notificationStorage', 'messagesStorage'], function(ncenter) {
        if (ncenter.notificationStorage > 0) {
            $('.notification').show()
            $('.notification').html(ncenter.notificationStorage)
        } else {
            $('.notification').hide()
        }
        if (ncenter.messagesStorage > 0) {
            $('.messages').show()
            $('.messages').html(ncenter.messagesStorage)
        } else {
            $('.messages').hide()
        }
    });
}
var startIntervalIndex = 0
var startInterval = setInterval(updateData, 2000);
var startInterval1min = setInterval(updateData, 60000);