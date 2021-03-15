/* global L:readonly */

import { getFilterAdverts } from './filter.js';
import {disabledForm, enableForm, resetForm} from './form.js';
import { onLoadError } from './messages.js';
import { getAdvertsFromServer } from './server.js';
import {createCard} from './similar-adverts.js';
import {AMOUNT_ADVERT, centerCoordinates,STYLE_MAP, COPYRIGTH_MAP} from './const.js';

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

const createMap = async () =>{

  disabledForm();

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

  formAddress.setAttribute('readonly', 'true');

  getAddressDefault();

  mainPinMarker.on('move', (evt) => {
    const newAddressForm = evt.target.getLatLng();
    formAddress.value = `${(newAddressForm.lat).toFixed(5)}, ${(newAddressForm.lng).toFixed(5)}`;

  });

  try {
    const adverts = await getAdvertsFromServer();
    const pins = createPins(map, adverts, AMOUNT_ADVERT);
    getFilterAdverts(pins, adverts);


  } catch (err) {
    onLoadError('Данные не пришли с сервера. Обновите страницу')
  }
  buttonReset.addEventListener('click', (evt) => {
    evt.preventDefault();
    resetForm();
  })
}

const removePins = () => {
  pins.forEach((pin) => {
    pin.remove();
  })
}

const recreateMap = async () =>{
  removePins();
  createMap();
  enableForm();
}

export {createMap, getAddressDefault, map, deletePins, createPins, mainPinMarker, AMOUNT_ADVERT, centerCoordinates, recreateMap}
