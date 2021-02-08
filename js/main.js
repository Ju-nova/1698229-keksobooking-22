const amountAdvert = 10;
//Создаем массив из аватарок
const avatars = [];//сначала пустой массив
// потом цикл, который нам сгенерирует 8 аватарок
for (let avatarNumber = 1; avatarNumber <= 8; avatarNumber++) {
  avatars.push(`img/avatars/user0${avatarNumber}.png`);
}

// массив с временем заселения.отъезда
const checkHours =[
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
const photos =[
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
]
// Функция, возвращающая случайное целое число из переданного диапазона включительно
// и возвращающая случайное число с плавающей точкой из переданного диапазона включительно.
const getRandomNumber = (min, max, numberSymbols ) => {
  const preResult = (Math.random() * (max - min) + min);
  if (numberSymbols){
    return Number(preResult.toFixed(numberSymbols));
  }

  return Math.round(preResult);
};

// получаем случайный элемент из массива
const arrayRandElement = (array) => {
  let rand = Math.floor(Math.random() * array.length);
  return array[rand];
}

// создаем массив случайной длины с неповторяющимися значениями
const randomArray = (array, length) => {
  // создаем новый массив, где перемеiаются значения
  let newArray = [];

  // Копируем исходный массив во временный массив
  let tempArray = array.slice(0);

  // Если передана нужная длина массива то используем её, иначе проходим весь массив
  let iterationCount = length ? length - 1 : tempArray.length - 1;

  // Цикл
  for (let i = iterationCount; i >= 0; i--) {
    // Генерируем случайный индекс массива
    let randomId = getRandomNumber(0, tempArray.length - 1);

    // Записываем в новый массив случайный элемент из временного массива
    newArray.push(tempArray[randomId]);

    // Удаляем использованный элемент из временного массива
    tempArray.splice(randomId, 1);
  }

  return newArray;
};

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
  const coordinatesLocation = {};

  coordinatesLocation.x = getRandomNumber(Coordinates.x.MIN, Coordinates.x.MAX, Coordinates.x.NUMBER_OF_DIGITS);
  coordinatesLocation.y = getRandomNumber(Coordinates.y.MIN, Coordinates.y.MAX, Coordinates.y.NUMBER_OF_DIGITS);
  return coordinatesLocation;
};

// Преобразуем объект фич жилища в массив
const features = Object.values(Feature);
// Преобразуем объект типов жилища в массив
const types = Object.values(Type);

// Создаем случайное объявление
const createAdvert  = () => {
  const advert = {};

  advert.user = arrayRandElement(avatars);

  advert.location = createCoordinates();

  advert.offer = {};
  advert.offer.title= arrayRandElement(titles);
  advert.offer.address = `${advert.location.x}, ${advert.location.y}`;
  advert.offer.price = getRandomNumber(0, 1000000);
  advert.offer.type = arrayRandElement(types);
  advert.offer.rooms = getRandomNumber(0, 1000000);
  advert.offer.guests = getRandomNumber(0, 1000000);
  advert.offer.checkin = arrayRandElement(checkHours);
  advert.offer.checkout = advert.offer.checkin;
  advert.offer.feature = randomArray(features, getRandomNumber(0, features.length));
  advert.offer.description = arrayRandElement(descriptions);
  advert.offer.photos  = randomArray(photos, getRandomNumber(0, photos.length));

  return advert;
};
// Создаем массив случайных объявлений
const createAdvertsArray = (amountAdvert) => {
  const array = [];

  for (let i = 0; i < amountAdvert; i++) {
    let advert = createAdvert();
    array.push(advert);
  }

  return array;
};

createAdvertsArray(amountAdvert);

