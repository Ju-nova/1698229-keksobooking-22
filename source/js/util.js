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

export { declOfNum, isEnterEvent, isEscEvent, resetStyleAndInnerElement };
