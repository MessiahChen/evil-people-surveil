let addDiv = document.getElementById("addDiv");
let addedDiv = document.getElementById("addedDiv");

let addButton = document.getElementById("addButton");

document.addEventListener('DOMContentLoaded', function () {
	addButton.addEventListener("click", function() {

		chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
		    var url = tabs[0].url;
		    url = url.substring(url.indexOf("//") + 2, url.search(/.(com|edu|gov|org)/) + 4);
		    url = url.replace("www.", "");

			chrome.storage.sync.get({ urls: {} }, function(result) {
				var urls = result.urls;

				if (!urls.hasOwnProperty(url)) {
					urls[url] = true;
					chrome.storage.sync.set({ urls : urls }, function() {
				    	console.log("Added " + url + " to the list of tracked sites with value " + urls[url]);
				    	chrome.storage.sync.get('urls', function(result) {
				    		console.log(result.urls);
				    	});
				    });
				}
				else {
					console.log("Already has this key.");
				}
			});
		});

		addDiv.style.display = "none";
		addedDiv.style.display = "block";
	});
});
