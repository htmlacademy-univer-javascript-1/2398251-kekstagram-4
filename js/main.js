const COUNT_OBJECTS = 25;
const MIN_PHOTO_ID = 1;
const MAX_PHOTO_ID = 25;
const MIN_COMMENT_ID = 1;
const MAX_COMMENT_ID = 300;
const MIN_AVATAR_ID = 1;
const MAX_AVATAR_ID = 6;
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MIN_URL_ID = 1;
const MAX_URL_ID = 25;

const DESCRIPTIONS = [
  'Будь счастлив именно сейчас в текущий момент. Потому что твоя жизнь всегда состоит из текущих моментов.',
  'Будьте героями своих собственных историй!',
  'Реальность становится всё больше похожа на фотографии.',
  'В любой ситуации всегда улыбайтесь.',
  'В последнее время меня начинают преследовать умные мысли. Но я пока успеваю от них убежать…',
  'В простоте есть удивительная красота.',
  'Ваша скорость не имеет значения, пока вы продолжаете двигаться вперед.',
  'На всякий случай, а то вдруг вы забыли, как я выгляжу…',
  'Время драгоценно, поэтому всегда тратьте его мудро.',
  'Все что имеет значение — это просто быть собой.'
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Илья',
  'Максим',
  'Роман',
  'Михаил',
  'Иван',
  'Мария',
  'Елизавета',
  'Анастасия',
  'Анна',
  'Екатерина'
];

//Получение случайных чисел
const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

//Функция-генератор для получения уникальных идентификаторов из указанного диапазона
const createRandomIdFromRangeGenerator = (min, max) => {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

const getPhotoId = createRandomIdFromRangeGenerator(MIN_PHOTO_ID, MAX_PHOTO_ID);
const getCommentId = createRandomIdFromRangeGenerator(MIN_COMMENT_ID, MAX_COMMENT_ID);

//Получение случайного элемента массива
const getRandomArrayElement = (arr) => arr[getRandomInteger(0, arr.length - 1)];

//Массив объектов — список комментариев
const createComments = () => ({
  id: getCommentId(),
  avatar: `img/avatar-${getRandomInteger(MIN_AVATAR_ID, MAX_AVATAR_ID)}.svg`,
  message: `${getRandomArrayElement(MESSAGES)}`,
  name: `${getRandomArrayElement(NAMES)}`,
});

//Структура объекта
const createObject = () => ({
  id: getPhotoId(1, 25),
  url: `photos/${getRandomInteger(MIN_URL_ID, MAX_URL_ID)}.jpg`,
  description: `${getRandomArrayElement(DESCRIPTIONS)}`,
  likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
  comments: createComments(),
});

//Массив из 25 сгенерированных объектов
const similarObjects = () => Array.from({length: COUNT_OBJECTS}, createObject);

similarObjects();
