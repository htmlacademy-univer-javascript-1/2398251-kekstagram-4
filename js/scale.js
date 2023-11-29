const SCALE_STEP = 25;
const MIN_SCALE_VALUE = 25;
const MAX_SCALE_VALUE = 100;

const controlSmallerButton = document.querySelector('.scale__control--smaller');
const controlBiggerButton = document.querySelector('.scale__control--bigger');
const valueField = document.querySelector('.scale__control--value');
const imagePreview = document.querySelector('.img-upload__preview img');
const effectLevel = document.querySelector('.effect-level__value');
const sliderContainer = document.querySelector('.effect-level__slider');
const filterItems = document.querySelectorAll('.effects__item');
let filterName = '';

controlSmallerButton.addEventListener('click', () => {
  const scaleInputValue = Number(valueField.value.split('%')[0]);

  if (scaleInputValue - SCALE_STEP >= MIN_SCALE_VALUE) {
    valueField.value = `${scaleInputValue - SCALE_STEP}%`;
    imagePreview.style.transform = `scale(${Number(valueField.value.split('%')[0]) / MAX_SCALE_VALUE})`;
  }
});

controlBiggerButton.addEventListener('click', () => {
  const scaleInputValue = Number(valueField.value.split('%')[0]);

  if (scaleInputValue + SCALE_STEP  <= MAX_SCALE_VALUE) {
    valueField.value = `${scaleInputValue + SCALE_STEP}%`;
    imagePreview.style.transform = `scale(${Number(valueField.value.split('%')[0]) / MAX_SCALE_VALUE})`;
  }
});

noUiSlider.create(sliderContainer, {
  connect: 'lower',
  start: 1,
  step: 0.1,
  range: {'min': 0, 'max': 1},
});

sliderContainer.noUiSlider.on('update', () => {
  effectLevel.value = sliderContainer.noUiSlider.get();
  imagePreview.style.filter = `${filterName.split(' ')[0]}(${effectLevel.value}${filterName.split(' ')[1]})`;
});

filterItems.forEach((filter) => {
  const filterValue = filter.querySelector('input').value;
  switch (filterValue) {
    case 'none':
      filter.addEventListener('click', () => {
        sliderContainer.parentNode.classList.add('hidden');
        imagePreview.style.filter = 'none';
      });
      break;

    case 'chrome':
      filter.addEventListener('click', () => {
        sliderContainer.parentNode.classList.remove('hidden');
        filterName = 'grayscale ';
        sliderContainer.noUiSlider.updateOptions({
          start: 1,
          step: 0.1,
          range: {'min': 0, 'max': 1},
        });
      });
      break;

    case 'sepia':
      filter.addEventListener('click', () => {
        sliderContainer.parentNode.classList.remove('hidden');
        filterName = 'sepia ';
        sliderContainer.noUiSlider.updateOptions({
          start: 1,
          step: 0.1,
          range: {'min': 0, 'max': 1},
        });
      });
      break;

    case 'marvin':
      filter.addEventListener('click', () => {
        sliderContainer.parentNode.classList.remove('hidden');
        filterName = 'invert %';
        sliderContainer.noUiSlider.updateOptions({
          step: 1,
          start: 100,
          range: { 'min': 0, 'max': 100 }
        });
      });
      break;

    case 'phobos':
      filter.addEventListener('click', () => {
        sliderContainer.parentNode.classList.remove('hidden');
        filterName = 'blur px';
        sliderContainer.noUiSlider.updateOptions({
          step: 0.1,
          start: 3,
          range: { 'min': 0, 'max': 3 }
        });
      });
      break;

    case 'heat':
      filter.addEventListener('click', () => {
        sliderContainer.parentNode.classList.remove('hidden');
        filterName = 'brightness ';
        sliderContainer.noUiSlider.updateOptions({
          step: 0.1,
          start: 3,
          range: { 'min': 1, 'max': 3}
        });
      });
      break;
  }
});
