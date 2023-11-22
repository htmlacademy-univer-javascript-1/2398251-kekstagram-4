import {isEscapeKey} from './util.js';

const bigPictureElement = document.querySelector('.big-picture');
const commentListElement = bigPictureElement.querySelector('.social__comments');
const bodyElement = document.querySelector('body');
const cancelButtonElement = bigPictureElement.querySelector('#picture-cancel');
const commentTemplate = bigPictureElement.querySelector('.social__comment');

const createComments = (comments) => {
  const fragment = document.createDocumentFragment();

  comments.forEach((comment) => {
    const clonedComment = commentTemplate.cloneNode(true);

    const {avatar, name, message} = comment;

    clonedComment.querySelector('.social__picture').src = avatar;
    clonedComment.querySelector('.social__picture').alt = name;
    clonedComment.querySelector('.social__text').textContent = message;

    fragment.append(clonedComment);
  });

  commentListElement.innerHTML = '';
  commentListElement.append(fragment);
};

const closeBigPicture = () => {
  bodyElement.classList.remove('modal-open');
  bigPictureElement.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeyDown);
};

//Функция объявлена после closeBigPicture, чтобы эти функции не закольцовывались
function onDocumentKeyDown()  {
  if (isEscapeKey) {
    closeBigPicture();
  }
}

const openBigPicture = (picture) => {
  bodyElement.classList.add('modal-open');
  bigPictureElement.classList.remove('hidden');

  const {url, likes, description, comments} = picture;

  bigPictureElement.querySelector('.big-picture__img img').src = url;
  bigPictureElement.querySelector('.likes-count').textContent = likes;
  bigPictureElement.querySelector('.comments-count').textContent = comments.length;

  createComments(picture.comments);

  bigPictureElement.querySelector('.social__caption').textContent = description;
  bigPictureElement.querySelector('.social__comment-count').classList.add('hidden');
  bigPictureElement.querySelector('.comments-loader').classList.add('hidden');

  cancelButtonElement.addEventListener('click', closeBigPicture);
  document.addEventListener('keydown', onDocumentKeyDown);
};


export {openBigPicture};
