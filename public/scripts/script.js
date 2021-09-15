const socket = io();
socket.on('message', (msg)=> {
    alert(msg);
});

socket.on('size', (size2)=> {
    var ms;
    var size=size2;
    if (size>60) {
        var j = 0;
        while (size>60) {
            size-=60;
            j+=1;
        }
        ms = `${j}:${size}`;
    } else {
        ms=`00:${size}`;
    }
    document.getElementById('time').value = 0;
    document.getElementById('time').max = size2;
    document.getElementById('maxtime').innerHTML = ms;
    playFile('2');
});

socket.on('sizenow', (data) => {
    var ms;
    var size=data;
    if (size>60) {
        var j = 0;
        while (size>60) {
            size-=60;
            j+=1;
        }
        ms = `${j}:${size}`;
    } else {
        ms=`00:${size}`;
    }
    document.getElementById('time').value = data;
    document.getElementById('maxtime').innerHTML = ms;
});
var t=0;
var t2=false;
function chooseFile(which) {
    console.log(`Choosing this file: ${which}`);
    socket.emit('fileSelect', which);
}

function goPlay() {
    t2=false;
    var intervalId = window.setInterval(function(){
        var ms;
        var size=t;
        if (size>60) {
            var j = 0;
            while (size>60) {
                size-=60;
                j+=1;
            }
            ms = `${j}:${size}`;
        } else {
            ms=`00:${size}`;
        }
        document.getElementById('curtime').innerHTML = String(ms);
        if (t2==false){
            t+=1;
        }
    }, 1000);
    socket.emit('pause', true);
}

function goPause() {
    t2=true;
    socket.emit('pause', false);
}

function goNext() {
    socket.emit('next', true);
}

function goBack() {
    socket.emit('back', true);
}

var playCheck = 0;
function playFile(wow) {
    if (wow) {
        goPlay();
        $('#play').remove();
        $('#playFile').append('<svg id="play" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-pause-circle" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M5 6.25a1.25 1.25 0 1 1 2.5 0v3.5a1.25 1.25 0 1 1-2.5 0v-3.5zm3.5 0a1.25 1.25 0 1 1 2.5 0v3.5a1.25 1.25 0 1 1-2.5 0v-3.5z"/></svg>');
    } else {
        if (playCheck ==0) {
            goPlay();
            $('#play').remove();
            $('#playFile').append('<svg id="play" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-pause-circle" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M5 6.25a1.25 1.25 0 1 1 2.5 0v3.5a1.25 1.25 0 1 1-2.5 0v-3.5zm3.5 0a1.25 1.25 0 1 1 2.5 0v3.5a1.25 1.25 0 1 1-2.5 0v-3.5z"/></svg>');
            //document.getElementById('pause').style.display = 'block';
            //document.getElementById('play').style.display = 'none';
            playCheck=1;
        } else {
            goPause();
            $('#play').remove();
            $('#playFile').append('<svg id="play" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-play-circle" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445z"/></svg>');
            //document.getElementById('play').style.display = 'block';
            //document.getElementById('pause').style.display = 'none';
            playCheck=0;
        }
    }
}