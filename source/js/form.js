/* global L:readonly */
import {sendData} from './server.js';
import {map, getAddressDefault, mainPinMarker, centerCoordinates, reCreateMap} from './map.js';
import { resetPreviewImages} from './images-form.js';

const checkHours = [
  '12:00',
  '13:00',
  '14:00',
];

const typePrice = {
  'bungalow': 0,
  'flat': 1000,
  'house': 5000,
  'palace': 10000,
};

const AdvertTitleLength = {
  MIN : 30,
  MAX : 100,
}

const roomToCapaсity = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0],
};

const form = document.querySelector('.ad-form');

const  disableFormItem = (item) =>{
  for (let i = 0; i < item.length; i++) {
    const disableItem = item[i];
    disableItem.disabled = true;
  }
};

const mapFilters = document.querySelector('.map__filters');
const mapFiltersSelect =  mapFilters.querySelectorAll('.map__filter');
const mapFiltersFieldset =  mapFilters.querySelectorAll('.map__features input');

const mapFiltersDisabled = () =>{
  mapFilters.classList.add('ad-form--disabled');
  mapFilters.disabled = true;
  disableFormItem(mapFiltersSelect);
  disableFormItem(mapFiltersFieldset);
}

const inputFieldset = form.querySelectorAll('fieldset');

const disabledForm = () => {
  form.classList.add('ad-form--disabled');
  mapFiltersDisabled();
  disableFormItem(inputFieldset);
};

const  enableFormItem = (item) =>{
  for (let i = 0; i < item.length; i++) {
    const disableItem = item[i];
    disableItem.disabled = false;
  }
};

const mapFiltersEnabled = () =>{
  mapFilters.classList.remove('ad-form--disabled');
  mapFilters.disabled = false;
  enableFormItem(mapFiltersSelect);
  enableFormItem(mapFiltersFieldset);
};

const enableForm = () => {
  form.classList.remove('ad-form--disabled');
  mapFiltersEnabled();
  enableFormItem(inputFieldset);
}

const types = Object.keys(typePrice);
const prices = Object.values(typePrice);

const inputPrice = form.querySelector('#price');
const selectType = form.querySelector('#type');

const  onSyncronizeTypePriceChange = () =>{
  for (let i = 0; i < types.length; i++) {
    if (selectType.value === types[i]) {
      inputPrice.placeholder = prices[i];
      inputPrice.min = prices[i];
    }
  }
};

const selectTimeIn = form.querySelector('#timein');
const selectTimeOut = form.querySelector('#timeout');

const onSynchronizeTimeInChange = () => {
  for (let i = 0; i < checkHours.length; i++) {
    if (selectTimeIn.value === checkHours[i]) {
      selectTimeOut.value = checkHours[i];
    }
  }
} ;

const onSynchronizeTimeOutChange = () => {
  for (let i = 0; i < checkHours.length; i++) {
    if (selectTimeOut.value === checkHours[i]) {
      selectTimeIn.value = checkHours[i];
    }
  }
}

const selectRoomNumber = form.querySelector('#room_number');
const valueOptions = selectRoomNumber.value;
const selectGuests = form.querySelector('#capacity');
const guestOptions = selectGuests.querySelectorAll('option');

const defaultSelectRoomGuest = () => {
  const guests = roomToCapaсity[valueOptions];
  guestOptions.forEach((option) => {
    option.disabled = true;
    option.selected = false;

    guests.forEach((guest) => {
      if (+option.value === +guest) {
        option.disabled = false;
        option.selected = true;
      }
    })
  })
}

const onSynchronizeGuestsRoomsChange = (evt) => {
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

const selectedType =  selectType.querySelector('option:checked').value;

const defineSelected = () =>{
  for (let i = 0; i < types.length; i++) {
    if ( selectedType === types[i]) {
      inputPrice.placeholder = prices[i];
      inputPrice.min = prices[i];
    }
  }
}

const setFormHandler = () => {
  defineSelected();
  selectTimeIn.addEventListener('change', onSynchronizeTimeInChange);
  selectTimeOut.addEventListener('change', onSynchronizeTimeOutChange);
  selectType.addEventListener('change', onSyncronizeTypePriceChange);
  defaultSelectRoomGuest();
  selectRoomNumber.addEventListener('change', onSynchronizeGuestsRoomsChange);
}

const inputTitle = document.querySelector('#title');

const onValidateTitleInput = () => {
  const valueLength = inputTitle.value.length;

  if (valueLength < AdvertTitleLength.MIN) {
    inputTitle.setCustomValidity('Ещё ' + (AdvertTitleLength.MIN - valueLength) +' симв.');
  } else if (valueLength > AdvertTitleLength.MAX) {
    inputTitle.setCustomValidity('Удалите лишние ' + (valueLength - AdvertTitleLength.MAX) +' симв.');
  } else {
    inputTitle.setCustomValidity('');
  }
  inputTitle.reportValidity();
}

const onValidatePriceInput = () => {
  const validity = inputPrice.validity;
  if (validity.rangeOverflow) {
    inputPrice.setCustomValidity (`Максимум ${inputPrice.max} , больше нельзя`);
  } else if (validity.rangeUnderflow) {
    inputPrice.setCustomValidity (`Минимум ${inputPrice.min} , меньше нельзя`);
  } else {
    inputPrice.setCustomValidity('')
  }
  inputPrice.reportValidity();
}

const validateForm = () => {
  inputTitle.addEventListener('input', onValidateTitleInput );
  inputPrice.addEventListener('input', onValidatePriceInput );
}

const setFormSubmit = (success, fail) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      () => success(),
      () => fail(),
      new FormData(evt.target),
    );
  });
};

const mapFilter = document.querySelector('.map__filters');
const resetForm = () => {
  form.reset();
  reCreateMap();
  mapFilter.reset();
  getAddressDefault();
  setFormHandler();
  resetPreviewImages()
  map.setView(new L.LatLng(centerCoordinates.lat, centerCoordinates.lng), 10);
  mainPinMarker.setLatLng(new L.LatLng(centerCoordinates.lat, centerCoordinates.lng))
};

export { setFormHandler, disabledForm, enableForm, validateForm, setFormSubmit, mapFiltersDisabled, resetForm};

