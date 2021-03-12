const getRandomNumber = (min, max, numberSymbols ) => {
  const preResult = (Math.random() * (max - min) + min);
  if (numberSymbols){
    return Number(preResult.toFixed(numberSymbols));
  }

  return Math.round(preResult);
};

const getArrayRandElement = (array) => {
  const rand = Math.floor(Math.random() * array.length);
  return array[rand];
}

const getRandomArray = (array) => {
  const newArray = array.slice();

  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const swap = newArray[j];
    newArray[j] = newArray[i];
    newArray[i] = swap;
  }

  const length = getRandomNumber(1, newArray.length - 1);
  return newArray.slice(0, length);
};

const declOfNum = (number, words) => {
  return words[(number % 100 > 4 && number % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(number % 10 < 5) ? number % 10 : 5]];
}

const isEnterEvent = (evt) => {
  return evt.key === 'Enter';
};

const isEscEvent = (evt) => {
  return evt.key === 'Escape' || evt.key === 'Esc';
};

const resetStyleAndInnerElement = (element, standartElement) => {
  element.innerHTML = standartElement.innerHTML;
  element.removeAttribute('style');
}

export {getRandomNumber, getArrayRandElement, getRandomArray, declOfNum, isEnterEvent, isEscEvent, resetStyleAndInnerElement };
