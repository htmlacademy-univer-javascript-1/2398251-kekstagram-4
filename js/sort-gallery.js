import {renderTemplates} from './thumbnail.js';
import {debounce, getRandomElements} from './util.js';

const RANDOM_PICTURES = 10;

const filterElement = document.querySelector('.img-filters');
const defaultfFilter = document.querySelector('#filter-default');
const randomFilter = document.querySelector('#filter-random');
const discussedFilter = document.querySelector('#filter-discussed');

const sortByComments = (pictureA, pictureB) => pictureB.comments.length - pictureA.comments.length;
const getSortedPhotos = (photo) => photo.slice().sort(sortByComments);

const removePictures = () => {
  const picture = document.querySelectorAll('.picture');
  picture.forEach((photo) => {
    photo.remove();
  });
};

const changePictures = (array, button) => {
  removePictures();
  const activeFilterButton = document.querySelector('.img-filters__button--active');
  activeFilterButton.classList.remove('img-filters__button--active');
  renderTemplates(array);
  button.classList.add('img-filters__button--active');
};

const showSortedPictures = (pictures) => {
  renderTemplates(pictures);
  filterElement.classList.remove('img-filters--inactive');

  defaultfFilter.addEventListener('click', debounce(() => {
    changePictures(pictures, defaultfFilter);
  }));

  randomFilter.addEventListener('click', debounce(() => {
    changePictures(getRandomElements(pictures, RANDOM_PICTURES), randomFilter);
  }));

  discussedFilter.addEventListener('click', debounce(() => {
    changePictures(getSortedPhotos(pictures), discussedFilter);
  }));
};

export {showSortedPictures};
