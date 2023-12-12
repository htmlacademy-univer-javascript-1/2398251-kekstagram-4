import {renderTemplates} from './thumbnail.js';
import {getData} from './api.js';
import './form.js';
import './scale.js';

const load = async () => {
  try {
    renderTemplates(await getData());
  }
  catch (err){
    const alertMessage = document.querySelector('#alert').content;
    alertMessage.querySelector('.alert_message').textContent = err.message;
    document.body.append(alertMessage);
  }
};

load();
