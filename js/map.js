/* global L:readonly */
import {disabledForm, enableForm} from './form.js';
import { getAdvertsFromServer } from './server.js';
import {createCard} from './similar-adverts.js';

//координаты центра карты
const centerCoordinates = {
  lat: 35.68955,
  lng: 139.69222,
}

const formAddress = document.querySelector('#address');
const form = document.querySelector('.ad-form');
const buttonReset = form.querySelector('.ad-form__reset');
const getAddressDefault = () =>{
  formAddress.value = `${centerCoordinates.lat} , ${centerCoordinates.lng}`;
}

//функция для создания карты
const createMap = async () =>{

  //форма недоступна, пока не загрузится карта
  disabledForm();

  //загружаем карту, и делаем форму доступной
  const map = L.map('map-canvas').on('load', () => {
    enableForm();
  }).setView({
    lat: centerCoordinates.lat,
    lng: centerCoordinates.lng,
  }, 10);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  //устанавливаем маркер и иконку в центр карты
  const mainPinIcon = L.icon({
    iconUrl: 'img/main-pin.svg',
    iconSize: [50, 82],
    iconAnchor: [25, 82],
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
  mainPinMarker.addTo(map);

  //запрещаем ручное редактирование формы
  formAddress.setAttribute('readonly', 'true');

  //добавляем координаты маркера в форму
  getAddressDefault();

  // formAddress.value = `${centerCoordinates.lat} , ${centerCoordinates.lng}`;

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
        iconUrl: 'img/pin.svg',
        iconSize: [25, 41],
        iconAnchor: [13, 41],
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

    form.reset();
    getAddressDefault();
    map.setView(new L.LatLng(centerCoordinates.lat, centerCoordinates.lng))
    mainPinMarker.setLatLng(new L.LatLng(centerCoordinates.lat, centerCoordinates.lng))

  },

  )
}


export {createMap, getAddressDefault}
