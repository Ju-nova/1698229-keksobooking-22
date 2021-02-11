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

export {createCoordinates};
