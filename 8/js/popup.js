import {similarOdjects} from './data.js';

const thumbnailTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const similarUsers = similarOdjects();
const similarListElement = document.querySelector('.pictures');

const similarListFragment = document.createDocumentFragment();

similarUsers.forEach(({url, description, likes, comments}) => {
  const thumbnail = thumbnailTemplate.cloneNode(true);
  thumbnail.querySelector('.picture__img').src = url;
  thumbnail.querySelector('.picture__img').alt = description;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;
});

similarListElement.appendChild(similarListFragment);
