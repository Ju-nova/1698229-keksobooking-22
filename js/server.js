//import { createCard } from './similar-adverts';

const getAdvertsFromServer = async () => {
  return fetch('https://22.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((adverts) => adverts);
}

export {getAdvertsFromServer}

// export {dataFromServer }
