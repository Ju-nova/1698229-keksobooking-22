import {deletePins, createPins, AMOUNT_ADVERT, map} from './map.js'

const filter = document.querySelector('.map__filters');
const typeFilter = filter.querySelector('#housing-type');

const filteringAdverts = (adverts, pins) => {
  // let typeGili = 'any';
  // let typeGests = ...


  typeFilter.addEventListener('change', (evt) => {
    //массив с типами жилища по селекту
    let filterAdvertsArray = [];
    for (let i = 0; i < adverts.length; i++){
      if (evt.target.value == adverts[i].offer.type ) {
        filterAdvertsArray.push(adverts[i]);
      }
      else if (evt.target.value == 'any') {
        filterAdvertsArray.push(adverts[i]);
      }
    }
    console.log(pins)
    console.log(filterAdvertsArray)

    let newAmountAdvert = AMOUNT_ADVERT;
    if (filterAdvertsArray.length < AMOUNT_ADVERT) {
      newAmountAdvert = filterAdvertsArray.length;
    }

    deletePins(pins);

    pins = createPins(map, filterAdvertsArray, newAmountAdvert);
  })


  // слушатель на форму
  // при изменени, запускаем фильтрацию,
  // после фильрации удаляем пины
  // создаём пины
}

export {filteringAdverts};
