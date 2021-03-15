import {createCountFormatter} from './util.js';

const similarCardTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');


const createCard = (card) => {
  const similarCard = similarCardTemplate.cloneNode(true);

  const cardAvatar = similarCard.querySelector('.popup__avatar');
  (card.author.avatar) ? cardAvatar.src = card.author.avatar : cardAvatar.remove();

  const cardTitle = similarCard.querySelector('.popup__title');
  (card.offer.title) ? cardTitle.textContent = card.offer.title : cardTitle.remove();

  const cardAddress = similarCard.querySelector('.popup__text--address');
  (card.offer.address) ? cardAddress.textContent = card.offer.address : cardAddress.remove();

  const cardPrice = similarCard.querySelector('.popup__text--price');
  (card.offer.price) ? cardPrice.textContent = `${card.offer.price} ₽/ночь` : cardPrice.remove();

  const cardType = similarCard.querySelector('.popup__type');
  (card.offer.type) ? cardType.textContent = card.offer.type : cardType.remove();

  const cardRoomsGuests = similarCard.querySelector('.popup__text--capacity');
  (card.offer.rooms && card.offer.guests) ? cardRoomsGuests.textContent = `${card.offer.rooms} ${createCountFormatter(card.offer.rooms, ['комната', 'комнаты', 'комнаты'])}
   для ${card.offer.guests} ${createCountFormatter(card.offer.guests, ['гостя', 'гостей', 'гостей'])}` : cardRoomsGuests.remove();

  const cardTime = similarCard.querySelector('.popup__text--time');
  (card.offer.checkin && card.offer.checkout) ? cardTime.textContent = `Заезд после  ${card.offer.checkin},
   выезд до ${card.offer.checkout}` : cardTime.remove();

  const cardDescription = similarCard.querySelector('.popup__description');
  (card.offer.description) ? cardDescription.textContent = card.offer.description : cardDescription.remove();

  const featureList = similarCard.querySelector('.popup__features');
  if(card.offer.features){
    featureList.innerHTML = '';
    for (let i = 0; i < card.offer.features.length; i++) {
      const feature = document.createElement('li');
      const featureClass = `popup__feature--${card.offer.features[i]}`;
      feature.classList.add('popup__feature', featureClass);
      featureList.appendChild(feature);
    }
  } else {
    featureList.remove();
  }

  const photoList = similarCard.querySelector('.popup__photos');
  if(card.offer.photos){
    photoList.innerHTML = '';
    for (let i = 0; i < card.offer.photos.length; i++) {
      const photo = similarCardTemplate.querySelector('.popup__photo').cloneNode(true);
      photo.src = card.offer.photos[i];
      photoList.appendChild(photo);
    }
  } else {
    photoList.remove();
  }

  return similarCard;
};

export {createCard};

