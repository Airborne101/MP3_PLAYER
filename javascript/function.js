const fileListCheck = function (fileList) {
  let result = true;
  let fileExtenstion = null;
  for (let i = 0; i < fileList.length; i++) {
    fileExtenstion = fileList[i].name.split(".")[1];
    if (
      fileExtenstion !== "mp3" &&
      fileExtenstion !== "mp4" &&
      fileExtenstion !== "wav"
    ) {
      alert("mp3, mp4, wav이 아닌 파일은 등록할 수 없습니다.");
      result = false;
      break;
    }
  }
  return result;
};

const createPlayList = function (fileList) {
  let musicInfoObj = {};
  const returnObj = {};

  for (let i = 0; i < fileList.length; i++) {
    JSMEDIATAGES.read(fileList[i], {
      onSuccess: function (tag) {
        const id = Date.now();
        const data = tag.tags.picture.data;
        const format = tag.tags.picture.format;

        const div = document.createElement("div");
        const h1_title = document.createElement("h1");
        const h1_artist = document.createElement("h1");
        const img = document.createElement("img");

        let base64string = "";

        for (let j = 0; j < data.length; j++) {
          base64string += String.fromCharCode(data[j]);
        }

        const imgUrl = `data:${format};base64,${window.btoa(base64string)}`;

        musicInfoObj.audioUrl = URL.createObjectURL(fileList[i]);
        musicInfoObj.imgUrl = `url(${imgUrl})`;

        musicInfoObj.title =
          tag.tags.title.length > 25
            ? tag.tags.title.substring(0, 25) + "..."
            : tag.tags.title;

        musicInfoObj.artist =
          tag.tags.artist.length > 30
            ? tag.tags.artist.substring(0, 30) + "..."
            : tag.tags.artist;

        div.setAttribute("id", `div_${id}`);
        div.classList.add("play-list-spread__inner__wrap");

        h1_title.classList.add("play-list-spread__inner__wrap__title");
        h1_title.innerText = `${musicInfoObj.title}`;

        h1_artist.classList.add("play-list-spread__inner__wrap__artist");
        h1_artist.innerText = `${musicInfoObj.artist}`;

        img.classList.add("play-list-spread__inner__wrap__img");
        img.setAttribute("src", imgUrl);

        div.appendChild(h1_title);
        div.appendChild(h1_artist);
        div.appendChild(img);
        PLAY_LIST_INNER.appendChild(div);

        returnObj[id] = musicInfoObj;
        musicInfoObj = {};

        // ▼ 순수함수로 만들면 async await promise를 사용해도 순서 보장 안됨
        PLAY_LIST_INFO_OBJ_GLOBAL !== null
          ? Object.assign(PLAY_LIST_INFO_OBJ_GLOBAL, returnObj)
          : (PLAY_LIST_INFO_OBJ_GLOBAL = returnObj);

        AUDIO.src === ""
          ? playMusic(Object.keys(PLAY_LIST_INFO_OBJ_GLOBAL)[0])
          : null;
        // ▲
      },
      onError: function (error) {
        console.log(error);
      },
    });
  }
};

const playMusic = function (objId, prevObjId) {
  if (Number.isNaN(parseInt(objId))) return;

  if (prevObjId !== undefined) {
    const prevPlayListDiv = document.getElementById(`div_${prevObjId}`);
    prevPlayListDiv.style.backgroundColor = "white";
  }

  const targetObj = PLAY_LIST_INFO_OBJ_GLOBAL[objId];

  const playListDiv = document.getElementById(`div_${objId}`);
  playListDiv.style.backgroundColor = "rgb(255, 219, 219)";

  AUDIO.id = objId;
  AUDIO.src = targetObj.audioUrl;
  BACKGROUND.style.backgroundImage = targetObj.imgUrl;
  DISK.style.backgroundImage = targetObj.imgUrl;
  TITLE.textContent = targetObj.title;
  ARTIST.textContent = targetObj.artist;
  AUDIO.play();
};

const changeMusic = function (eventId, fileList, id, shuffle) {
  if (fileList === null) return;

  const fileListArray = shuffle !== null ? shuffle : Object.keys(fileList);

  const musicIndex =
    eventId === "prev-btn"
      ? fileListArray.indexOf(id) - 1
      : fileListArray.indexOf(id) + 1;

  return fileListArray[musicIndex] !== undefined
    ? fileListArray[musicIndex]
    : eventId;
};

const createLoop = function (direction, fileList, shuffle) {
  const fileListArray = shuffle !== null ? shuffle : Object.keys(fileList);
  return direction === "prev-btn"
    ? fileListArray[fileListArray.length - 1]
    : fileListArray[0];
};

const changeTimeAtOnce = function (time) {
  let minute = parseInt(time / 60);
  let second = parseInt(time - 60 * minute);

  minute < 10 ? (minute = "0" + minute) : minute;
  second < 10 ? (second = "0" + second) : second;

  return [minute, second];
};

const changeTimeToRealTime = function (time) {
  let currentMinute = parseInt(time / 60);
  let currentSceond = parseInt(time - 60 * currentMinute);

  currentMinute < 10 ? (currentMinute = "0" + currentMinute) : currentMinute;
  currentSceond < 10 ? (currentSceond = "0" + currentSceond) : currentSceond;

  return [currentMinute, currentSceond];
};

const setCurrentTime = function (time) {
  return time;
};

const setTimeline = function (value) {
  return value;
};

const setVolume = function (value) {
  return value * 0.01;
};

const setLoop = function (loop) {
  return loop;
};

const setMuted = function (mute) {
  return mute;
};

const createShuffleArray = function (fileList, audioId) {
  let shuffleArray = Object.keys(fileList).sort(() => 0.5 - Math.random());
  shuffleArray.unshift(
    ...shuffleArray.splice(shuffleArray.indexOf(audioId), 1)
  );
  return shuffleArray;
};

const setNull = function () {
  return null;
};
