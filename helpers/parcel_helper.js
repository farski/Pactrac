Pactrac.helpers.parcel = {};

Pactrac.helpers.parcel.parseNode = function (el) {
	var number = el.getAttribute('id');
	var host = document.getElementById(number+'_host').innerHTML;
	var description = document.getElementById(number+'_description').value;
	
	return { 'host': host, 'number': number, 'description': description };
}

Pactrac.helpers.parcel.isInIndex = function (parcel) {
	return ((Pactrac.browser.list().indexOf(parcel.number) >= 0) ? true : false );
}