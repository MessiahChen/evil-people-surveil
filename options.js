// options.js
/* Populates the options page via JavaScript. */

// Retrieve the overall site container
let sitesDiv = document.getElementById("sitesDiv");

const siteInputs = {};

// Mail info
emailButton.href = "mailto:EFF";
emailButton.href += "?Subject=Authorized Agent Request";
emailButton.href += "&Body=";

chrome.storage.sync.get({ priv_setting: {} }, function(result) {
	var priv_setting = result.priv_setting;

	if (!priv_setting.isEmpty) {
		// Mail info
		emailButton.href += "To Whom It May Concern," + escape("\n\n") + "I am exercising my rights as a California citizen under the CCPA/CPRA. "
		+ "I am authorizing your organization to act as an agent on my behalf and asking you to make the following requests for the following sites:" + escape("\n\n");

		var del_str = "";
		var kc_str = "";
		var ks_str = "";
		var opt_str = "";

		for (site in priv_setting) {
			if (priv_setting[site]['eff']['del_eff']) {
				del_str += "•" + escape("\t") + site + escape("\n");
			}
			if (priv_setting[site]['eff']['kc_eff']) {
				kc_str += "•" + escape("\t") + site + escape("\n");
			}
			if (priv_setting[site]['eff']['ks_eff']) {
				ks_str += "•" + escape("\t") + site + escape("\n");
			}
			if (priv_setting[site]['eff']['opt_eff']) {
				opt_str += "•" + escape("\t") + site + escape("\n");
			}
		}

		if (del_str.length > 0) {
			emailButton.href += "Delete my data:" + escape("\n") + del_str + escape("\n");
		}
		if (kc_str.length > 0) {
			emailButton.href += "Tell me what categories my data is in:" + escape("\n") + kc_str + escape("\n");
		}
		if (ks_str.length > 0) {
			emailButton.href += "Tell me what specific personal data has been stored:" + escape("\n") + ks_str + escape("\n");
		}
		if (opt_str.length > 0) {
			emailButton.href += "Opt me out of future data storage:" + escape("\n") + opt_str + escape("\n");
		}

		emailButton.href += "My signature is attached below." + escape("\n");
	}
});

/**
 * Displays all sites stored within local storage along with a checkbox to toggle their status.
 */
function loadSites() {

	// Retrieve sites stored in local storage
	chrome.storage.sync.get({ priv_setting: {} }, function(result) {
		var priv_setting = result.priv_setting;

		var table = document.createElement("table");
		var headerRow = document.createElement("tr");

		var header = document.createElement("th");
		header.style.padding = "8px";
		header.innerText = "Website";
		headerRow.appendChild(header);

		header = document.createElement("th");
		header.style.padding = "8px";
		header.innerText = "Delete Data";
		headerRow.appendChild(header);

		header = document.createElement("th");
		header.style.padding = "8px";
		header.innerText = "Know Categories";
		headerRow.appendChild(header);

		header = document.createElement("th");
		header.style.padding = "8px";
		header.innerText = "Know Data";
		headerRow.appendChild(header);

		header = document.createElement("th");
		header.style.padding = "8px";
		header.innerText = "Opt Out";
		headerRow.appendChild(header);

		table.appendChild(headerRow);
		sitesDiv.appendChild(table);

		if (!priv_setting.isEmpty) {
			for (var site in priv_setting) {
				var row = document.createElement("tr");
				var td = document.createElement("td");
				td.innerText = site;
				td.style.padding = "8px";
				row.appendChild(td);

				for (var req in priv_setting[site]["eff"]) {
					td = document.createElement("td");
					td.style.padding = "8px";

					var inputChunk = document.createElement("input");
					var inputChunkDiv = document.createElement("div");
					// Style the div representing the site toggle
					inputChunkDiv.style.display = "inline-block";
					inputChunkDiv.style.width = "50%";

					// Style the checkbox
					inputChunk.type = "checkbox";
					inputChunk.checked = priv_setting[site]["eff"][req];
					inputChunk.id = site + "=" + req;
					// Give the checkbox an event to update the site status when it is clicked
					inputChunk.addEventListener("change", function(event) {
						// Update the site's status accordingly
						var parts = event.target.id.split("=");

						priv_setting[parts[0]]["eff"][parts[1]] = event.target.checked;
						chrome.storage.sync.set({ priv_setting: priv_setting });
					});

					inputChunkDiv.appendChild(inputChunk);
					td.appendChild(inputChunkDiv);
					row.appendChild(td);

				}
				table.appendChild(row);
			}
		}
	});
}

// Display all sites stored in storage when the page is loaded
loadSites();
