Pactrac.helpers.badge = {};

Pactrac.helpers.badge.setNumeric = function (number) {
	chrome.browserAction.setBadgeText({ text: (number > 0 ? number.toString() : '') });
}