const socket = io();
socket.on('message', (msg)=> {
    alert(msg);
});

var audio=null;

socket.on('goPlay', (data)=> {
    console.log(data);
    if (audio!== null) {
        audio.pause();
        audio= new Audio(`/music/${data}`);
        audio.play();
    } else {
        audio = new Audio(`/music/${data}`);
    }
});

socket.on('goPlayPause', (data) => {
    if (data!==true) {
        console.log("Play");
        audio.play();
    } else {
        audio.pause();
        console.log("Pause");
    }
});