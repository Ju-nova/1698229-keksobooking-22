/* global _:readonly */
import {deletePins, createPins, map} from './map.js'
import {AMOUNT_ADVERT, DELAY_TIME, ANY} from './const.js';

const mapFilter = document.querySelector('.map__filters');
const housingType = mapFilter.querySelector('#housing-type');
const housingPrice = mapFilter.querySelector('#housing-price');
const housingRooms = mapFilter.querySelector('#housing-rooms');
const housingGuests = mapFilter.querySelector('#housing-guests');
const housingFeatures = mapFilter.querySelector('#housing-features');

const changeMapFiltersForm = (cb) => {
  mapFilter.addEventListener('change', _.debounce(() => {
    cb();
  }, DELAY_TIME));
}

const filterForPrice = {
  low: [0, 10000],
  middle: [10000, 50000],
  high: [50000, 1000000],
  any: [0, 1000000],
}

const createTypeFilter  = (advert, filter) => (filter === ANY || advert.offer.type === filter )

const createPriceFilter = (advert, filter) =>  (advert.offer.price >= filterForPrice[filter][0] && advert.offer.price < filterForPrice[filter][1]) || (filter === ANY);

const createRoomFilter = (advert, filter) =>  (filter === ANY || filter === String(advert.offer.rooms));

const createGuestFilter = (advert, filter) => (filter === ANY || filter === String(advert.offer.guests));

const createFeatureFilter = (advert, filters) => {
  for (const filter of filters) {
    if (!advert.offer.features.includes(filter)) {
      return false
    }
  }
  return true;
}

const getFilterAdverts = (pins, adverts) => {
  let type = ANY;
  let price = ANY;
  let rooms = ANY;
  let guest = ANY;
  let featuresList = [];
  let filteredAdd = adverts;

  const updatePins = () => {
    deletePins(pins);
    const newAmountAdvert = filteredAdd.length < AMOUNT_ADVERT ?
      filteredAdd.length : AMOUNT_ADVERT;
    pins =  createPins(map, filteredAdd, newAmountAdvert)
  }

  const getFilterOffers = () => filteredAdd = adverts
    .filter((advert) => createTypeFilter(advert, type))
    .filter((advert) => createPriceFilter(advert, price))
    .filter((advert) => createRoomFilter(advert, rooms))
    .filter((advert) => createGuestFilter(advert, guest))
    .filter((advert) => createFeatureFilter(advert, featuresList));

  const displayFilter = () => {
    getFilterOffers();
    updatePins();
  }

  housingType.addEventListener('change', (evt) => {
    type = evt.target.value;
    displayFilter();
  })

  housingPrice.addEventListener('change', (evt) => {
    price = evt.target.value;
    displayFilter();
  })

  housingRooms.addEventListener('change', (evt) => {
    rooms = evt.target.value;
    displayFilter();
  })

  housingGuests.addEventListener('change', (evt) => {
    guest = evt.target.value;
    displayFilter();
  })

  housingFeatures.addEventListener('change', () => {
    featuresList = Array
      .from(housingFeatures.querySelectorAll('input:checked'))
      .map((advert) => advert.value);

    displayFilter();
  })
}


export {getFilterAdverts, changeMapFiltersForm };


