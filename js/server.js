import {onLoadError} from './messages.js';
import {resetForm} from './map.js';
import {mapFiltersDisabled} from './form.js';

const GET_DATA_URL = 'https://22.javascript.pages.academy/keksobooking/data';
const SEND_DATA_URL = 'https://22.javascript.pages.academy/keksobooking';

//получаем данные с сервера для карты
const getAdvertsFromServer = async () =>  fetch(GET_DATA_URL )
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      onLoadError('Данные не пришли с сервера. Обновите страницу');
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


export {getAdvertsFromServer, sendData, addvertsFromServer}

