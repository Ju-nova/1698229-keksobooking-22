import {setFormHandler, defineSelected} from './form.js';
import {adverts} from './mock.js';
import {createCard} from  './similar-adverts.js';

createCard(adverts[0]);
setFormHandler();
defineSelected();
