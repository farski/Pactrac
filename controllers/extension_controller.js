var Pactrac = {};

Pactrac.boot = function () {
	if (localStorage.getItem('trackingData')) {
		var data = JSON.parse(localStorage.getItem('trackingData'))['data'];
		if (data.length > 0) { chrome.browserAction.setBadgeText({ text: data.length.toString() }); }
	}	
}

Pactrac.boot();