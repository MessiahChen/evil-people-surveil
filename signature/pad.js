var wrapper = document.getElementById("signature-pad"),
    clearButton = wrapper.querySelector("[data-action=clear]"),
    saveButton = wrapper.querySelector("[data-action=save]"),
    canvas = wrapper.querySelector("canvas");

// Adjust canvas coordinate space taking into account pixel ratio,
// to make it look crisp on mobile devices.
// This also causes canvas to be cleared.

//create a signature pad

var pad = new SignaturePad(canvas, {
    minWidth: .1,
    maxWidth: 1.5,
    backgroundColor: 'rgba(255, 255, 255, 1.0)',
    penColor: "rgb(0, 0, 0)"
});

//download function for the signature
function download(dataURL, filename) {
    var blob = dataURLToBlob(dataURL);
    var url = window.URL.createObjectURL(blob);
  
    var a = document.createElement("a");
    a.style = "display: none";
    a.href = url;
    a.download = filename;
  
    document.body.appendChild(a);
    a.click();
  
    window.URL.revokeObjectURL(url);
  }
  
  // One could simply use Canvas#toBlob method instead, but it's just to show
  // that it can be done using result of SignaturePad#toDataURL.
  function dataURLToBlob(dataURL) {
    // Code taken from https://github.com/ebidel/filer.js
    var parts = dataURL.split(';base64,');
    var contentType = parts[0].split(":")[1];
    var raw = window.atob(parts[1]);
    var rawLength = raw.length;
    var uInt8Array = new Uint8Array(rawLength);
  
    for (var i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }
  
    return new Blob([uInt8Array], { type: contentType });
  }
  

  // the save and clear buttons

saveButton.addEventListener("click", function (event) {
    if (pad.isEmpty()) {
        alert("Please provide signature.");
    } else {
        var sigURL = pad.toDataURL()
         // alert("This is the base64 encoded signature " + sigURL)
        // uncomment the line below to have the add on download the image
        download(sigURL, "signature.png");
    }
});

clearButton.addEventListener("click", function (event) {
    pad.clear();
});



