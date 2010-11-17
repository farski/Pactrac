var Pactrac = {};

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
	var trackingNumbers = [];
	if (matches.ups = doc.match(patterns.ups)) { trackingNumbers = trackingNumbers.concat(matches.ups); }
	if (matches.fedex = doc.match(patterns.fedex)) { trackingNumbers = trackingNumbers.concat(matches.fedex); }
	if (matches.usps = doc.match(patterns.usps)) { trackingNumbers = trackingNumbers.concat(matches.usps); }
	
	sendResponse({ host: location.hostname, numbers: trackingNumbers.PTunique() });
}

chrome.extension.onRequest.addListener(Pactrac.scrape);