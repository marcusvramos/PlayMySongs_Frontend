document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("uploadForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();

      var formData = new FormData();
      formData.append("name", document.getElementById("musicName").value);
      formData.append("style", document.getElementById("musicStyle").value);
      formData.append("artist", document.getElementById("artistName").value);
      formData.append("file", document.getElementById("fileUpload").files[0]);

      fetch("http://localhost:8080/songs/upload", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.text())
        .then((data) => {
          document.getElementById(
            "uploadResponse"
          ).innerHTML = `<div class="alert alert-success" role="alert">${data}</div>`;
        })
        .catch((error) => {
          document.getElementById(
            "uploadResponse"
          ).innerHTML = `<div class="alert alert-danger" role="alert">Failed to upload: ${error}</div>`;
        });
    });
});
