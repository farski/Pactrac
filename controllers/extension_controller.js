Pactrac.load = function () {
	if (localStorage.getItem('parcels')) {
		var parcels = JSON.parse(localStorage.getItem('parcels'));
		Pactrac.helpers.badge.setNumeric(parcels.length);
	}
}

Pactrac.load();