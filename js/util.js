//Модуль с вспомогательными функциями

const DELAY = 500;

//Получение случайных чисел
const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

//Обработчик события клика на Escape
const isEscapeKey = (evt) => evt.key === 'Escape';

const getRandomArrayElement = (pictures, count) => {
  const copiedArray = pictures.slice();
  const randomArrayElements = [];

  for (let i = 0; i < count; i++) {
    const randomIndex = getRandomInteger(0, copiedArray.length - 1);
    randomArrayElements.push(copiedArray[randomIndex]);
    copiedArray.splice(randomIndex, 1);
  }

  return randomArrayElements;
};

const debounce = (callback, timeoutDelay = DELAY) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {getRandomArrayElement};
export {getRandomInteger};
export {isEscapeKey};
export {debounce};


