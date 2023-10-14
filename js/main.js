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

//Количество сгенерированных объектов
const countObjects = 25;

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

const getPhotoId = createRandomIdFromRangeGenerator(1, 25);
const getCommentId = createRandomIdFromRangeGenerator(1, 300);

//Получение случайного элемента массива
const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

//Массив объектов — список комментариев
const createComments = () => ({
  id: getCommentId(1, 300),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: `${getRandomArrayElement(MESSAGES)}`,
  name: `${getRandomArrayElement(NAMES)}`,
});

//Структура объекта
const createObject = () => ({
  id: getPhotoId(1, 25),
  url: `photos/${getRandomInteger(1, 25)}.jpg`,
  description: `${getRandomArrayElement(DESCRIPTIONS)}`,
  likes: getRandomInteger(15, 200),
  comments: createComments(0, 30),
});

//Массив из 25 сгенерированных объектов
const similarObjects = () => Array.from({length: countObjects}, createObject);

similarObjects();
