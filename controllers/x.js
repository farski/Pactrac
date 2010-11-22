var Pactrac = {};
Pactrac.browser = {};
Pactrac.browser.resource = {};
Pactrac.browser.view = {};
Pactrac.browser.utility = {};

Pactrac.browser.show = function () {
	chrome.tabs.getSelected(null, function(tab) {
		chrome.tabs.sendRequest(tab.id, {}, function(response) {
			var pageData = // parse response
			var listPage = Pactrac.browser.view._list(FOO, 'create', 'create');
			document.getElementById('pactrac').appendChild(listPage);
			// document.getElementById('pactrac').appendChild(Pactrac.browser._list_new(response));
		});
		var localData = Pactrac.browser.read();
		var listLocal = Pactrac.browser.view._list(localData, 'read', 'read');
		
		document.getElementById('pactrac').appendChild(listLocal);
		// document.getElementById('pactrac').appendChild(Pactrac.browser._list_saved());
	});
}

Pactrac.browser.resource.create = function (el) {
	var number = el.getAttribute('id');
	var host = document.getElementById(number+'_host').innerHTML;
	var description = document.getElementById(number+'_description').value;
	var p = { "number": number, "description": description, "host": host };
	var d = Pactrac.browser.read();
	if (Pactrac.browser.utility.localNumbers().indexOf(number) < 0) {
		d.push(p)
	}
	Pactrac.browser.update(d);
}
Pactrac.browser.resource.read = function () {
	if (localStorage.getItem('trackingData')) {
		return JSON.parse(localStorage.getItem('trackingData'))['data'];
	} else {
		return [];
	}
}
Pactrac.browser.resource.destroy = function (number) {
	var data = Pactrac.browser.read();
	if (Pactrac.browser.utility.localNumbers().indexOf(number) >= 0) {
		data.splice(Pactrac.browser.utility.localNumbers().indexOf(number),1);
	}
	Pactrac.browser.update(data);
}
Pactrac.browser.resource.update = function (data) {
	var trackingData = { "data": data };
	localStorage.setItem('trackingData', JSON.stringify(trackingData));
	var badgeCount = (data.length > 0 ? data.length.toString() : '');
	chrome.browserAction.setBadgeText({ text: badgeCount });
	if (document.getElementById('create')) { document.getElementById('pactrac').removeChild(document.getElementById('create')); }
	if (document.getElementById('read')) { document.getElementById('pactrac').removeChild(document.getElementById('read')); }
	Pactrac.browser.show();
}

Pactrac.browser._list_new = function (response) {
	var ol = document.createElement("ol");
	ol.className = "create";
	ol.setAttribute('id', 'create');

	for (n in response.numbers) {
		if (Pactrac.browser.utility.localNumbers().indexOf(response.numbers[n]) < 0) {
			var li = document.createElement("li");
			li.setAttribute('id', response.numbers[n])
		
			var a = document.createElement("a");
			a.className = "action";
			a.setAttribute("onclick", "Pactrac.browser.create(this.parentNode);")
			a.innerHTML = "+";
		
			var h4 = document.createElement("h4");
			h4.setAttribute('id', response.numbers[n]+'_host');
			h4.innerHTML = response.host;
		
			var h3 = document.createElement("h3");
			h3.innerHTML = '<input type="text" id="'+response.numbers[n]+'_description" value="Enter item description..." />';
		
			var p = document.createElement("p");
			p.innerHTML = response.numbers[n] + " ";
			p.appendChild(Pactrac.browser.utility.carrier_tag(response.numbers[n]));
	
			li.appendChild(a);
			li.appendChild(h4);
			li.appendChild(h3);
			li.appendChild(p);
			ol.appendChild(li);
		}
	}
	
	return ol;
}
Pactrac.browser._list_saved = function () {
	var ol = document.createElement("ol");
	ol.className = "read";
	ol.setAttribute('id', 'read');

	if (Pactrac.browser.read().length > 0) {
		var data = Pactrac.browser.read();
		
		for (d in data) {
			var itemData = data[d];
			
			var li = document.createElement("li");
			li.setAttribute('id', itemData['number'])
			
			var a = document.createElement("a");
			a.className = "action";
			a.setAttribute("onclick", "Pactrac.browser.destroy('"+itemData['number']+"')")
			a.innerHTML = "-";
			
			var h4 = document.createElement("h4");
			h4.innerHTML = itemData['host'];
			
			var h3 = document.createElement("h3");
			h3.innerHTML = itemData['description'];
			
			var p = document.createElement("p");
			p.innerHTML = itemData['number'] + " ";
			p.appendChild(Pactrac.browser.utility.carrier_tag(itemData['number']));
		
			li.appendChild(a);
			li.appendChild(h4);
			li.appendChild(h3);
			li.appendChild(p);
			ol.appendChild(li);
		}
		
	} else {		
		var li = document.createElement("li");

		var h3 = document.createElement("h3");
		h3.innerHTML = "You haven't saved any tracking numbers!";
		
		li.appendChild(h3);
		ol.appendChild(li);
	}

	return ol;
}

Pactrac.browser.view._list = function (parcels, id, klass) {
	var ol = document.createElement('ol');
	ol.className = klass;
	ol.setAttribute('id', id);
	
	for (parcel in parcels) {
		var li = Pactrac.browser.view._parcel(parcel);
		ol.appendChild(li);
	}
		
	return ol;
}
Pactrac.browser.view._parcel = function (parcel) {
	var li = document.createElement('li');
	li.setAttribute('id', parcel.number);
	
	var create = Pactrac.browser.view._action('+', 'create', 'Pactrac.browser.create(this.parentNode);');
	var destroy = Pactrac.browser.view._action('-', 'destroy', 'Pactrac.browser.create(this.parentNode);');
	li.appendChild(create);
	li.appendChild(destroy);
	
	var host = document.createElement('h4');
	host.setAttribute('id', response.numbers[n]+'_host');
	host.innerHTML = response.host;
	li.appendChild(host);
	
	var description = document.createElement('h3');
	description.innerHTML = '<input type="text" id="' + parcel.number + '_description" value="Enter item description..." />';
	li.appendChild(description);
	
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
Pactrac.browser.view._carrier = function (parcel) {
	
}


Pactrac.browser.utility.carrier_tag = function (number) {
	var span = document.createElement("span");
	span.className = "carrier";
	
	var a = document.createElement("a");
	
	span.appendChild(a);
	
	var patterns = {};
	patterns.ups = /\b(1Z ?[0-9A-Z]{3} ?[0-9A-Z]{3} ?[0-9A-Z]{2} ?[0-9A-Z]{4} ?[0-9A-Z]{3} ?[0-9A-Z]|[\dT]\d\d\d ?\d\d\d\d ?\d\d\d)\b/gi;
	patterns.fedex = /\b(\d\d\d\d ?\d\d\d\d ?\d\d\d\d)\b/ig;
	patterns.usps = /\b(91\d\d ?\d\d\d\d ?\d\d\d\d ?\d\d\d\d ?\d\d\d\d ?\d\d|91\d\d ?\d\d\d\d ?\d\d\d\d ?\d\d\d\d ?\d\d\d\d)\b/gi;

	var linkAttributes = null;
	if (number.match(patterns.ups)) {
		linkAttributes = { klass: 'ups', copy: 'UPS', url: 'http://wwwapps.ups.com/WebTracking/track?track.y=10&trackNums=' };
	} else if (number.match(patterns.fedex)) {
		linkAttributes = { klass: 'fedex', copy: 'FedEx', url: 'http://www.fedex.com/Tracking?action=track&tracknumbers=' };
	} else if (number.match(patterns.usps)) {
		linkAttributes = { klass: 'usps', copy: 'USPS', url: 'http://trkcnfrm1.smi.usps.com/PTSInternetWeb/InterLabelInquiry.do?strOrigTrackNum=' };
	}
	
	a.className = linkAttributes.klass;
	a.innerHTML = linkAttributes.copy;
	a.setAttribute('href', linkAttributes.url + number);
	a.setAttribute('onclick', "chrome.tabs.create({url: this.getAttribute('href')});window.close();");
	
	return span;
}
Pactrac.browser.utility.localNumbers = function () {
	var data = Pactrac.browser.read();
	var numbers = [];
	for (d in data) { numbers.push(data[d]['number']); }
	
	return numbers;
}