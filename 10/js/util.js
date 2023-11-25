//Модуль с вспомогательными функциями

//Получение случайных чисел
const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

//Обработчик события клика на Escape
const isEscapeKey = (evt) => evt.key === 'Escape';

//Получение случайного элемента массива
const getRandomArrayElement = (arr) => arr[getRandomInteger(0, arr.length - 1)];

export {getRandomArrayElement};
export {getRandomInteger};
export {isEscapeKey};


