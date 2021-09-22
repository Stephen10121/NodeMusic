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