const checkString = (string, length)  => (string.length <= length);

checkString('проверяемая строка', 20);


const isPalindrom = (string) => {
  const changedString = string.replaceAll(' ', '').toUpperCase();
  let result = '';

  for (let i = changedString.length - 1; i >= 0; i--) {
    result += changedString.at(i);
  }
  if (result === changedString) {
    return true;
  } else {
    return false;
  }
};
isPalindrom('топот');

