import {isEnterEvent, isEscEvent} from './util.js';

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

const main = document.querySelector('main');
const successTemplate = document.querySelector('#success').content.querySelector('.success')

const onSuccess = () =>{
  const successFormMessage = successTemplate.cloneNode(true);

  successFormMessage.style.zIndex = '1000';

  main.appendChild(successFormMessage);

  const closeSuccessFormMessage = () => {
    successFormMessage.remove();
    document.removeEventListener('click', closeSuccessFormMessage);
    document.removeEventListener('keydown', closeEscKeyDownSuccessFormMessage);
  };

  const closeEscKeyDownSuccessFormMessage = (evt) => {
    if (isEscEvent(evt)) {
      closeSuccessFormMessage();
    }
  };

  document.addEventListener('click', closeSuccessFormMessage);
  document.addEventListener('keydown', closeEscKeyDownSuccessFormMessage);

  setTimeout(() => {
    closeSuccessFormMessage();
  }, 5000);

}

const errorTemplate = document.querySelector('#error').content.querySelector('.error')

const onFail = () =>{
  const errorFormMessage = errorTemplate.cloneNode(true);
  errorFormMessage.style.zIndex = '1000';
  main.appendChild(errorFormMessage);
  const errorButton = errorFormMessage.querySelector('.error__button');

  const closeErrorFormMessage = () => {
    errorFormMessage.remove();
    errorButton.removeEventListener('click', closeErrorFormMessage);
    document.removeEventListener('click', closeErrorFormMessage);
    errorButton.removeEventListener('keydown', closeEnterKeyDownErrorFormMessage);
    document.removeEventListener('keydown', closeEscKeyDownErrorFormMessage);
  };

  const closeEnterKeyDownErrorFormMessage = (evt) => {
    if (isEnterEvent(evt)) {
      closeErrorFormMessage();
    }
  };

  const closeEscKeyDownErrorFormMessage = (evt) => {
    if (isEscEvent(evt)) {
      closeErrorFormMessage();
    }
  };

  errorButton.addEventListener('click', closeErrorFormMessage);
  errorButton.addEventListener('keydown', closeEnterKeyDownErrorFormMessage)
  document.addEventListener('click', closeErrorFormMessage);
  document.addEventListener('keydown', closeEscKeyDownErrorFormMessage);
}

export { onLoadError, onSuccess, onFail }
