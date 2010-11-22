Pactrac.browser = {};

Pactrac.browser.show = function () {
	if (document.getElementById('create')) { document.getElementById('pactrac').removeChild(document.getElementById('create')); }
	if (document.getElementById('read')) { document.getElementById('pactrac').removeChild(document.getElementById('read')); }

	chrome.tabs.getSelected(null, function(tab) {
		chrome.tabs.sendRequest(tab.id, {}, function(parcels) {
			document.getElementById('pactrac').appendChild(Pactrac.browser.view._list(parcels, 'create', 'create'));
		});
		
		document.getElementById('pactrac').appendChild(Pactrac.browser.view._list(Pactrac.browser.read(), 'read', 'read'));
	});
}
Pactrac.browser.index = function () {
	var parsels = Pactrac.browser.read();
	var index = [];
	for (j = 0; j < parsels.length; j++) {
		var parsel = parsels[j];
		index.push(parsel.number)
	}
	
	return index;
}

Pactrac.browser.create = function (parcel) {
	var parcels = Pactrac.browser.read();
	if (parcel.description != '' && !Pactrac.helpers.parcel.isInIndex(parcel)) { parcels.push(parcel); }
	Pactrac.browser.save(parcels, Pactrac.browser.show);
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
			Pactrac.browser.save(parcels, Pactrac.browser.show);
			return false;
		}
	}	
}
Pactrac.browser.update = function (parcel) {
	if (Pactrac.helpers.parcel.isInIndex(parcel)) {
		var parcels = Pactrac.browser.read();
		for (k = 0; k < parcels.length; k++) {
			var p = parcels[k];
			if (parcel.number == p.number) {
				parcels[k] = { 'host': p.host, 'number': p.number, 'description': parcel.description };
				Pactrac.browser.save(parcels, function(){});
				return false;
			}
		}
	}
}
Pactrac.browser.save = function (parcels, callback) {
	localStorage.setItem('parcels', JSON.stringify(parcels));
	Pactrac.helpers.badge.setNumeric(parcels.length);	
	callback();
}
