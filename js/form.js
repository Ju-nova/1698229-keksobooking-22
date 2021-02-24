import {checkHours} from './mock.js';

const form = document.querySelector('.ad-form');
const inputPrice = form.querySelector('#price');
const selectType = form.querySelector('#type');
const selectedType =  selectType.querySelector('option:checked').value;
const selectTimeIn = form.querySelector('#timein');
const selectTimeOut = form.querySelector('#timeout');
const mapFilters = document.querySelector('.map__filters');
const inputFieldset = form.querySelectorAll('fieldset');
const inputTitle = document.querySelector('#title');
const selectRoomNumber = form.querySelector('#room_number');
const selectGuests = form.querySelector('#capacity');
const guestOptions = selectGuests.querySelectorAll('option');

const Title = {
  MIN : 30,
  MAX : 100,
}

const roomToCapaсity = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0],
};

const  disableFormItem = (item) =>{
  for (let i = 0; i < item.length; i++) {
    const disableItem = item[i];
    disableItem.disabled = true;
  }
};
//делаем форму недоступной
const disabledForm = () => {
  form.classList.add('ad-form--disabled');
  mapFilters.classList.add('map-form--disabled');
  mapFilters.disabled = true;
  disableFormItem(inputFieldset);
}

const  enableFormItem = (item) =>{
  for (let i = 0; i < item.length; i++) {
    const disableItem = item[i];
    disableItem.disabled = false;
  }
};
const enableForm = () => {
  form.classList.remove('ad-form--disabled');
  mapFilters.classList.remove('map-form--disabled');
  mapFilters.disabled = false;
  enableFormItem(inputFieldset);
}
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
const  syncronizeTypePrice = () =>{
  for (let i = 0; i < types.length; i++) {
    if (selectType.value === types[i]) {
      inputPrice.placeholder = prices[i];
      inputPrice.min = prices[i];
    }
  }
};

//при загрузке страницы минимальная цена и правильный плэйсхолдер, который соответствует выбранному элементу по умолчанию
const defineSelected = () =>{
  for (let i = 0; i < types.length; i++) {
    if ( selectedType === types[i]) {
      inputPrice.placeholder = prices[i];
      inputPrice.min = prices[i];
    }
  }
}

//синхронизируем время заезда-отъезда
const synchronizeTimeIn = () => {
  for (let i = 0; i < checkHours.length; i++) {
    if (selectTimeIn.value === checkHours[i]) {
      selectTimeOut.value = checkHours[i];
    }
  }
} ;

const synchronizeTimeOut = () => {
  for (let i = 0; i < checkHours.length; i++) {
    if (selectTimeOut.value === checkHours[i]) {
      selectTimeIn.value = checkHours[i];
    }
  }
}
const synchronizeGuestsRooms = (evt) => {
  const rooms = roomToCapaсity[evt.target.value];

  guestOptions.forEach((option) => {
    option.disabled = true;
    option.selected = false;

    rooms.forEach((room) => {
      if (+option.value === +room) {
        option.disabled = false;
        option.selected = true;
      }
    })
  })
}
// основная функция синхронизации в форме
const setFormHandler = () => {
  selectTimeIn.addEventListener('change', synchronizeTimeIn);
  selectTimeOut.addEventListener('change', synchronizeTimeOut);
  selectType.addEventListener('change', syncronizeTypePrice);
  selectRoomNumber.addEventListener('change', synchronizeGuestsRooms);
}

//валидация заголовка
const validateInputTitle = () => {
  const valueLength = inputTitle.value.length;

  if (valueLength < Title.MIN) {
    inputTitle.setCustomValidity('Ещё ' + (Title.MIN - valueLength) +' симв.');
  } else if (valueLength > Title.MAX) {
    inputTitle.setCustomValidity('Удалите лишние ' + (valueLength - Title.MAX) +' симв.');
  } else {
    inputTitle.setCustomValidity('');
  }
  inputTitle.reportValidity();
}

//валидация цены
const validateInputPrice = () => {
  const validity = inputPrice.validity;
  if (validity.rangeOverflow) {
    inputPrice.setCustomValidity (`Максимум ${inputPrice.max} , больше нельзя`)
  } else if (validity.rangeUnderflow) {
    inputPrice.setCustomValidity (`Минимум ${inputPrice.min} , меньше нельзя`)
  } else {
    inputPrice.setCustomValidity('')
  }
  inputPrice.reportValidity();
}

//общая валидация формы
const validateForm = () => {
  inputTitle.addEventListener('input', validateInputTitle );
  inputPrice.addEventListener('input', validateInputPrice );
}


export {setFormHandler, defineSelected, disabledForm, enableForm, validateForm};

