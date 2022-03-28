// options.js
/* Populates the options page via JavaScript. */

// Retrieve the overall site container
let sitesDiv = document.getElementById("sitesDiv");

const siteInputs = {};

/**
 * Displays all sites stored within local storage along with a checkbox to toggle their status.
 */
function loadSites() {

	// Retrieve sites stored in local storage
	chrome.storage.sync.get({ sites: {} }, function(result) {
		var sites = result.sites;

		if (!sites.isEmpty) {
			var websiteHeader = document.createElement("h2");
			websiteHeader.innerText = "Website";
			websiteHeader.style.display = "inline-block";
			websiteHeader.style.width = "50%";
			sitesDiv.appendChild(websiteHeader);

			var textHeader = document.createElement("h2");
			textHeader.innerText = "Include in Requests?";
			textHeader.style.display = "inline-block";
			textHeader.style.width = "50%";
			sitesDiv.appendChild(textHeader);
		}

		// Iterate through all sites
		for (var site in sites) {

			// Construct HTML elements - we have to do this through JavaScript since these are dynamic
			var siteDiv = document.createElement("div");
			var innerSiteDiv = document.createElement("div");
			var inputChunk = document.createElement("input");
			var inputChunkDiv = document.createElement("div");

			// Style the div representing the site name
			innerSiteDiv.innerText = site;
			innerSiteDiv.style.display = "inline-block";
			innerSiteDiv.style.width = "50%";

			// Style the div representing the site toggle
			inputChunkDiv.style.display = "inline-block";
			inputChunkDiv.style.width = "50%";

			// Style the checkbox
			inputChunk.type = "checkbox";
			// inputChunk.value = site;
			inputChunk.checked = sites[site];
			inputChunk.id = site;
			// Give the checkbox an event to update the site status when it is clicked
			inputChunk.addEventListener("change", function(event) {
				// Update the site's status accordingly
				sites[event.target.id] = event.target.checked;
				chrome.storage.sync.set({ sites: sites });
			});

			// Put margin around each site's div
			siteDiv.style.margin = "8px";

			// Combine the HTML chunks into a hierarchy
			inputChunkDiv.appendChild(inputChunk);
			siteDiv.appendChild(innerSiteDiv);
			siteDiv.appendChild(inputChunkDiv);
			sitesDiv.appendChild(siteDiv);
		}
	});
}

// Display all sites stored in storage when the page is loaded
loadSites();
