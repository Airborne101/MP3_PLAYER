// ▼ 삭제 예정
INPUT_TEST.addEventListener("change", (event) => {
  const checkResult = fileListCheck(event.target.files);

  checkResult === true 
  ? playMusic(event.target.files, AUDIO, DISK, BACKGROUND, TITLE, ARTIST) 
  : null;
});
// ▲ 삭제 예정

AUDIO.addEventListener("play", (event) => {
    audioPlayEventFunction(event, END_TIME, TIMELINE);
});

AUDIO.addEventListener("timeupdate", (event) => {
    audioTimeUpdateEventFunction(event, START_TIME, TIMELINE);
});

TIMELINE.addEventListener("input", (event) => {
    timelineInputEventFunction(event, AUDIO);
});

