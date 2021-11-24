const fs = require('fs');
const getMP3Duration = require('get-mp3-duration');

function getFiles() {
    var file2=[];
    fs.readdirSync("./public/music/").forEach(file => {
        file2.push(file);
    });
    return file2;
}

function getSongData(song) {
    if (song!==null) {
        const buffer = fs.readFileSync(`./public/music/${song}`);
        const duration = getMP3Duration(buffer);
        return duration/1000;
    } else {
        return 0;
    }
}
module.exports = {
    getFiles,
    getSongData
};