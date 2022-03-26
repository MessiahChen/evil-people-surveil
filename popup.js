// popup.js
/* Defines behavior of the extension popup window. */

// Get elements related to adding the site on the popup
let addDiv = document.getElementById("addDiv");
let addedDiv = document.getElementById("addedDiv");
let addButton = document.getElementById("addButton");
let addSend = document.getElementById("addSend");
let sentRequest = document.getElementById("sentRequest");
let tableWrap = document.getElementById("wrap");

// Set checkbox 
function setCheckbox(eff, prc) {
	document.getElementById("kc_eff").checked = eff["kc_eff"];
	document.getElementById("ks_eff").checked = eff["ks_eff"];
	document.getElementById("del_eff").checked = eff["del_eff"];
	document.getElementById("opt_eff").checked = eff["opt_eff"];
	document.getElementById("kc_prc").checked = prc["kc_prc"];
	document.getElementById("ks_prc").checked = prc["ks_prc"];
	document.getElementById("del_prc").checked = prc["del_prc"];
	document.getElementById("opt_prc").checked = prc["opt_prc"];
};


// Wait until the above content is loaded before adding an event listener
document.addEventListener('DOMContentLoaded', function () {

	// Load eff and prc setting if the site is in the list
	// var eff = {"kc_eff": true, "ks_eff": false, "del_eff": false, "opt_eff": true};
	// var prc = {"kc_prc": true, "ks_prc": false, "del_prc": false, "opt_prc": true};
	
	chrome.tabs.query({ active: true, currentWindow: true },  function(tabs) {
		// Get the URL and cut it down to its domain
		site = tabs[0].url;
		site = site.substring(site.indexOf("//") + 2, site.search(/.(com|edu|gov|net|org)/) + 4);
		site = site.replace("www.", "");

		document.getElementById("currentSite").textContent = site;
		// Get the list of sites stored in the extension
		// Help from https://stackoverflow.com/questions/16605706/store-an-array-with-chrome-storage-local
		chrome.storage.sync.get({ priv_setting: {} }, function(result) {

			// priv_setting: {"www.github.com": {"eff": {}, "prc": {}}}
			var priv_setting = result.priv_setting;
			
			// If user has set privacy settings for this site
			if (priv_setting.hasOwnProperty(site)) {
				var eff = priv_setting[site]['eff'];
				var prc = priv_setting[site]['prc'];
				setCheckbox(eff, prc);
			}
			else {
				console.log("No setting for this site.");
			}
		});
	});

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

	addSend.addEventListener("click", function() {
		// handle table and send request
		var eff = {};
		var prc = {};
		eff['kc_eff'] = document.getElementById("kc_eff").checked;
		eff['ks_eff'] = document.getElementById("ks_eff").checked;
		eff['del_eff'] = document.getElementById("del_eff").checked;
		eff['opt_eff'] = document.getElementById("opt_eff").checked;
		prc['kc_prc'] = document.getElementById("kc_prc").checked;
		prc['ks_prc'] = document.getElementById("ks_prc").checked;
		prc['del_prc'] = document.getElementById("del_prc").checked;
		prc['opt_prc'] = document.getElementById("opt_prc").checked;

		chrome.tabs.query({ active: true, currentWindow: true },  function(tabs) {
			// Get the URL and cut it down to its domain
			site = tabs[0].url;
			site = site.substring(site.indexOf("//") + 2, site.search(/.(com|edu|gov|net|org)/) + 4);
			site = site.replace("www.", "");

			// update priv_setting list
			chrome.storage.sync.get({priv_setting: {}}, function(result) {
				var priv_setting = result.priv_setting;
				priv_setting[site] = {"eff": eff, "prc": prc};
				chrome.storage.sync.set({priv_setting: priv_setting});
			});	
		});
		
		// Hide the add button, display the added text
		tableWrap.style.display = "none";
		sentRequest.style.display = "block";
	})
});
