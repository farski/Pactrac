Array.prototype.PTunique = function () {
	var r = new Array();
	o:for(var i = 0, n = this.length; i < n; i++)
	{
		for(var x = 0, y = r.length; x < y; x++)
		{
			if(r[x]==this[i])
			{
				continue o;
			}
		}
		r[r.length] = this[i];
	}
	return r;
}

Pactrac.scrape = function (request, sender, sendResponse) {
	var patterns = {};
	patterns.ups = /\b(1Z ?[0-9A-Z]{3} ?[0-9A-Z]{3} ?[0-9A-Z]{2} ?[0-9A-Z]{4} ?[0-9A-Z]{3} ?[0-9A-Z]|[\dT]\d\d\d ?\d\d\d\d ?\d\d\d)\b/gi;
	patterns.fedex = /\b(\d\d\d\d ?\d\d\d\d ?\d\d\d\d)\b/ig;
	patterns.usps = /\b(91\d\d ?\d\d\d\d ?\d\d\d\d ?\d\d\d\d ?\d\d\d\d ?\d\d|91\d\d ?\d\d\d\d ?\d\d\d\d ?\d\d\d\d ?\d\d\d\d)\b/gi;
	
	var matches = {};
	var doc = document.body.innerHTML;
	var numbers = [];
	if (matches.ups = doc.match(patterns.ups)) { numbers = numbers.concat(matches.ups); }
	if (matches.fedex = doc.match(patterns.fedex)) { numbers = numbers.concat(matches.fedex); }
	if (matches.usps = doc.match(patterns.usps)) { numbers = numbers.concat(matches.usps); }
	numbers = numbers.PTunique();

	var parcels = [];
	for (i = 0; i < numbers.length; i++) {
		var number = numbers[i];
		parcels.push({ 'host': location.hostname, 'number': number, 'description': '' });
	}
	
	sendResponse(parcels);
}

chrome.extension.onRequest.addListener(Pactrac.scrape);