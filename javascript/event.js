// ▼ 삭제 예정
INPUT_TEST.addEventListener("change", async (event) => {
  const resultObj =
    (await fileListCheck(event.target.files)) === true
      ? await createPlayList(event.target.files)
      : null;

  PLAY_LIST_INFO_OBJ_GLOBAL !== null
    ? Object.assign(PLAY_LIST_INFO_OBJ_GLOBAL, resultObj)
    : (PLAY_LIST_INFO_OBJ_GLOBAL = resultObj);

  AUDIO.src === ""
    ? playMusic(
        PLAY_LIST_INFO_OBJ_GLOBAL[Object.keys(PLAY_LIST_INFO_OBJ_GLOBAL)[0]]
      )
    : null;
});
// ▲ 삭제 예정

AUDIO.addEventListener("durationchange", (event) => {
  const resultArray = changeTimeAtOnce(event.target.duration);
  END_TIME.textContent = `${resultArray[0]}:${resultArray[1]}`;
  TIMELINE.max = event.target.duration;
  PLAY_BTN.classList.remove(
    "mp3-container__device__body__bottons-wrap__play-btn--hover"
  );
  PLAY_BTN.classList.add(
    "mp3-container__device__body__bottons-wrap__pause-btn--hover"
  );
  DISK.classList.remove("mp3-container__device__head__disk__pause");
  AUDIO.volume = VOLUME_RANGE.value * 0.01;
  AUDIO.currentTime = 0;
});

AUDIO.addEventListener("timeupdate", (event) => {
  const returnArray = changeTimeToRealTime(event.target.currentTime);
  START_TIME.textContent = `${returnArray[0]}:${returnArray[1]}`;
  TIMELINE.value = event.target.currentTime;
});

AUDIO.addEventListener("ended", () => {
  TIMELINE.value = 0;
  START_TIME.textContent = `00:00`;
  PLAY_BTN.classList.add(
    "mp3-container__device__body__bottons-wrap__play-btn--hover"
  );
  PLAY_BTN.classList.remove(
    "mp3-container__device__body__bottons-wrap__pause-btn--hover"
  );
  DISK.classList.add("mp3-container__device__head__disk__pause");
});

TIMELINE.addEventListener("input", (event) => {
  AUDIO.currentTime = chnageAudioCurrentTime(event.target.value, AUDIO);
});

PLAY_BTN.addEventListener("click", (event) => {
  AUDIO.src !== "" && AUDIO.paused === false
    ? AUDIO.pause()
    : AUDIO.paused === true
    ? AUDIO.play()
    : null;
  PLAY_BTN.classList.toggle(
    "mp3-container__device__body__bottons-wrap__play-btn--hover"
  );
  PLAY_BTN.classList.toggle(
    "mp3-container__device__body__bottons-wrap__pause-btn--hover"
  );
  DISK.classList.toggle("mp3-container__device__head__disk__pause");
});

LOOP_BTN.addEventListener("click", () => {
  LOOP_BTN.classList.toggle(
    "mp3-container__device__body__bottons-wrap__loop-btn--hover"
  );
  LOOP_BTN.classList.toggle(
    "mp3-container__device__body__bottons-wrap__loop-btn-active--hover"
  );
  AUDIO.loop = AUDIO.loop === true ? false : true;
});

VOLUME_BTN.addEventListener("click", () => {
  AUDIO.muted = AUDIO.muted === true ? false : true;
  VOLUME_BTN.classList.toggle(
    "mp3-container__device__body__bottons-wrap__volume-wrap__volume-btn--hover"
  );
  VOLUME_BTN.classList.toggle(
    "mp3-container__device__body__bottons-wrap__volume-wrap__volume-btn-mute--hover"
  );
});

VOLUME_BTN.addEventListener("mouseenter", () => {
  VOLUME_RANGE.classList.remove("mp3-container__device__body__bottons-wrap__volume-wrap__volume-range--hidden");
})

VOLUME_WRAP.addEventListener("mouseleave", () => {
  VOLUME_RANGE.classList.add("mp3-container__device__body__bottons-wrap__volume-wrap__volume-range--hidden");
})

VOLUME_RANGE.addEventListener("input", (event) => {
  AUDIO.volume = event.target.value * 0.01;
  if (AUDIO.volume === 0) {
    VOLUME_BTN.classList.add(
      "mp3-container__device__body__bottons-wrap__volume-wrap__volume-btn-mute--hover"
    );
    VOLUME_BTN.classList.remove(
      "mp3-container__device__body__bottons-wrap__volume-wrap__volume-btn--hover"
    );
    AUDIO.muted = true;
  } else {
    VOLUME_BTN.classList.add(
      "mp3-container__device__body__bottons-wrap__volume-wrap__volume-btn--hover"
    );
    VOLUME_BTN.classList.remove(
      "mp3-container__device__body__bottons-wrap__volume-wrap__volume-btn-mute--hover"
    );
    AUDIO.muted = false;
  }
});
