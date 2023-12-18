import {getData} from './api.js';
import './form.js';
import './scale.js';
import { showSortedPictures } from './sort-gallery.js';
import './new-picture.js';

const load = async () => {
  try {
    showSortedPictures(await getData());
  }
  catch (err){
    const alertMessage = document.querySelector('#alert').content;
    alertMessage.querySelector('.alert_message').textContent = err.message;
    document.body.append(alertMessage);
  }
};

load();
