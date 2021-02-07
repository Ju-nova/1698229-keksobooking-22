//Создаем массив из аватарок
let avatarNumber;
const avatars = [];//сначала пустой массив
// потом цикл, который нам сгенерирует 8 аватарок
for (avatarNumber = 0; avatarNumber <= 7; avatarNumber++) {

  avatars.push('img/avatars/user0' + [avatarNumber+1] + '.png');
}

console.log(
  avatars,
)

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

// Преобразуем объект типов жилища в массив
const types = Object.values(Type);

// Создаем объект фич жилища
const Feature = {
  WIFI: 'wifi',
  DISHWASHER: 'dishwasher',
  PARKING: 'parking',
  WASHER: 'washer',
  ELEVATOR: 'elevator',
}

// Преобразуем объект фич жилища в массив
const features = Object.values(Feature);

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
function arrayRandElement(n) {
  let rand = Math.floor(Math.random() * n.length);
  return n[rand];
}


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



// случайно выбираем значение из массива с временем заселения.отъезда
const randomCheckHours = arrayRandElement(checkHours);

//  объект с локацией
let location =  {
  x: getRandomNumber(35.65000, 35.70000, 5),
  y: getRandomNumber(139.70000, 139.80000, 5),

};
console.log(
  location,
)
// Создаем автора(это объект)
const createAuthor = () => {
  return {
    avatar: arrayRandElement(avatars),
  }
};
// объект с предложением
const createOffer = () => {
  return {
    title: arrayRandElement(titles),

    address: `${location.x}, ${location.y}`,

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

// создаем само объявление
const createAdvert = () => {
  return{
    author: createAuthor(),
    offer: createOffer(),
    location: location,
  }
};
console.log(
  createAdvert(),
)

