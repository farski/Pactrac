Pactrac.browser = {};

Pactrac.browser.show = function () {
	chrome.tabs.getSelected(null, function(tab) {
		chrome.tabs.sendRequest(tab.id, {}, function(parcels) {
			document.getElementById('pactrac').appendChild(Pactrac.browser.view._list(parcels, 'create', 'create'));
		});
		
		document.getElementById('pactrac').appendChild(Pactrac.browser.view._list(Pactrac.browser.read(), 'read', 'read'));
	});
}
Pactrac.browser.list = function () {
	var parsels = Pactrac.browser.read();
	var list = [];
	for (j = 0; j < parsels.length; j++) {
		var parsel = parsels[j];
		list.push(parsel.number)
	}
	
	return list;
}

Pactrac.browser.create = function (parcel) {
	var parcels = Pactrac.browser.read();
	if (parcel.description != '' && !Pactrac.helpers.parcel.isInIndex(parcel)) { parcels.push(parcel); }
	Pactrac.browser.update(parcels);
}
Pactrac.browser.read = function () {
	return (localStorage.getItem('parcels') ? JSON.parse(localStorage.getItem('parcels')) : [])
}
Pactrac.browser.destroy = function (number) {
	var parcels = Pactrac.browser.read();
	for (i = 0; i < parcels.length; i++) {
		var parcel = parcels[i];
		if (parcel.number == number) {
			parcels.splice(i, 1);
			Pactrac.browser.update(parcels);
			return false;
		}
	}	
}
Pactrac.browser.update = function (parcels) {
	localStorage.setItem('parcels', JSON.stringify(parcels));
	
	var badgeText = (parcels.length > 0 ? parcels.length.toString() : '');
	chrome.browserAction.setBadgeText({ text: badgeText });
	
	if (document.getElementById('create')) { document.getElementById('pactrac').removeChild(document.getElementById('create')); }
	if (document.getElementById('read')) { document.getElementById('pactrac').removeChild(document.getElementById('read')); }
	Pactrac.browser.show();
}
