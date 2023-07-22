var audio = document.getElementById("music");
var volumeIcon = document.getElementById("volumeIcon");

audio.volume = 0.6; //todo sound +-

function toggleAudio() {
  if (audio.paused) {
    audio.play();
    volumeIcon.src = "img/audio.png"; 
  } else {
    audio.pause();
    volumeIcon.src = "img/mute.png"; 
  }
}