# evil-people-surveil

Chrome extension project for Engineering Privacy in Software at Carnegie Mellon University, prototyping CCPA/CPRA implementation.

## Installation
For installation, you will need the Google Chrome browser.

1. Download this GitHub repository through the **Code** button, then select either **Open with GitHub Desktop** or **Download ZIP**.
  - Note where on your computer the repo was downloaded to. Unzip it if only a zip file exists.
2. Open Google Chrome.
3. Select the **jigsaw piece** to the right of the search bar, then **Manage Extensions** beneath it. Alternatively, select **Window > Extensions** from the top bar.
4. Select **Load unpacked**.
5. Select the directory where the extension exists.
6. If it is not blue, click the toggle bar under the extension's tab to enable it.
7. TO PIN: Select the jigsaw piece to the right of the search bar and then select the pin icon beside "EPS Privacy Reporter".
  - The extension will now be accessible through the toolbar to the right of the search bar.

---

## Using the Extension

### Store Site Preferences
1. Navigate to a site you want to store CCPA request preferences for (e.g. https://google.com, https://amazon.com).
2. Select the extension icon from the toolbar.
3. Under the popup, select the request types you want the EFF to make on your behalf and the request types you want PRC to make on your behalf.
4. Select **Save request types for this site**.

## Send a Request Email for One Site
1. Navigate to a site which you have already stored CCPA request preferences for and wish to ask the EFF/PRC to make requests to.
2. Select the extension icon from the toolbar.
3. Select **Send request for this site**. Your computer's local email client will automatically populate an email.
  - Note that a signature is not automatically attached to this email, but one should be provided. To attach a signature, you have to manually attach it once the email pops up. See *Create a Signature* to create a signature.

## Create a Signature
1. Select the extension icon from the toolbar.
2. Select **Create Signature**.
3. Sign in the canvas provided.
4. Select **Save** to download the signature.

## Edit Site Preferences
1. Select the extension icon from the toolbar.
2. Select **Site Preferences**.
3. Tick or untick the boxes for the request types shown for each site listed as needed.
  - Note that this only displays EFF site preferences, for demonstration purposes.

## Send a Request Email for Several Sites
1. Select the extension icon from the toolbar.
2. Select **Site Preferences**.
3. Select **Send requests for selected sites**.
  - Note that a signature is not automatically attached to this email, but one should be provided. To attach a signature, you have to manually attach it once the email pops up. See *Create a Signature* to create a signature.

## Fill Information
1. Select the extension icon from the toolbar.
2. Select **Information Form**.
3. Fill in each section of information and check *I consent.*
4. Select **Submit**.
  - Note that this does not save the information entered, for demonstration purposes.

---

## Notes
- This repository does not actually populate an email with the email address or signature of the EFF or the PRC; instead it just uses their acronym names in the mailto place. This is to ensure we don't accidentally send an email to the organization from this student project.
- Only EFF checkboxes are shown in the Site Management screen.
- For demonstration purposes, only EFF populates in the email field, even if PRC checkboxes have been ticked for a site.
- The information form does not save information or populate information into a generated email.

---

# Signature
The signature pad plugin was taken from https://github.com/szimek/signature_pad, owned by Syzmon Nowak and contributed to by others. It is distributed under the MIT License.

---

# Sources
1. “Getting Started.” Chrome Developers, 28 Feb. 2014, https://developer.chrome.com/docs/extensions/mv3/getstarted/.
2. "chrome.tabs." Chrome Developers, https://developer.chrome.com/docs/extensions/reference/tabs/.
3. "chrome.storage." Chrome Developers, https://developer.chrome.com/docs/extensions/reference/storage/.
4. "Checking if a key exists in a JavaScript object?" Stack Overflow, 8 Jul. 2009, https://stackoverflow.com/questions/1098040/checking-if-a-key-exists-in-a-javascript-object.
5. "Store an array with chrome.storage.local." Stack Overflow, 17 May 2013, https://stackoverflow.com/questions/16605706/store-an-array-with-chrome-storage-local.
6. "url remains undefined in chrome.tabs.query." Stack Overflow, 29 Jul. 2015, https://stackoverflow.com/questions/31696279/url-remains-undefined-in-chrome-tabs-query.
