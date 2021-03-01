import {setFormHandler, defineSelected, validateForm, setFormSubmit}  from './form.js';
import {onSuccess, onFail}  from './messages.js';
import {createMap} from './map.js';

setFormHandler();
defineSelected();
validateForm()
createMap();
setFormSubmit(onSuccess, onFail);

