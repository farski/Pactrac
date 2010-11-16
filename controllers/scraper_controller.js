var Pactrac = {};

Array.prototype.unique = function () {
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
	var doc = document.body.innerHTML;
	var tn = [];

	var ups = doc.match(/\b(1Z ?[0-9A-Z]{3} ?[0-9A-Z]{3} ?[0-9A-Z]{2} ?[0-9A-Z]{4} ?[0-9A-Z]{3} ?[0-9A-Z]|[\dT]\d\d\d ?\d\d\d\d ?\d\d\d)\b/gi);
	if (!!ups) { tn = tn.concat(ups); }
	
	var fedex = doc.match(/\b(\d\d\d\d ?\d\d\d\d ?\d\d\d\d)\b/ig);
	if (!!fedex) { tn = tn.concat(fedex); }
	
	var usps = doc.match(/\b(91\d\d ?\d\d\d\d ?\d\d\d\d ?\d\d\d\d ?\d\d\d\d ?\d\d|91\d\d ?\d\d\d\d ?\d\d\d\d ?\d\d\d\d ?\d\d\d\d)\b/gi);
	if (!!usps) { tn = tn.concat(usps); }
	
	// should remove duplicates before sending back
	
	sendResponse({
		host: location.hostname,
		numbers: tn.unique()
	});
}

chrome.extension.onRequest.addListener(Pactrac.scrape);