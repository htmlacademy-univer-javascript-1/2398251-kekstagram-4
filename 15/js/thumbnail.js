import { openBigPicture } from './big-picture.js';

const thumbnailTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const container = document.querySelector('.pictures');

const renderTemplate = (picture) => {
  const {url, description, likes, comments} = picture;
  const thumbnail = thumbnailTemplate.cloneNode(true);

  thumbnail.querySelector('.picture__img').src = url;
  thumbnail.querySelector('.picture__img').alt = description;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;
  thumbnail.addEventListener('click', () => {
    openBigPicture(picture);
  });

  return thumbnail;
};

const renderTemplates = (pictures) => {
  const fragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    const thumbnail = renderTemplate(picture);
    fragment.appendChild(thumbnail);
  });

  container.append(fragment);
};

export {renderTemplates};

