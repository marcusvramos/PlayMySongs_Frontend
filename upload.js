function clearFields() {
    document.getElementById("musicName").value = "";
    document.getElementById("musicStyle").value = "";
    document.getElementById("artistName").value = "";
    document.getElementById("fileUpload").value = "";
}

function searchExistentMusic(musicName) {
    return fetch(`http://localhost:8080/songs?filter=${encodeURIComponent(musicName)}`)
        .then((response) => response.json())
        .then((data) => {
            if(data.length > 0) return true;
            else return false;
        });
}

function disappearAlert(divName){
    setTimeout(() => {
        document.getElementById(divName).innerHTML = "";
    }, 2000);
}

function verifyMusicExists() {
    var musicName = document.getElementById("musicName").value;
    return searchExistentMusic(musicName)
        .then((ifExists) => {
            if (ifExists) {
                document.getElementById(
                    "uploadResponse"
                ).innerHTML = `<div class="alert alert-warning" role="alert">Musica já existe na base de dados. Clique em "listar música" para vê-la</div>`;
                clearFields();
                disappearAlert("uploadResponse");
            }
            return ifExists;
        })
        .catch((error) => {
            console.error("Erro ao verificar música:", error);
            return false;
        });
}

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("uploadForm");

    form.addEventListener("submit", async function (e) {
        e.preventDefault();
        const file = document.getElementById("fileUpload").files[0];

        if (file && file.type === "audio/mpeg") {
            if (!(await verifyMusicExists())) {
                var formData = new FormData();

                formData.append("name", document.getElementById("musicName").value);
                formData.append("style", document.getElementById("musicStyle").value);
                formData.append("artist", document.getElementById("artistName").value);
                formData.append("file", file);

                fetch("http://localhost:8080/songs/upload", {
                    method: "POST",
                    body: formData,
                }).then((response) => response.text())
                    .then((data) => {
                        document.getElementById(
                            "uploadResponse"
                        ).innerHTML = `<div class="alert alert-success" role="alert">${data}</div>`;
                        clearFields();
                        disappearAlert("uploadResponse");
                    })
                    .catch((error) => {
                        document.getElementById(
                            "uploadResponse"
                        ).innerHTML = `<div class="alert alert-danger" role="alert">Falha ao fazer upload: ${error}</div>`;
                    });

            }
        }
        else {
            document.getElementById(
                "uploadResponse"
            ).innerHTML = `<div class="alert alert-danger" role="alert">Arquivo inválido. Selecione um arquivo de áudio no formato MP3</div>`;
            clearFields();
            disappearAlert("uploadResponse");
        }
    });
});
