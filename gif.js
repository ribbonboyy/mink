document.getElementById("gifInput").addEventListener("change", function (event) {
  const file = event.target.files[0];

  if (!file || file.type !== "image/gif") {
    alert("Please upload a valid GIF file.");
    return;
  }

  const reader = new FileReader();

  reader.onload = function (e) {
    const arrayBuffer = e.target.result;

    // Use a library like gif.js or GIF parsing logic here
    parseGIF(arrayBuffer);
  };

  reader.readAsArrayBuffer(file);
});

function parseGIF(arrayBuffer) {
  const gifCanvas = document.getElementById("gifCanvas");
  const gifInfo = document.getElementById("gifInfo");
  const ctx = gifCanvas.getContext("2d");

  // Decode GIF using the Canvas API
  const blob = new Blob([arrayBuffer], { type: "image/gif" });
  const url = URL.createObjectURL(blob);

  const img = new Image();
  img.src = url;

  img.onload = function () {
    // Draw GIF to canvas
    ctx.drawImage(img, 0, 0);

    // Display metadata (hardcoded here for simplicity, but extract it dynamically with a library)
    gifInfo.innerHTML = `
      <h3>GIF Information</h3>
      <pre>
GIF size: ${Math.round(blob.size / 1024)} KB
GIF width: ${img.width}px
GIF height: ${img.height}px
Number of frames: (use gif.js for accurate frame extraction)
      </pre>
    `;
  };
}
