import { debounce } from './utils.js';
import { renderMarkers } from './map.js';

const RENDER_DELAY = 500;
const MIN_PRICE = 10000;
const MAX_PRICE = 50000;
const MAX_ADVERTS = 10;

const typeFilter = document.querySelector('#housing-type');
const priceFilter = document.querySelector('#housing-price');
const roomsFilter = document.querySelector('#housing-rooms');
const guestsFilter = document.querySelector('#housing-guests');
const mapFeatures = document.querySelector('.map__features');
const featuresFilters = document.querySelectorAll('.map__checkbox');

const isAnyFilterValue = (filter) => filter.value === 'any';

const isSuitableAdvertType = (advert) => isAnyFilterValue(typeFilter) || advert.offer.type === typeFilter.value;

const isSuitableAdvertPrice = (advert) => {
  if (isAnyFilterValue(priceFilter)) {
    return true;
  }
  switch (priceFilter.value) {
    case 'middle':
      return advert.offer.price >= MIN_PRICE && advert.offer.price <= MAX_PRICE;
    case 'low':
      return advert.offer.price <= MIN_PRICE;
    case 'high':
      return advert.offer.price >= MAX_PRICE;
    default:
      return false;
  }
};

const isSuitableAdvertRooms = (advert) => isAnyFilterValue(roomsFilter) || advert.offer.rooms === parseInt(roomsFilter.value, 10);

const isSuitableAdvertGuests = (advert) => isAnyFilterValue(guestsFilter) || advert.offer.guests === parseInt(guestsFilter.value, 10);

const isSuitableAdvertFeatures = (advert) => {
  const advertOffers = advert.offer.features || [];
  for (const feature of featuresFilters) {
    if (feature.checked && !advertOffers.includes(feature.value)) {
      return false;
    }
  }
  return true;
};

const filters = [
  isSuitableAdvertType,
  isSuitableAdvertPrice,
  isSuitableAdvertRooms,
  isSuitableAdvertGuests,
  isSuitableAdvertFeatures,
];

const isSuitableAdvert = (advert) => filters.every((filter) => filter(advert));

const filterAdverts = (adverts) => {
  const filteredAdverts = [];
  for (let i = 0; i < adverts.length && filteredAdverts.length < MAX_ADVERTS; i++) {
    const advert = adverts[i];
    if (isSuitableAdvert(advert)) {
      filteredAdverts.push(advert);
    }
  }
  return filteredAdverts;
};

const createFilterListener = (adverts) => debounce(() => renderMarkers(filterAdverts(adverts)), RENDER_DELAY);

const setFilterListeners = (adverts) => {
  const filterChangeHandler = createFilterListener(adverts);

  typeFilter.addEventListener('change', filterChangeHandler);
  priceFilter.addEventListener('change', filterChangeHandler);
  roomsFilter.addEventListener('change', filterChangeHandler);
  guestsFilter.addEventListener('change', filterChangeHandler);
  mapFeatures.addEventListener('change', filterChangeHandler);
};

export { filterAdverts, setFilterListeners };
