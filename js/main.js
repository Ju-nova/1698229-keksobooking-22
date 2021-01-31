// Функция, возвращающая случайное целое число из переданного диапазона включительно
// и возвращающая случайное число с плавающей точкой из переданного диапазона включительно.
const getRandomNumber = (min, max, numberSymbols) => {
  const preResult = (Math.random() * (max - min) + min);
  if (numberSymbols){
    return Number(preResult.toPrecision(numberSymbols));
  }

  return Math.floor(preResult);
};

