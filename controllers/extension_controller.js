// localStorage.removeItem('trackingData');

var Pactrac = {};

Pactrac.boot = function () {
	if (localStorage.getItem('trackingData')) {
		var dataStr = localStorage.getItem('trackingData');
		var data = JSON.parse(dataStr)['data'];
		if (data.length > 0) { chrome.browserAction.setBadgeText({ text: data.length.toString() }); }
	}	
}

Pactrac.boot();