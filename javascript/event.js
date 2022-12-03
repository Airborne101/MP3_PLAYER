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
    ? playMusic(Object.keys(PLAY_LIST_INFO_OBJ_GLOBAL)[0])
    : null;
});
// ▲ 삭제 예정

AUDIO.addEventListener("durationchange", (event) => {
  const resultArray = changeTimeAtOnce(event.target.duration);
  END_TIME.textContent = `${resultArray[0]}:${resultArray[1]}`;
  TIMELINE.max = setTimeline(event.target.duration);
  PLAY_BTN.classList.remove(
    "mp3-container__device__body__bottons-wrap__play-btn--hover"
  );
  PLAY_BTN.classList.add(
    "mp3-container__device__body__bottons-wrap__pause-btn--hover"
  );
  DISK.classList.remove("mp3-container__device__head__disk__pause");
  AUDIO.volume = setVolume(VOLUME_RANGE.value);
  AUDIO.currentTime = setCurrentTime(0);
});

AUDIO.addEventListener("timeupdate", (event) => {
  const returnArray = changeTimeToRealTime(event.target.currentTime);
  START_TIME.textContent = `${returnArray[0]}:${returnArray[1]}`;
  TIMELINE.value = setTimeline(event.target.currentTime);
});

AUDIO.addEventListener("ended", () => {
  const nextMusic = changeMusic(
    "next-btn",
    PLAY_LIST_INFO_OBJ_GLOBAL,
    AUDIO.id
  );
  
  if( Number.isNaN(parseInt(nextMusic)) && LOOP_BTN.getAttribute("data-loopall") ) {
    playMusic(createLoop(nextMusic, PLAY_LIST_INFO_OBJ_GLOBAL));
  }
  else if( Number.isNaN(parseInt(nextMusic)) && !LOOP_BTN.getAttribute("data-loopall") ) {
    TIMELINE.value = setTimeline(0);
    START_TIME.textContent = `00:00`;
    PLAY_BTN.classList.add(
      "mp3-container__device__body__bottons-wrap__play-btn--hover"
    );
    PLAY_BTN.classList.remove(
      "mp3-container__device__body__bottons-wrap__pause-btn--hover"
    );
    DISK.classList.add("mp3-container__device__head__disk__pause");
  }
  else {
    playMusic(nextMusic);
  }
});

TIMELINE.addEventListener("input", (event) => {
  AUDIO.currentTime = setCurrentTime(event.target.value);
});

PLAY_BTN.addEventListener("click", () => {
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

PREV_BTN.addEventListener("click", (event) => {
  const prevMusic = changeMusic(
    event.target.id,
    PLAY_LIST_INFO_OBJ_GLOBAL,
    AUDIO.id
  );

  Number.isNaN(parseInt(prevMusic)) && LOOP_BTN.getAttribute("data-loopall")
  ? playMusic(createLoop(prevMusic, PLAY_LIST_INFO_OBJ_GLOBAL))
  : playMusic(prevMusic);
});

NEXT_BTN.addEventListener("click", (event) => {
  const nextMusic = changeMusic(
    event.target.id,
    PLAY_LIST_INFO_OBJ_GLOBAL,
    AUDIO.id
  );

  Number.isNaN(parseInt(nextMusic)) && LOOP_BTN.getAttribute("data-loopall")
  ? playMusic(createLoop(nextMusic, PLAY_LIST_INFO_OBJ_GLOBAL))
  : playMusic(nextMusic);
});

LOOP_BTN.addEventListener("click", () => {
  // non loop
  if (AUDIO.loop === false && !LOOP_BTN.getAttribute("data-loopall")) {
    AUDIO.loop = setLoop(!AUDIO.loop);
    LOOP_BTN.classList.remove(
      "mp3-container__device__body__bottons-wrap__loop-btn"
    );
    LOOP_BTN.classList.add(
      "mp3-container__device__body__bottons-wrap__loop-one-btn-active"
    );
  }
  // loop one
  else if (AUDIO.loop === true) {
    AUDIO.loop = setLoop(!AUDIO.loop);
    LOOP_BTN.setAttribute("data-loopall", true);
    LOOP_BTN.classList.remove(
      "mp3-container__device__body__bottons-wrap__loop-one-btn-active"
    );
    LOOP_BTN.classList.add(
      "mp3-container__device__body__bottons-wrap__loop-btn-active"
    );
  }
  // loop all
  else if (AUDIO.loop === false && LOOP_BTN.getAttribute("data-loopall")) {
    LOOP_BTN.removeAttribute("data-loopall");
    LOOP_BTN.classList.remove(
      "mp3-container__device__body__bottons-wrap__loop-btn-active"
    );
    LOOP_BTN.classList.add(
      "mp3-container__device__body__bottons-wrap__loop-btn"
    );
  }
});

SHUFFLE_BTN.addEventListener("click", () => {
  SHUFFLE_BTN.classList.toggle("mp3-container__device__body__bottons-wrap__shuffle-btn-active");
  SHUFFLE_BTN.classList.toggle("mp3-container__device__body__bottons-wrap__shuffle-btn");

  if(SHUFFLE_BTN.getAttribute("data-shuffle") === null) {
    SHUFFLE_BTN.setAttribute("data-shuffle", true);
    SHUFFLE_LIST_ARRAY_GLOBAL = createShuffleArray(PLAY_LIST_INFO_OBJ_GLOBAL);
  }
  else {
    SHUFFLE_BTN.removeAttribute("data-shuffle");
    SHUFFLE_LIST_ARRAY_GLOBAL = setNull();
  }
  
});

VOLUME_BTN.addEventListener("click", () => {
  AUDIO.muted = setMuted(!AUDIO.muted);
  VOLUME_BTN.classList.toggle(
    "mp3-container__device__body__bottons-wrap__volume-wrap__volume-btn--hover"
  );
  VOLUME_BTN.classList.toggle(
    "mp3-container__device__body__bottons-wrap__volume-wrap__volume-btn-mute--hover"
  );
});

VOLUME_BTN.addEventListener("mouseenter", () => {
  VOLUME_RANGE.classList.remove(
    "mp3-container__device__body__bottons-wrap__volume-wrap__volume-range--hidden"
  );
});

VOLUME_WRAP.addEventListener("mouseleave", () => {
  VOLUME_RANGE.classList.add(
    "mp3-container__device__body__bottons-wrap__volume-wrap__volume-range--hidden"
  );
});

VOLUME_RANGE.addEventListener("input", (event) => {
  AUDIO.volume = setVolume(event.target.value);
  if (AUDIO.volume === 0) {
    VOLUME_BTN.classList.add(
      "mp3-container__device__body__bottons-wrap__volume-wrap__volume-btn-mute--hover"
    );
    VOLUME_BTN.classList.remove(
      "mp3-container__device__body__bottons-wrap__volume-wrap__volume-btn--hover"
    );
    AUDIO.muted = setMuted(true);
  } else {
    VOLUME_BTN.classList.add(
      "mp3-container__device__body__bottons-wrap__volume-wrap__volume-btn--hover"
    );
    VOLUME_BTN.classList.remove(
      "mp3-container__device__body__bottons-wrap__volume-wrap__volume-btn-mute--hover"
    );
    AUDIO.muted = setMuted(false);
  }
});
