const mp3 = document.querySelector(".mp3");
const play = document.querySelector(".play");
const replay = document.querySelector(".replay");
const outline = document.querySelector(".movingcircl3 circle");
const mp4 = document.querySelector(".videobackground video");
//Sounds
const videos = document.querySelectorAll(".mp4choice button");
//Time Display
const countDown = document.querySelector(".countdown");
const outlineLength = outline.getTotalLength();
//Duration
const timeChoice = document.querySelectorAll(".timechoice button");
let defaultDuration = 600.00;

outline.style.strokeDashoffset = outlineLength;
outline.style.strokeDasharray = outlineLength;
countDown.textContent = `${Math.floor((defaultDuration)/ 60.00)}:${'0'+Math.floor(
  defaultDuration % 60.00
)}`;



videos.forEach(video => {
  video.addEventListener("click", function() {
    mp3.src = this.getAttribute("data-sound");
    mp4.src = this.getAttribute("data-video");
    checkPlaying(mp3);
  });
});

play.addEventListener("click", function() {
	 checkPlaying(mp3);
    
});

replay.addEventListener("click", function() {
    restartmp3(mp3);
    
  });


const restartmp3 = mp3 =>{
    let currentTime = mp3.currentTime;
    mp3.currentTime = 0;
	mp4.currentTime = 0;


}

timeChoice.forEach(option => {
  option.addEventListener("click", function() {
    defaultDuration = this.getAttribute("data-time");
    countDown.textContent = `${Math.floor(defaultDuration / 60.00)}:${'0'+Math.floor(
      defaultDuration % 60.00
    )}`;
  });
});

const checkPlaying = mp3 => {
  if (mp3.paused) {
    mp3.play();
    mp4.play();
    play.src = "svg/pause.svg";
  } else {
    mp3.pause();
    mp4.pause();
    play.src = "svg/play.svg";
  }
};

mp3.ontimeupdate = function() {
  let currentTime = mp3.currentTime;
  let elapsed = defaultDuration - currentTime;
  let seconds = Math.floor(elapsed % 60.00);
  let minutes = Math.floor(elapsed / 60.00);
  countDown.textContent = `${minutes}:${('0'+seconds).slice(-2)}`;
  let progress = outlineLength - (currentTime / defaultDuration) * outlineLength;
  outline.style.strokeDashoffset = progress;


  if (currentTime >= defaultDuration) {
    mp3.pause();
    mp3.currentTime = 0;
    play.src = "svg/play.svg";
    mp4.pause();
  }
}