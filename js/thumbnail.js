import { openBigPicture } from './bigPicture';

const thumbnailTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const container = document.querySelector('.pictures');

const createThumbnail = ({url, description, likes, comments}) => {
  const thumbnail = thumbnailTemplate.cloneNode(true);

  thumbnail.querySelector('.picture__img').src = url;
  thumbnail.querySelector('.picture__img').alt = description;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;

  return thumbnail;
};

const renderTemplate = (pictures) => {
  const fragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    const thumbnail = createThumbnail(picture);
    fragment.appendChild(thumbnail);
    thumbnail.addEventListener('click', () => {
      openBigPicture(picture);
    });

    container.append(fragment);
  });
};

export {renderTemplate};

