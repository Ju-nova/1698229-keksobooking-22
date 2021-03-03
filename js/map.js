/* global L:readonly */
import {disabledForm, enableForm, setFormHandler} from './form.js';
import { getAdvertsFromServer } from './server.js';
import {createCard} from './similar-adverts.js';

const STYLE_MAP = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const COPYRIGTH_MAP = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
//координаты центра карты
const centerCoordinates = {
  lat: 35.68955,
  lng: 139.69222,
}
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

const resetForm = () => {
  form.reset();
  getAddressDefault();
  setFormHandler();
  map.setView(new L.LatLng(centerCoordinates.lat, centerCoordinates.lng), 10);
  mainPinMarker.setLatLng(new L.LatLng(centerCoordinates.lat, centerCoordinates.lng))
};
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

  //добавляем маркеры и заполняем балун со случайными объявлениями
  const adverts = await getAdvertsFromServer();
  if(adverts){
    adverts.forEach((advert) => {
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
        .bindPopup(
          createCard(advert),
        );
    });
  }



  buttonReset.addEventListener('click', (evt) => {
    evt.preventDefault();
    resetForm();
  },
  )
}


export {createMap, getAddressDefault,resetForm}
