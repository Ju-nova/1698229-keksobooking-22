import {isEnterEvent, isEscEvent} from './util.js';
import {getAddressDefault} from './map.js';

//сообщение для ошибочной загрузки карты(данные с сервера не получены)
const onLoadError = (errorMessage) => {
  const message = document.createElement('div');
  const map = document.querySelector('.map__canvas')

  message.style.position = 'fixed';
  message.style.left = '0';
  message.style.right = '0';
  message.style.zIndex = '1000';
  message.style.margin = '0 auto';
  message.style.padding = '20px';
  message.style.textAlign = 'center';
  message.style.maxWidth = '600px';
  message.style.backgroundColor = 'white';
  message.style.border = '4px solid red';
  message.style.fontSize = '20px';

  message.textContent = errorMessage;
  map.appendChild(message);
}

//успех для формы
const main = document.querySelector('main');
const form = document.querySelector('.ad-form');
const successTemplate = document.querySelector('#success').content.querySelector('.success')

const onSuccess = () =>{
  const successFormMessage = successTemplate.cloneNode(true);

  successFormMessage.style.zIndex = '1000';

  main.appendChild(successFormMessage);

  successFormMessage.addEventListener('click', (evt) => {
    evt.target.remove();
  });

  document.addEventListener('keydown', (evt) => {
    if (isEscEvent(evt)) {
      evt.target.remove()
    }

  });

  form.reset();
  getAddressDefault();

  setTimeout(() => {
    successFormMessage.remove();
  }, 5000);

}

//ошибка для формы
const errorTemplate = document.querySelector('#error').content.querySelector('.error')

const onFail = () =>{
  const errorFormMessage = errorTemplate.cloneNode(true);
  errorFormMessage.style.zIndex = '1000';
  main.appendChild(errorFormMessage);
  const errorButton = errorFormMessage.querySelector('.error__button');
  errorButton.addEventListener('click', () => errorFormMessage.remove())
  errorButton.addEventListener('keydown', (evt) => {

    if (isEnterEvent(evt)) {
      errorFormMessage.remove()
    }
  })
}

export { onLoadError, onSuccess, onFail }
