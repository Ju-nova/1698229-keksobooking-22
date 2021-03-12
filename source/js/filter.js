/* global _:readonly */
import {deletePins, createPins, map} from './map.js'
import {AMOUNT_ADVERT, DELAY_TIME} from './data.js';

const mapFilter = document.querySelector('.map__filters');
const housingType = mapFilter.querySelector('#housing-type');
const housingPrice = mapFilter.querySelector('#housing-price');
const housingRooms = mapFilter.querySelector('#housing-rooms');
const housingGuests = mapFilter.querySelector('#housing-guests');
const housingFeatures = mapFilter.querySelector('#housing-features');


const changeMapFiltersForm = (cb) => {
  mapFilter.addEventListener('change', () => {
    cb();
  });
}

const filterForPrice = {
  low: [0, 10000],
  middle: [10000, 50000],
  high: [50000, 1000000],
  any: [0, 1000000],
}

const typeFilter  = (advert, filter) => {
  if (filter === 'any' || advert.offer.type === filter) {
    return true;
  }
  return false;
}

const priceFilter = (advert, filter) => {
  if (advert.offer.price >= filterForPrice[filter][0] && advert.offer.price < filterForPrice[filter][1]) {
    return true;
  }
  else if (filter === 'any') {
    return true;
  }
  return false;
}

const roomFilter = (advert, filter) => {
  if (filter === 'any' || filter === String(advert.offer.rooms)) {
    return true;
  }
  return false;
}

const guestFilter = (advert, filter) => {
  if (filter === 'any' || filter === String(advert.offer.guests)) {
    return true;
  }
  return false;
}

const featureFilter = (advert, filters) => {
  for (const filter of filters) {
    if (!advert.offer.features.includes(filter)) {
      return false
    }
  }
  return true;
}

const filteringAdverts = (pins, adverts) => {
  let type = 'any';
  let price = 'any';
  let rooms = 'any';
  let guest = 'any';
  let featuresList = [];
  let filteredAdd = adverts;

  const updatePins = () => {
    deletePins(pins);
    const newAmountAdvert = filteredAdd.length < AMOUNT_ADVERT ?
      filteredAdd.length : AMOUNT_ADVERT;
    pins =  createPins(map, filteredAdd, newAmountAdvert)
  }

  const debounceUpdatePins = changeMapFiltersForm(_.debounce(
    () => updatePins(), DELAY_TIME,
  ));

  const filteringOffers = () => filteredAdd = adverts
    .filter((advert) => typeFilter(advert, type))
    .filter((advert) => priceFilter(advert, price))
    .filter((advert) => roomFilter(advert, rooms))
    .filter((advert) => guestFilter(advert, guest))
    .filter((advert) => featureFilter(advert, featuresList));

  housingType.addEventListener('change', (evt) => {
    type = evt.target.value;
    filteringOffers();
    debounceUpdatePins;
  })

  housingPrice.addEventListener('change', (evt) => {
    price = evt.target.value;
    filteringOffers();
    debounceUpdatePins;
  })

  housingRooms.addEventListener('change', (evt) => {
    rooms = evt.target.value;
    filteringOffers();
    debounceUpdatePins;
  })

  housingGuests.addEventListener('change', (evt) => {
    guest = evt.target.value;
    filteringOffers();
    debounceUpdatePins;
  })

  housingFeatures.addEventListener('change', () => {
    featuresList = Array
      .from(housingFeatures.querySelectorAll('input:checked'))
      .map((advert) => advert.value);

    filteringOffers();
    debounceUpdatePins;
  })
}


export {filteringAdverts, changeMapFiltersForm };


