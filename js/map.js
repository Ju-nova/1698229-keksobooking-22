
/* global L:readonly */
import '../leaflet/leaflet.js';

import {getRandomNumber} from './util.js';
// координаты по умолчанию
const Coordinates = {
  x: {
    MIN: 35.65,
    MAX: 35.7,
    NUMBER_OF_DIGITS: 5,
  },
  y: {
    MIN: 139.7,
    MAX: 139.8,
    NUMBER_OF_DIGITS: 5,
  },
}

const createCoordinates = () => {
  const coordinatesLocation = {
    x: getRandomNumber(Coordinates.x.MIN, Coordinates.x.MAX, Coordinates.x.NUMBER_OF_DIGITS),
    y: getRandomNumber(Coordinates.y.MIN, Coordinates.y.MAX, Coordinates.y.NUMBER_OF_DIGITS),
  };

  return coordinatesLocation;
};
const map = document.querySelector('#map__canvas');

L.map(' map')
  .setView({
    lat: 59.92749,
    lng: 30.31127,
  }, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);



export {createCoordinates};
