const socket = io();
var pause = false;
var currentSong = null;
var songAmount = 0;
for (file in files) {
        songAmount = file;
}
songAmount = parseInt(songAmount);

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function listenSpot() {
    $("#choose-selection-container").removeClass("moveback");
    $("#choose-selection-container").toggleClass("move");
    setTimeout(function () {
        $("#choose-selection-container").removeClass("show");
        $("#choose-selection-container").toggleClass("hide");
        $("#spotify-section").removeClass("hide");
        $("#spotify-section").toggleClass("show");
    }, 700);
}
function listenDir() {
    $("#choose-selection-container").removeClass("moveback");
    $("#choose-selection-container").toggleClass("move");
    setTimeout(function () {
        $("#choose-selection-container").removeClass("show");
        $("#choose-selection-container").toggleClass("hide");
        $("#dir-section").removeClass("hide");
        $("#dir-section").toggleClass("show");
    }, 700);
}

function listenSettings() {
    $("#choose-selection-container").removeClass("moveback");
    $("#choose-selection-container").toggleClass("move");
    setTimeout(function () {
        $("#choose-selection-container").removeClass("show");
        $("#choose-selection-container").toggleClass("hide");
        $("#settings-section").removeClass("hide");
        $("#settings-section").toggleClass("show");
    }, 700);
}

function goBackSettings() {
    $("#settings-section").removeClass("go-back");
    $("#settings-section").toggleClass("go-left");
    setTimeout(function () {
        $("#settings-section").removeClass("show");
        $("#settings-section").toggleClass("hide");
        $("#choose-selection-container").removeClass("move");
        $("#choose-selection-container").toggleClass("moveback");
    }, 700);
    setTimeout(function () {
        $("#choose-selection-container").removeClass("hide");
        $("#choose-selection-container").toggleClass("show");
        $("#choose-selection-container").toggleClass("moveback");
    }, 1100);
    setTimeout(function () {
        $("#settings-section").removeClass("go-left");
        $("#settings-section").toggleClass("go-back");
    }, 1200);
}

function goBackDir() {
    $("#dir-section").removeClass("go-back");
    $("#dir-section").toggleClass("go-left");
    setTimeout(function () {
        $("#dir-section").removeClass("show");
        $("#dir-section").toggleClass("hide");
        $("#choose-selection-container").removeClass("move");
        $("#choose-selection-container").toggleClass("moveback");
    }, 700);
    setTimeout(function () {
        $("#choose-selection-container").removeClass("hide");
        $("#choose-selection-container").toggleClass("show");
                $("#choose-selection-container").toggleClass("moveback");
    }, 1100);
    setTimeout(function () {
        $("#dir-section").removeClass("go-left");
        $("#dir-section").toggleClass("go-back");
    }, 1200);
}

function goBackSpotify() {
        $("#spotify-section").removeClass("go-back");
    $("#spotify-section").toggleClass("go-left");
    setTimeout(function () {
        $("#spotify-section").removeClass("show");
        $("#spotify-section").toggleClass("hide");
        $("#choose-selection-container").removeClass("move");
        $("#choose-selection-container").toggleClass("moveback");
    }, 700);
    setTimeout(function () {
        $("#choose-selection-container").removeClass("hide");
        $("#choose-selection-container").toggleClass("show");
                $("#choose-selection-container").toggleClass("moveback");
    }, 1100);
    setTimeout(function () {
        $("#spotify-section").removeClass("go-left");
        $("#spotify-section").toggleClass("go-back");
    }, 1200);
}

function playChangeIcon() {
    pause = true;
    document.getElementById("play-button-icon").innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-pause-circle" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M5 6.25a1.25 1.25 0 1 1 2.5 0v3.5a1.25 1.25 0 1 1-2.5 0v-3.5zm3.5 0a1.25 1.25 0 1 1 2.5 0v3.5a1.25 1.25 0 1 1-2.5 0v-3.5z"/></svg>';
}

function pauseChangeIcon() {
    pause = false;
    document.getElementById("play-button-icon").innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-play-circle" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445z"/></svg>';
}

function currentlyPlaying(what) {
    document.getElementById("dir-header-p").innerHTML = `Playing: "${what}".`;
}

function playButton() {
    if (currentSong == null) {
        alert("No Song Selected");
    } else {
        if (pause == false) {
            playChangeIcon();
            socket.emit("pause", false);
        } else {
            pauseChangeIcon();
            socket.emit('pause', true);
        }
    }
}

function chooseFile(file) {
    var randomInt = getRandomInt(11)+1;
    if (randomInt == 4) {
        document.body.style.backgroundImage = `url(/img/background4.svg)`;
    } else {
        document.body.style.backgroundImage = `url(/img/background${randomInt}.png)`;
    }
    currentSong = file;
    socket.emit('fileChoose', file);
    currentlyPlaying(file);
    playChangeIcon();
}

function prevFile() {
    if (document.getElementById('time-slider').value > 2) {
        chooseFile(currentSong);
    } else {
        for (file in files) {
            if (files[file] == currentSong) {
                if (file == '1') {
                    chooseFile(files[songAmount]);
                    break;
                } else {
                    chooseFile(files[parseInt(file)-1]);
                    break;
                }
            }
        }
    }
}

function nextFile() {
    for (file in files) {
        if (files[file] == currentSong) {
            if (file == songAmount) {
                chooseFile(files[1]);
                break;
            } else {
                chooseFile(files[parseInt(file)+1]);
                break;
            }
        }
    }
}

socket.on('adminPause', (data) => {
    if (data!==null) {
        if (data!==false) {
            pauseChangeIcon();
        } else {
            playChangeIcon();
        }
    }
    
});

socket.on("adminFileChoose", (data) => {
    if (data !== null) {
        currentlyPlaying(data);
        playChangeIcon();
        currentSong = data;
    }
});

socket.on('adminVolume', (data) => {
    document.getElementById('volume-slider').value = data;
});

socket.on('adminFileDuration', (data) => {
    console.log(data);
    document.getElementById('time-slider').max = data;
});

socket.on("adminSrcTime", (data) => {
    document.getElementById('time-slider').value = data;
});

document.getElementById('volume-slider').oninput = function () {
    socket.emit('volume', this.value);
};

document.getElementById('time-slider').oninput = function () {
    socket.emit('time', this.value);
};