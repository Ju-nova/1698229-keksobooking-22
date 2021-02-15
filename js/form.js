import {checkHours} from './mock.js';

const inputPrice = document.querySelector('#price');
const selectType = document.querySelector('#type');
const selectedType =  selectType.querySelector('option:checked').value;
const selectTimeIn = document.querySelector('#timein');
const selectTimeOut = document.querySelector('#timeout');

//связываем цену с типом жилища
const typePrice = {
  'bungalow': 0,
  'flat': 1000,
  'house': 5000,
  'palace': 10000,
};

//извлекаем оттуда массивы отдельно со значениями и ключами
const types = Object.keys(typePrice);
const prices = Object.values(typePrice);

// меняем минимальную цену и плэйсхолдер в зависимости от выбранного жилища
selectType.addEventListener('change', () => {
  for (let i = 0; i < types.length; i++) {
    if (selectType.value === types[i]) {
      inputPrice.placeholder = prices[i];
      inputPrice.min = prices[i];
    }
  }
});

//при загрузке страницы минимальная цена и правильный плэйсхолдер, который соответствует выбранному элементу по умолчанию
const defineSelected = () =>{
  for (let i = 0; i < types.length; i++) {
    if ( selectedType === types[i]) {
      inputPrice.placeholder = prices[i];
      inputPrice.min = prices[i];
    }
  }
}
defineSelected();

//время  заезда-отъезда должно совпасть
selectTimeIn.addEventListener('change', () => {
  for (let i = 0; i < checkHours.length; i++) {
    if (selectTimeIn.value === checkHours[i]) {
      selectTimeOut.value = checkHours[i];
    }
  }
});
selectTimeOut.addEventListener('change', () => {
  for (let i = 0; i < checkHours.length; i++) {
    if (selectTimeOut.value === checkHours[i]) {
      selectTimeIn.value = checkHours[i];
    }
  }
});
