function checkString(string, length) {
  if (string.length <= length) {
    return true;
  } else {
    return false;
  }
}
checkString('проверяемая строка', 20);


function isPalindrom(string) {
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
}
isPalindrom('топот');

