import {mapFiltersDisabled, resetForm} from './form.js';
import {GET_DATA_URL, SEND_DATA_URL} from './const.js';

const getAdvertsFromServer = () => fetch(GET_DATA_URL)
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      mapFiltersDisabled();
    }
  });

const sendData = (onSuccess, onFail, body) => {
  fetch(
    SEND_DATA_URL,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
        resetForm();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};


export {getAdvertsFromServer, sendData}

