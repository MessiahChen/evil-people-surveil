// popup.js
/* Defines behavior of the extension popup window. */

// Get elements related to adding the site on the popup
let addDiv = document.getElementById("addDiv");
let addedDiv = document.getElementById("addedDiv");
let addButton = document.getElementById("addButton");

// Wait until the above content is loaded before adding an event listener
document.addEventListener('DOMContentLoaded', function () {

	// Add an event listener to the button when it is clicked
	addButton.addEventListener("click", function() {

		// Access the Chrome tabs
		// Help from https://stackoverflow.com/questions/31696279/url-remains-undefined-in-chrome-tabs-query
		chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {

			// Get the URL and cut it down to its domain
		    var site = tabs[0].url;
		    site = site.substring(site.indexOf("//") + 2, site.search(/.(com|edu|gov|net|org)/) + 4);
		    site = site.replace("www.", "");

			// Get the list of sites stored in the extension
			// Help from https://stackoverflow.com/questions/16605706/store-an-array-with-chrome-storage-local
			chrome.storage.sync.get({ sites: {} }, function(result) {
				var sites = result.sites;

				// Add this site to the list of sites if it's not there already
				// Method from https://stackoverflow.com/questions/1098040/checking-if-a-key-exists-in-a-javascript-object
				if (!sites.hasOwnProperty(site)) {
					sites[site] = true;

					// Update the list of sites
					chrome.storage.sync.set({ sites : sites });
				}
				// Log that this key already exists
				else {
					console.log("Already has this key.");
				}
			});
		});

		// Hide the add button, display the added text
		addDiv.style.display = "none";
		addedDiv.style.display = "block";
	});
});
