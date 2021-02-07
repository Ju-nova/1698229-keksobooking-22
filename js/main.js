// Функция, возвращающая случайное целое число из переданного диапазона включительно
// и возвращающая случайное число с плавающей точкой из переданного диапазона включительно.
const getRandomNumber = (min, max, numberSymbols ) => {
  const preResult = (Math.random() * (max - min) + min);
  if (numberSymbols){
    return Number(preResult.toFixed(numberSymbols));
  }

  return Math.round(preResult);
};
// console.log(
//   getRandomNumber(5.454, 100.450000, 6),
// )
// получаем случайный элемент из массива
function arrayRandElement(n) {
  let rand = Math.floor(Math.random() * n.length);
  return n[rand];
}
//Создаем массив из аватарок
let avatars = [];//сначала пустой массив
// потом цикл, который нам сгенерирует 8 аватарок
for (let i = 0; i <= 8; i++) {
  avatars[i] = 'img/avatars/user0' + [i+1] + '.png';
}
// console.log(avatars);
// Создаем автора(это объект)
const createAuthor = () => {
  return {
    avatar: arrayRandElement(avatars),
  }
};
// console.log(
//   createAuthor(),
// );
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
const type = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',

}
// Преобразуем объект типов жилища в массив
let types = Object.values(type);
// console.log(types);


// Создаем объект фич жилища
const feature = {
  wifi: 'wifi',
  dishwasher: 'dishwasher',
  parking: 'parking',
  washer: 'washer',
  elevator: 'elevator',
}
// Преобразуем объект фич жилища в массив
let features = Object.values(feature);
// console.log(features);

// Создаем объект фоток жилища
let photo = {
  photo1: 'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  photo2: 'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  photo3: 'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
}
// Преобразуем объект фоток жилища в массив
let photos = Object.values(photo);
// console.log(photos);

// создаем массив случайной длины с неповторяющимися значениями
let randomArray = function (array, length) {
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
// console.log(randomArray(features, getRandomNumber(0, features.length)))
// массив с временем заселения.отъезда
let checkHours =[
  '12:00',
  '13:00',
  '14:00',
];
// случайно выбираем значение из массива с временем заселения.отъезда
let randomCheckHours = arrayRandElement(checkHours);
//создаем  объект с локацией
const creatLocation = () => {

  return {
    x: getRandomNumber(35.65000, 35.70000, 5),
    y: getRandomNumber(139.70000, 139.80000, 5),
  };
};
// console.log(
//   creatLocation(),
// );
// объект с предложением
const createOffer = () => {
  return {
    title: arrayRandElement(titles),
    address:creatLocation(),
    price: getRandomNumber(0, 1000000),
    type:arrayRandElement(types),
    rooms:getRandomNumber(0, 1000000),
    guests:getRandomNumber(0, 1000000),
    checkin: randomCheckHours,
    checkout: randomCheckHours,
    feature:randomArray(features, getRandomNumber(0, features.length)),
    description:arrayRandElement(descriptions),
    photos:randomArray(photos, getRandomNumber(0, photos.length)),

  }
};

// console.log(
//   createOffer (),
// );

// создаем само объявление
const createAdvert = () => {
  return{
    author: createAuthor(),
    offer: createOffer(),
    location: creatLocation(),
  }
};

createAdvert()

