const socket = io();
var audio=null;

socket.on('adminFileChoose', (data) => {
    if (audio!== null) {
        audio.pause();
        audio= new Audio(`/music/${data}`);
        audio.play();
    } else {
        audio = new Audio(`/music/${data}`);
    }
});

socket.on('adminPause', (data) => {
    if (data!==true) {
        audio.play();
    } else {
        audio.pause();
    }
});

socket.on('adminVolume', (data) => {
    audio.volume = data/100;
});

socket.on('adminTime', (data) => {
    audio.currentTime = data;
});

setInterval(function () {
    socket.emit('srcTime', audio.currentTime);
}, 1000);