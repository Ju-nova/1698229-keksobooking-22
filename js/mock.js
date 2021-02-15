import {getRandomNumber, getArrayRandElement, getRandomArray } from './util.js';
import {createCoordinates} from './map.js';

const MIN_GUESTS = 1;
const MAX_GUESTS = 3;
const MIN_ROOMS = 1;
const MAX_ROOMS = 3;
const MIN_PRICE = 0;
const MAX_PRICE = 1000000;
const AMOUNT_ADVERT = 10;

// массив с временем заселения.отъезда
const checkHours = [
  '12:00',
  '13:00',
  '14:00',
];

// массив с заголовками
const titles = [
  'Уютное жилище в Праге',
  'Уютное жилище в Париже',
  'Уютное жилище в Токио',
  'Уютное жилище в Кранодаре',
  'Уютное жилище в Анапе',
];

// массив с описанием
const descriptions = [
  'С видом на побережье',
  'Красной площади не видно',
  'Тараканов вытравили',
  'Можно с животными',
  'Нельзя с животными',
]

// Создаем объект типов жилища
const Type = {
  PALACE: 'Дворец',
  FLAT: 'Квартира',
  HOUSE: 'Дом',
  BUNGALOW: 'Бунгало',
}

// Создаем объект фич жилища
const Feature = {
  WIFI: 'wifi',
  DISHWASHER: 'dishwasher',
  PARKING: 'parking',
  WASHER: 'washer',
  ELEVATOR: 'elevator',
}

// Создаем объект фоток жилища
const photos = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
]

//Создаем массив из аватарок
const avatars = [];//сначала пустой массив
// потом цикл, который нам сгенерирует 8 аватарок
for (let avatarNumber = 1; avatarNumber <= 8; avatarNumber++) {
  avatars.push(`img/avatars/user0${avatarNumber}.png`);
}

// Создаем случайное объявление
const createAdvert  = () => {
  // Преобразуем объект фич жилища в массив
  const features = Object.values(Feature);

  // Преобразуем объект типов жилища в массив
  const types = Object.values(Type);

  const location = createCoordinates();

  const checkTime = getArrayRandElement(checkHours);

  const advert = {
    location,
    author: {
      avatar: getArrayRandElement(avatars),
    },
    offer: {
      title: getArrayRandElement(titles),
      address: `${location.x}, ${location.y}`,
      price: getRandomNumber(MIN_PRICE, MAX_PRICE),
      type: getArrayRandElement(types),
      rooms: getRandomNumber(MIN_ROOMS, MAX_ROOMS),
      guests: getRandomNumber(MIN_GUESTS, MAX_GUESTS),
      checkin: checkTime,
      checkout: checkTime,
      features: getRandomArray(features, getRandomNumber(0, features.length)),
      description: getArrayRandElement(descriptions),
      photos: getRandomArray(photos, getRandomNumber(0, photos.length)),
    },
  };

  return advert;
};

// Создаем массив случайных объявлений
const adverts =  new Array(AMOUNT_ADVERT).fill('').map(() => createAdvert());

export {adverts, createAdvert, checkHours};

