// popup.js
/* Defines behavior of the extension popup window. */

// Get elements related to signature
let signaturePad = document.getElementById("signature-pad");
let openSignatureButton = document.getElementById("openSignature");
let hideSignatureButton = document.getElementById("hideSignature");

// Get elements related to requests
let addRequestsForSite = document.getElementById("addRequestsForSite");
let requestsSaved = document.getElementById("requestsSaved");
let tableWrap = document.getElementById("wrap");

// Get elements related to emailing/preferences
let openForm = document.getElementById("openForm");
let sitesButton = document.getElementById("sitesButton");
let emailButton = document.getElementById("emailButton");

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

	chrome.tabs.query({ active: true, currentWindow: true },  function(tabs) {
		// Get the URL and cut it down to its domain
		site = tabs[0].url;
		site = site.substring(site.indexOf("//") + 2, site.search(/.(com|edu|gov|net|org)/) + 4);
		site = site.replace("www.", "");

		if (tabs[0].url.startsWith("chrome")) {
			tableWrap.style.display = "none";
			emailButton.style.display = "none";
		}
		else {
			document.getElementById("currentSite").textContent = "Set requests for " + site;
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

				// Mail info
				emailButton.href = "mailto:EFF";
				emailButton.href += "?Subject=Authorized Agent Request";
				emailButton.href += "&Body=";

				emailButton.href += "To Whom It May Concern," + escape("\n\n") + "I am exercising my rights as a California citizen under the CCPA/CPRA. "
				+ "I am authorizing your organization to act as an agent on my behalf and asking you to make the following requests of " + site + ":" + escape("\n\n");

				if (priv_setting.hasOwnProperty(site)) {
					if (priv_setting[site]['eff']['del_eff']) {
						emailButton.href += "•" + escape("\t") + "Delete my data" + escape("\n");
					}
					if (priv_setting[site]['eff']['kc_eff']) {
						emailButton.href += "•" + escape("\t") + "Tell me what categories my data is in" + escape("\n");
					}
					if (priv_setting[site]['eff']['ks_eff']) {
						emailButton.href += "•" + escape("\t") + "Tell me what specific personal data has been stored" + escape("\n");
					}
					if (priv_setting[site]['eff']['opt_eff']) {
						emailButton.href += "•" + escape("\t") + "Opt me out of future data storage" + escape("\n");
					}
				}

				emailButton.href += escape("\n") + "My signature is attached below." + escape("\n");
			});
		}
	});

	// Load eff and prc setting if the site is in the list
	// var eff = {"kc_eff": true, "ks_eff": false, "del_eff": false, "opt_eff": true};
	// var prc = {"kc_prc": true, "ks_prc": false, "del_prc": false, "opt_prc": true};
	
	openSignatureButton.addEventListener("click", function() {
		openSignatureButton.style.display = "none";
		signaturePad.style.display = "block";
	});

	hideSignatureButton.addEventListener("click", function() {
		openSignatureButton.style.display = "block";
		signaturePad.style.display = "none";
	});

	addRequestsForSite.addEventListener("click", function() {
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
		requestsSaved.style.display = "block";
	});

	openForm.addEventListener("click", function() {
		window.open('form.html');
	});

	sitesButton.addEventListener("click", function() {
		window.open('options.html');
	});
});
