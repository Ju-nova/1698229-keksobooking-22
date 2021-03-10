import {mapFiltersDisabled, resetForm} from './form.js';
import {GET_DATA_URL, SEND_DATA_URL} from './data.js';

//получаем данные с сервера для карты
const getAdvertsFromServer = () => fetch(GET_DATA_URL)
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      mapFiltersDisabled();
    }
  });

///отправляем данные из формы
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

