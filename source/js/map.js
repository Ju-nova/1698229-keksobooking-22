/* global L:readonly */

import { filteringAdverts } from './filter.js';
import {disabledForm, enableForm, resetForm} from './form.js';
import { onLoadError } from './messages.js';
import { getAdvertsFromServer } from './server.js';
import {createCard} from './similar-adverts.js';
import {AMOUNT_ADVERT, centerCoordinates,STYLE_MAP, COPYRIGTH_MAP} from './data.js';

const CenterMapPin = {
  iconUrl: 'img/main-pin.svg',
  iconSize: [50, 82],
  iconAnchor: [25, 82],
}
const MapPin = {
  iconUrl: 'img/pin.svg',
  iconSize: [25, 41],
  iconAnchor: [13, 41],
}

const formAddress = document.querySelector('#address');
const form = document.querySelector('.ad-form');

const buttonReset = form.querySelector('.ad-form__reset');
const getAddressDefault = () =>{
  formAddress.value = `${centerCoordinates.lat} , ${centerCoordinates.lng}`;
}

const map = L.map('map-canvas');
//устанавливаем маркер и иконку в центр карты
const mainPinIcon = L.icon({
  iconUrl: CenterMapPin.iconUrl,
  iconSize: CenterMapPin.iconSize,
  iconAnchor: CenterMapPin.iconAnchor,
});

const mainPinMarker = L.marker(
  {
    lat: centerCoordinates.lat,
    lng: centerCoordinates.lng,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

const pins = [];
const createPins = (map, adverts, count) => {

  for (let i = 0; i < count; i++) {
    const advert = adverts[i];
    const {location} = advert;
    const icon = L.icon({
      iconUrl: MapPin.iconUrl,
      iconSize: MapPin.iconSize,
      iconAnchor: MapPin.iconAnchor,
    });

    const marker = L.marker(
      {
        lat:location.lat,
        lng:location.lng,
      },
      {
        icon,
      },
    );

    marker
      .addTo(map)
      .bindPopup(createCard(advert));

    pins.push(marker)
  }

  return pins;
}

const deletePins = (pins) => pins.forEach(pin => pin.remove())

//функция для создания карты
const createMap = async () =>{
  //форма недоступна, пока не загрузится карта
  disabledForm();

  //загружаем карту, и делаем форму доступной
  map.on('load', () => {
    enableForm();
  }).setView({
    lat: centerCoordinates.lat,
    lng: centerCoordinates.lng,
  }, 10);

  L.tileLayer(
    STYLE_MAP,
    {
      attribution: COPYRIGTH_MAP,
    },
  ).addTo(map);

  mainPinMarker.addTo(map);

  //запрещаем ручное редактирование формы
  formAddress.setAttribute('readonly', 'true');

  //добавляем координаты маркера в форму
  getAddressDefault();

  //добавляем координаты передвинутого маркера в форму
  mainPinMarker.on('move', (evt) => {
    const newAddressForm = evt.target.getLatLng();
    formAddress.value = `${(newAddressForm.lat).toFixed(5)}, ${(newAddressForm.lng).toFixed(5)}`;

  });

  // setCoatClick(_.debounce(
  //   () => renderSimilarList(wizards),
  //   RERENDER_DELAY,
  // ));

  //добавляем маркеры и заполняем балун со случайными объявлениями
  try {
    const adverts = await getAdvertsFromServer();

    const pins = createPins(map, adverts, AMOUNT_ADVERT);
    // _.debounce(filteringAdverts(pins, adverts), 1000)
    filteringAdverts(pins, adverts);


  } catch (err) {
    onLoadError('Данные не пришли с сервера. Обновите страницу')
  }
  buttonReset.addEventListener('click', (evt) => {
    evt.preventDefault();
    resetForm();
  })
}

//для сброса пинов при ресет
const removePins = () => {
  pins.forEach((pin) => {
    pin.remove();
  })
}

const reCreateMap = async () =>{
  removePins();
  createMap();
  enableForm();
}
export {createMap, getAddressDefault, map, deletePins, createPins, mainPinMarker, AMOUNT_ADVERT, centerCoordinates, reCreateMap}
