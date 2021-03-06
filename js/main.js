import {setFormHandler, validateForm, setFormSubmit}  from './form.js';
import {onSuccess, onFail}  from './messages.js';
import {createMap} from './map.js';
import { getAdvertsFromServer } from './server.js';

setFormHandler();
validateForm()
createMap();
setFormSubmit(onSuccess, onFail);

// создание карты
// создаём главный пин
// Если офера пришли, то создаём остальные пины


