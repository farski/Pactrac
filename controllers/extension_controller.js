Pactrac.load = function () {
	if (localStorage.getItem('parcels')) {
		var parcels = JSON.parse(localStorage.getItem('parcels'));
		var badgeText = ((parcels.length > 0) ? parcels.length.toString() : '');
		chrome.browserAction.setBadgeText({ text: badgeText });
	}
}

Pactrac.load();