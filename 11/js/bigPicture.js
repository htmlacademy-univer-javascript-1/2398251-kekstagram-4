import {isEscapeKey} from './util.js';

const COMMENTS_LOAD_NUMBER = 5;

const bigPictureElement = document.querySelector('.big-picture');
const commentListElement = bigPictureElement.querySelector('.social__comments');
const bodyElement = document.querySelector('body');
const cancelButtonElement = bigPictureElement.querySelector('#picture-cancel');
const commentTemplate = document.querySelector('#social__comment').content.querySelector('.social__comment');
const loaderButtonElement = bigPictureElement.querySelector('.comments-loader');
const commentsShownCount = bigPictureElement.querySelector('.current__comments-count');

const createComments = ({avatar, name, message}) => {
  const comment = commentTemplate.cloneNode(true);

  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;
  comment.classList.add('hidden');

  return comment;
};

const renderComments = (comments) => {
  const fragment = document.createDocumentFragment();

  comments.forEach((comment) => {
    const newComment = createComments(comment);
    fragment.append(newComment);
  });

  commentListElement.innerHTML = '';
  commentListElement.append(fragment);
};

const closeBigPicture = () => {
  bodyElement.classList.remove('modal-open');
  bigPictureElement.classList.add('hidden');
  cancelButtonElement.removeEventListener('click', closeBigPicture);
  document.removeEventListener('keydown', onDocumentKeyDown);
};

//Функция объявлена после closeBigPicture, чтобы эти функции не закольцовывались
function onDocumentKeyDown()  {
  if (isEscapeKey) {
    closeBigPicture();
  }
}

const showComments = () => {
  const hiddenCommentsList = bigPictureElement.querySelectorAll('.social__comment.hidden');
  let commentsLoadNumber = COMMENTS_LOAD_NUMBER;
  const hiddenCommentsNumber = hiddenCommentsList.length;

  if (hiddenCommentsNumber < COMMENTS_LOAD_NUMBER) {
    commentsLoadNumber = hiddenCommentsNumber;
  }
  commentsShownCount.textContent = Number(commentsShownCount.textContent) + commentsLoadNumber;

  for (let i = 0; i < commentsLoadNumber; i++) {
    hiddenCommentsList[i].classList.remove('hidden');
  }

  if (hiddenCommentsNumber - commentsLoadNumber === 0) {
    bigPictureElement.querySelector('.comments-loader').classList.add('hidden');
  }
};

const openBigPicture = ({url, description, likes, comments}) =>{
  bodyElement.classList.add('modal-open');
  bigPictureElement.classList.remove('hidden');

  bigPictureElement.querySelector('.big-picture__img img').src = url;
  bigPictureElement.querySelector('.likes-count').textContent = likes;
  bigPictureElement.querySelector('.comments-count').textContent = comments.length;

  renderComments({url, description, likes, comments}.comments);

  bigPictureElement.querySelector('.social__caption').textContent = description;
  bigPictureElement.querySelector('.comments-loader').classList.remove('hidden');
  commentsShownCount.textContent = 0;

  showComments();

  loaderButtonElement.addEventListener('click', showComments);
  cancelButtonElement.addEventListener('click', closeBigPicture);
  document.addEventListener('keydown', onDocumentKeyDown);
};

export {openBigPicture};
