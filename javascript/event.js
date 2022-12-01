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

  if (nextMusic === undefined && LOOP_BTN.getAttribute("data-loopall") === null) {
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
  else if (nextMusic === undefined && LOOP_BTN.getAttribute("data-loopall")) {
    playMusic(Object.keys(PLAY_LIST_INFO_OBJ_GLOBAL)[0]);
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
  prevMusic !== undefined ? playMusic(prevMusic) : null;
});

NEXT_BTN.addEventListener("click", (event) => {
  const nextMusic = changeMusic(
    event.target.id,
    PLAY_LIST_INFO_OBJ_GLOBAL,
    AUDIO.id
  );
  nextMusic !== undefined ? playMusic(nextMusic) : null;
});

LOOP_BTN.addEventListener("click", () => {
  // loop all
  if (LOOP_BTN.getAttribute("data-loopall") === null) {
    LOOP_BTN.classList.remove(
      "mp3-container__device__body__bottons-wrap__loop-btn--hover"
    );
    LOOP_BTN.classList.add(
      "mp3-container__device__body__bottons-wrap__loop-btn-active--hover"
    );
    LOOP_BTN.setAttribute("data-loopall", true);
  }
  // loop one
  else if (LOOP_BTN.getAttribute("data-loopall") && AUDIO.loop === false) {
    LOOP_BTN.classList.remove(
      "mp3-container__device__body__bottons-wrap__loop-btn-active--hover"
    );
    LOOP_BTN.classList.add(
      "mp3-container__device__body__bottons-wrap__loop-one-btn-active--hover"
    )
    AUDIO.loop = setLoop(!AUDIO.loop);
  }
  // none loop
  else if (LOOP_BTN.getAttribute("data-loopall") && AUDIO.loop === true) {
    AUDIO.loop = setLoop(!AUDIO.loop);
    LOOP_BTN.removeAttribute("data-loopall");
    LOOP_BTN.classList.remove(
      "mp3-container__device__body__bottons-wrap__loop-one-btn-active--hover"
    )
    LOOP_BTN.classList.add(
      "mp3-container__device__body__bottons-wrap__loop-btn--hover"
    );
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
