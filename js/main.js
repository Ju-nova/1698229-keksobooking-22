import {setFormHandler, validateForm, setFormSubmit}  from './form.js';
import {onSuccess, onFail}  from './messages.js';
import {createMap} from './map.js';

setFormHandler();
validateForm()
createMap();
setFormSubmit(onSuccess, onFail);

