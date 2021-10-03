import images from "./images";

const myMemories = [
  {
    id: 1,
    name: "해바라기",
    image: images.sunflowers,
  },
  {
    id: 2,
    name: "사슴",
    image: images.deer,
  },
  {
    id: 3,
    name: "블록",
    image: images.blocks,
  },
];

const wordList = [
  {
    initial: "ㅇㅇ",
    vowel: ["ㅕㅜ", "ㅗㅣ"],
    word: ["여우", "오이"],
    answer: "오이",
    vowel_answer: "ㅗㅣ",
  },
  {
    initial: "ㅇㄷ",
    vowel: ["ㅓㅣ", "ㅗㅣ"],
    word: ["어디", "오디"],
    answer: "어디",
    vowel_answer: "ㅓㅣ",
  },
  {
    initial: "ㅅㄹ",
    vowel: ["ㅗㅣ", "ㅔㅗ"],
    word: ["소리", "세로"],
    answer: "세로",
    vowel_answer: "ㅔㅗ",
  },
  {
    initial: "ㄱㅅ",
    vowel: ["ㅣㅏ", "ㅏㅣ"],
    word: ["기사", "가시"],
    answer: "기사",
    vowel_answer: "ㅣㅏ",
  },
  {
    initial: "ㅇㅈ",
    vowel: ["ㅓㅔ", "ㅜㅜ"],
    word: ["어제", "우주"],
    answer: "어제",
    vowel_answer: "ㅓㅔ",
  },
];

const score = [
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
  {
    id: 4,
  },
  {
    id: 5,
  },
];

export default {
  myMemories,
  wordList,
  score,
};
