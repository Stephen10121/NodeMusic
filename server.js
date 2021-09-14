const Troubadour = require('troubadour');
const troubadour = new Troubadour('vlc');

troubadour.on('start', () => {
    // Do something here when the audio starts playing
  });
  
  troubadour.on('end', () => {
    // Do something here when the audio finishes playing
  });
  
  troubadour.play('./sample.mp3');