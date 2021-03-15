import {isEnterEvent, isEscEvent} from './util.js';
import {DELAY_TIME_CLOSE_MESSAGE} from './const.js';

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

  const onCloseSuccessFormMessageClick  = () => {
    successFormMessage.remove();
    document.removeEventListener('click', onCloseSuccessFormMessageClick );
    document.removeEventListener('keydown', onCloseSuccessFormMessageEscKeyDown);
  };

  const onCloseSuccessFormMessageEscKeyDown = (evt) => {
    if (isEscEvent(evt)) {
      onCloseSuccessFormMessageClick ();
    }
  };

  document.addEventListener('click', onCloseSuccessFormMessageClick );
  document.addEventListener('keydown', onCloseSuccessFormMessageEscKeyDown);

  setTimeout(() => {
    onCloseSuccessFormMessageClick ();
  }, DELAY_TIME_CLOSE_MESSAGE);

}

const errorTemplate = document.querySelector('#error').content.querySelector('.error')

const onFail = () =>{
  const errorFormMessage = errorTemplate.cloneNode(true);
  errorFormMessage.style.zIndex = '1000';
  main.appendChild(errorFormMessage);
  const errorButton = errorFormMessage.querySelector('.error__button');

  const onCloseErrorFormMessageClick = () => {
    errorFormMessage.remove();
    errorButton.removeEventListener('click', onCloseErrorFormMessageClick );
    document.removeEventListener('click', onCloseErrorFormMessageClick );
    errorButton.removeEventListener('keydown', onCloseErrorFormMessageEnterKeyDown);
    document.removeEventListener('keydown', onCloseErrorFormMessageEscKeyDown);
  };

  const onCloseErrorFormMessageEnterKeyDown = (evt) => {
    if (isEnterEvent(evt)) {
      onCloseErrorFormMessageClick ();
    }
  };

  const onCloseErrorFormMessageEscKeyDown = (evt) => {
    if (isEscEvent(evt)) {
      onCloseErrorFormMessageClick ();
    }
  };

  errorButton.addEventListener('click', onCloseErrorFormMessageClick );
  errorButton.addEventListener('keydown', onCloseErrorFormMessageEnterKeyDown)
  document.addEventListener('click', onCloseErrorFormMessageClick );
  document.addEventListener('keydown', onCloseErrorFormMessageEscKeyDown);
}

export { onLoadError, onSuccess, onFail }
