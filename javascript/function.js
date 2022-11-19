const fileListCheck = function (fileList) {
  for (let i = 0; i < fileList.length; i++) {
    return fileList[i].name.split(".")[1] !== ("mp3" || "mp4" || "wav")
      ? alert("mp3, mp4, wav이 아닌 파일은 등록할 수 없습니다.")
      : true;
  }
};

const playMusic = function (file, audio, disk, background, title, artist) {
  // 파라미터(file)를 그대로 넘길 경우 Blob 에러 발생
  audio.src = URL.createObjectURL(file[0]);

  JSMEDIATAGES.read(file[0], {
    onSuccess: function (tag) {
      const data = tag.tags.picture.data;
      const format = tag.tags.picture.format;

      let base64string = "";

      for (let i = 0; i < data.length; i++) {
        base64string += String.fromCharCode(data[i]);
      }

      disk.style.backgroundImage = `url(data:${format};base64,${window.btoa(
        base64string
      )})`;
      background.style.backgroundImage = `url(data:${format};base64,${window.btoa(
        base64string
      )})`;

      title.textContent =
        tag.tags.title.length > 30
          ? tag.tags.title.substring(0, 30) + "..."
          : tag.tags.title;
      artist.textContent =
        tag.tags.artist.length > 30
          ? tag.tags.artist.substring(0, 30) + "..."
          : tag.tags.artist;
    },
    onError: function (error) {
      console.log(error);
    },
  });
  audio.autoplay = true;
};

const audioPlayEventFunction = function (event, endTime, timeline) {
  let minute = parseInt(event.target.duration / 60);
  let second = parseInt(event.target.duration - 60 * minute);

  minute < 10 ? (minute = "0" + minute) : minute;
  second < 10 ? (second = "0" + second) : second;

  endTime.textContent = `${minute}:${second}`;
  timeline.max = event.target.duration;
};

const audioTimeUpdateEventFunction = function (event, startTime, timeline) {
  let currentMinute = parseInt(event.target.currentTime / 60);
  let currentSceond = parseInt(event.target.currentTime - 60 * currentMinute);

  currentMinute < 10 ? (currentMinute = "0" + currentMinute) : currentMinute;
  currentSceond < 10 ? (currentSceond = "0" + currentSceond) : currentSceond;

  startTime.textContent = `${currentMinute}:${currentSceond}`;
  timeline.value = event.target.currentTime;
};

const timelineInputEventFunction = function (event, audio) {
  if (audio === null) return;
  audio.currentTime = event.target.value;
};
