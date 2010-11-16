var Pactrac = {};

Pactrac.boot = function () {
	if (localStorage.getItem('trackingData')) {
		var data = JSON.parse(localStorage.getItem('trackingData'))['data'];
		var badgeCount = (data.length > 0 ? data.length.toString() : '');
		chrome.browserAction.setBadgeText({ text: badgeCount });
	}
}

Pactrac.boot();