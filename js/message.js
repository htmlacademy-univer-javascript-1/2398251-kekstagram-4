import {isEscapeKey} from './util.js';

const successMessage = document
  .querySelector('#success')
  .content.querySelector('.success');

const errorMessage = document
  .querySelector('#error')
  .content.querySelector('.error');

const bodyElement = document.querySelector('body');

const hideMessage = () => {
  const message = document.querySelector('.success') || document.querySelector('.error');
  const closeButtonClass = document.querySelector('.success__button') || document.querySelector('.error__button');
  document.removeEventListener('keydown', closeByEscape);
  bodyElement.removeEventListener('click', closeByBodyClick);
  closeButtonClass.removeEventListener('click', hideMessage);
  message.remove();
};

//Функция объявлена после hideMessage, чтобы эти функции не закольцовывались
function closeByBodyClick(evt) {
  if (!(evt.target.closest('.success__inner') || evt.target.closest('.error__inner'))) {
    hideMessage();
  }
}

//Функция объявлена после hideMessage, чтобы эти функции не закольцовывались
function closeByEscape(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideMessage();
  }
}

const showMessage = (messageElement, messageCloseButton) => {
  bodyElement.append(messageElement);
  document.addEventListener('keydown', closeByEscape);
  bodyElement.addEventListener('click', closeByBodyClick);
  bodyElement.querySelector(messageCloseButton).addEventListener('click', hideMessage);
};

const showSuccessMessage = () => showMessage(successMessage, '.success__button');

const showErrorMessage = () => showMessage(errorMessage, '.error__button');

export {showSuccessMessage, showErrorMessage};
