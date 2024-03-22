function searchMusic() {
  var searchTerm = document.getElementById("searchTerm").value;

  fetch(`http://localhost:8080/songs?filter=${encodeURIComponent(searchTerm)}`)
    .then((response) => response.json())
    .then((data) => {
      var musicList = document.getElementById("musicList");
      musicList.innerHTML = "";
      data.forEach((song) => {
        var songElement = document.createElement("div");
        songElement.classList.add("list-group-item");
        songElement.innerHTML = `
                  <div class="d-flex w-100 justify-content-between">
                      <h5 class="mb-1">${song.name}</h5>
                      <small>${song.style}</small>
                  </div>
                  <p class="mb-1">${song.artist}</p>
                  <audio controls>
                      <source src="${song.url}" type="audio/mpeg">
                      Your browser does not support the audio element.
                  </audio>`;
        musicList.appendChild(songElement);
      });
    })
    .catch((error) => {
      console.error("Error fetching songs:", error);
      var musicList = document.getElementById("musicList");
      musicList.innerHTML = `<div class="alert alert-danger" role="alert">Não foi possível buscar as músicas: ${error}</div>`;
    });
}

document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:8080/songs")
    .then((response) => response.json())
    .then((data) => {
      const musicListElement = document.getElementById("musicList");
      musicListElement.innerHTML = "";

      data.forEach((song) => {
        console.log(song);
        const songElement = document.createElement("div");
        songElement.classList.add("list-group-item");
        songElement.innerHTML = `
        <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1">${song.name}</h5>
        <small>${song.style}</small>
        </div>
        <p class="mb-1">${song.artist}</p>
        <audio controls>
            <source src="${song.url}" type="audio/mpeg">
            Your browser does not support the audio element.
        </audio>`;

        musicListElement.appendChild(songElement);
      });
    })
    .catch((error) => {
      console.error("Erro ao buscar músicas:", error);
    });
});
