import { isEscapeKey } from './util.js';

const MAX_HASHTAGS_COUNT = 5;
const MAX_COMMENT_LENGTH = 140;

const bodyElement = document.querySelector('body');
const formElement = document.querySelector('.img-upload__form');
const imageUploadInput = formElement.querySelector('.img-upload__input');
const imageOverlay = formElement.querySelector('.img-upload__overlay');
const cancelButtonElement = formElement.querySelector('.img-upload__cancel');
const commentField = formElement.querySelector('.text__description');
const hashtagField = formElement.querySelector('.text__hashtags');
const hashtagRegExp = /^#[a-zа-яё0-9]{1,19}$/i;

const closeImageOverlay =() => {
  bodyElement.classList.remove('modal-open');
  imageOverlay.classList.add('hidden');
  cancelButtonElement.removeEventListener('click', closeImageOverlay);
  document.removeEventListener('keydown', onDocumentKeyDown);
  imageUploadInput.value = '';
};

//Функция объявлена после closeImageOverlay, чтобы эти функции не закольцовывались
function onDocumentKeyDown(evt) {
  if(isEscapeKey) {
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
  cancelButtonElement.addEventListener('click', closeImageOverlay);
  document.addEventListener('keydown', onDocumentKeyDown);
});

const pristine = new Pristine(formElement, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload--invalid',
  successClass: 'img-upload--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__error'
});

const validateComment = (value) => value.length <= MAX_COMMENT_LENGTH;

pristine.addValidator(commentField, validateComment, 'Комментарий не более 140 символов');

const validateHashtagsCount = (value) => value.trim().split(' ').length <= MAX_HASHTAGS_COUNT;

const validateHashtags = (value) => value.trim() === '' ? true : value.trim().split(' ').every((hashtag) => hashtagRegExp.test(hashtag));

const validateHashtagsUniqueness  = (value) => {
  const hashtags = value.trim().split(' ');
  const tempArr = [];

  for (let i = 0; i < hashtags.length; i++){
    if(tempArr.includes(hashtags[i])){
      return false;
    }
    else {
      tempArr.push(hashtags[i]);
    }
  }

  return true;
};

pristine.addValidator(hashtagField, validateHashtagsCount, 'Слишком много хэш-тегов');
pristine.addValidator(hashtagField, validateHashtags, 'Есть ошибочный хэш-тег');
pristine.addValidator(hashtagField, validateHashtagsUniqueness, 'Такой хэш-тег уже был');

formElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    closeImageOverlay();
    evt.target.reset();
  }
});
