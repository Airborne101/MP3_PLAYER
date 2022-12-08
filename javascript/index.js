// ▼ 전역변수
let PLAY_LIST_INFO_OBJ_GLOBAL = null;
let SHUFFLE_LIST_ARRAY_GLOBAL = null;
// ▲ 전역변수

const JSMEDIATAGES = window.jsmediatags;
const AUDIO = document.querySelector(".audio");
const PLAY_BTN = document.getElementById("play-btn");
const PREV_BTN = document.getElementById("prev-btn");
const NEXT_BTN = document.getElementById("next-btn");
const START_TIME = document.getElementById("start-time");
const END_TIME = document.getElementById("end-time");
const BACKGROUND = document.getElementById("background");
const DISK = document.getElementById("disk");
const TITLE = document.getElementById("title");
const ARTIST = document.getElementById("artist");
const TIMELINE = document.getElementById("timeline");
const LOOP_BTN = document.getElementById("loop-btn");
const SHUFFLE_BTN = document.getElementById("shuffle-btn");
const VOLUME_WRAP = document.getElementById("volume-wrap");
const VOLUME_BTN = document.getElementById("volume-btn");
const VOLUME_RANGE = document.getElementById("volume-range");

const PLAY_LIST_SPREAD = document.getElementById("play-list-spread");
const PLAY_LIST_SPREAD_BAR = document.getElementById("play-list-spread-bar");
const PLAY_LIST_FOLDED = document.getElementById("play-list-folded");
const PLAY_LIST_FOLDED_BAR = document.getElementById("play-list-folded-bar");
const PLAY_LIST_INNER = document.getElementById("play-list-inner");
const ADD = document.getElementById("add");
const CLEAR = document.getElementById("clear");