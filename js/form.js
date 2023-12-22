import { isEscapeKey } from './util.js';
import {sendData} from './api.js';
import {showSuccessMessage, showErrorMessage} from './message.js';

const MAX_HASHTAGS_COUNT = 5;
const MAX_COMMENT_LENGTH = 140;
const HASHTAG_REGEXP = /^#[a-zа-яё0-9]{1,19}$/i;

const bodyElement = document.querySelector('body');
const formElement = document.querySelector('.img-upload__form');
const imageUploadInput = formElement.querySelector('.img-upload__input');
const imageOverlay = formElement.querySelector('.img-upload__overlay');
const cancelButtonElement = formElement.querySelector('.img-upload__cancel');
const commentField = formElement.querySelector('.text__description');
const hashtagField = formElement.querySelector('.text__hashtags');
const imagePreview = document.querySelector('.img-upload__preview img');
const submitButton = formElement.querySelector('.img-upload__submit');

const pristine = new Pristine(formElement, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload--invalid',
  successClass: 'img-upload--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__error'
});

const closeImageOverlay =() => {
  bodyElement.classList.remove('modal-open');
  imageOverlay.classList.add('hidden');
  cancelButtonElement.removeEventListener('click', closeImageOverlay);
  document.removeEventListener('keydown', onDocumentKeyDown);
  imageUploadInput.value = '';
  pristine.reset();
};

//Функция объявлена после closeImageOverlay, чтобы эти функции не закольцовывались
function onDocumentKeyDown(evt) {
  if(isEscapeKey(evt)) {
    const activeElement = document.activeElement.attributes.type;

    if (typeof(activeElement) !== 'undefined' && activeElement.value === 'text'){
      evt.stopPropagation();
    }
    else {
      closeImageOverlay();
    }
  }
}

imageUploadInput.addEventListener('change', () => {
  imageOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.querySelector('.effect-level__slider').parentNode.classList.add('hidden');
  document.querySelector('.scale__control--value').value = '100%';
  imagePreview.removeAttribute('style');
  cancelButtonElement.addEventListener('click', closeImageOverlay);
  document.addEventListener('keydown', onDocumentKeyDown);
});

const validateComment = (value) => value.length <= MAX_COMMENT_LENGTH;

pristine.addValidator(commentField, validateComment, `Комментарий не более ${MAX_COMMENT_LENGTH} символов`);

const validateHashtagsCount = (value) => value.trim().split(' ').length <= MAX_HASHTAGS_COUNT;

const validateHashtags = (value) => value.trim() === '' ? true : value.trim().split(' ').every((hashtag) => HASHTAG_REGEXP.test(hashtag));

const validateHashtagsUniqueness  = (value) => {
  const hashtags = value.trim().split(' ');
  const tempElements = [];

  for (let i = 0; i < hashtags.length; i++){
    if(tempElements.includes(hashtags[i])){
      return false;
    }
    else {
      tempElements.push(hashtags[i]);
    }
  }

  return true;
};

pristine.addValidator(hashtagField, validateHashtagsCount, 'Слишком много хэш-тегов');
pristine.addValidator(hashtagField, validateHashtags, 'Есть ошибочный хэш-тег');
pristine.addValidator(hashtagField, validateHashtagsUniqueness, 'Такой хэш-тег уже был');

formElement.addEventListener('submit', async(evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    submitButton.disabled = true;
    await sendData(new FormData(formElement))
      .then(() => {
        showSuccessMessage();
        commentField.value = '';
        hashtagField.value = '';
      })
      .catch(() => showErrorMessage());
    submitButton.disabled = false;
    closeImageOverlay();
  }
});
