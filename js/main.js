//Функция, возвращающая случайное целое число из переданного диапазона включительно.
const getRandomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

//Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно.
function getRandomFractional(min, max, numberSymbols) {
  return Number((Math.random() * (max - min) + min).toPrecision(numberSymbols));
}

