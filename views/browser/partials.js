Pactrac.browser.view = {};

Pactrac.browser.view._list = function (parcels, id, klass) {
	var ol = document.createElement('ol');
	ol.className = klass;
	ol.setAttribute('id', id);
	
	for (i = 0; i < parcels.length; i++) {
		var parcel = parcels[i];
				
		if (parcel.description != '' || (parcel.description == '' && !Pactrac.helpers.parcel.isInIndex(parcel))) {
			var li = Pactrac.browser.view._parcel(parcel);
			ol.appendChild(li);
		}
	}
		
	return ol;
}
Pactrac.browser.view._parcel = function (parcel) {
	var li = document.createElement('li');
	li.setAttribute('id', parcel.number);
	
	li.appendChild(Pactrac.browser.view._action('+', 'create', 'Pactrac.browser.create(Pactrac.helpers.parcel.parseNode(this.parentNode));'));
	li.appendChild(Pactrac.browser.view._action('-', 'destroy', 'Pactrac.browser.destroy("' + parcel.number + '");'));
	
	var host = document.createElement('h4');
	host.setAttribute('id', parcel.number+'_host');
	host.innerHTML = parcel.host;
	li.appendChild(host);
	
	li.appendChild(Pactrac.browser.view._description(parcel));
	
	var carrier = document.createElement('p');
	carrier.innerHTML = parcel.number + ' ';
	carrier.appendChild(Pactrac.browser.view._carrier(parcel));
	li.appendChild(carrier);
	
	return li
}
Pactrac.browser.view._action = function (text, klass, callback) {
	var a = document.createElement('a');
	a.className = 'action ' + klass;
	a.setAttribute('onclick', callback);
	a.innerHTML = text;
	
	return a;
}
Pactrac.browser.view._description = function (parcel) {
	var input = document.createElement('input');
	input.setAttribute('type', 'text');
	input.setAttribute('id', parcel.number + '_description');
	input.setAttribute('value', (parcel.description == '' ? 'Enter item description...' : parcel.description ))
	
	var description = document.createElement('h3');
	description.appendChild(input);
	return description;
}
Pactrac.browser.view._carrier = function (parcel) {
	var span = document.createElement('span');
	
	return span;
}

