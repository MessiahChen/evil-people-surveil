let sitesDiv = document.getElementById("sitesDiv");

function loadSites() {
	chrome.storage.sync.get({ urls: {} }, function(result) {
		var urls = result.urls;
		for (var site in urls) {
			var siteDiv = document.createElement("div");
			var innerSiteDiv = document.createElement("div");
			var inputChunk = document.createElement("input");
			var inputChunkDiv = document.createElement("div");

			innerSiteDiv.innerText = site;
			innerSiteDiv.style.display = "inline-block";
			innerSiteDiv.style.width = "50%";

			inputChunkDiv.style.display = "inline-block";
			inputChunkDiv.style.width = "50%";

			inputChunk.type = "checkbox";
			inputChunk.value = site;
			inputChunk.checked = urls[site];
			inputChunk.id = site;
			inputChunk.onClick = changeEnabledStatus(site);

			siteDiv.style.margin = "8px";

			inputChunkDiv.appendChild(inputChunk);
			siteDiv.appendChild(innerSiteDiv);
			siteDiv.appendChild(inputChunkDiv);
			sitesDiv.appendChild(siteDiv);
		}
	});
}

function changeEnabledStatus(site) {
	var siteInput = document.getElementById(site);

	chrome.storage.sync.get({ urls: {} }, function(result) {
		var urls = result.urls;

		urls[site] = !urls[site];
		chrome.storage.sync.set({ urls : urls });
	});
}

loadSites();
