
import {onLoadError} from './messages.js';

//получаем данные с сервера для карты
const getAdvertsFromServer = async () => {
  return fetch('https://22.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        onLoadError('Данные не пришли с сервера');
      }
    })
    .then((adverts) => adverts)
    .catch(() => {
      onLoadError('Данные не пришли с сервера');
    });
}

///отправляем данные из формы
const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://22.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};


export {getAdvertsFromServer, sendData}

// export {dataFromServer }
