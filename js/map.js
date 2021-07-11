import {debounce, setFormEnabled, RENDER_DELAY} from './utils.js';
import { showPopup } from './popup.js';

const MIN_PRICE = 10000;
const MAX_PRICE = 50000;
const MAX_ADVERTS = 10;

const mapFiltersForm = document.querySelector('.map__filters');
const mapFiltersElements = document.querySelectorAll('.map__filter');
const typeFilter = mapFiltersForm.querySelector('#housing-type');
const priceFilter = mapFiltersForm.querySelector('#housing-price');
const roomsFilter = mapFiltersForm.querySelector('#housing-rooms');
const guestsFilter = mapFiltersForm.querySelector('#housing-guests');
const mapFeatures = mapFiltersForm.querySelector('.map__features');
const featuresFilters = mapFeatures.querySelectorAll('.map__checkbox');

const setMapFormEnabled = (enabled) => {
  setFormEnabled(mapFiltersForm, mapFiltersElements, enabled);
};

const map = L.map('map-canvas');

const mainPinIcon = L.icon ({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: 35.68322,
    lng: 139.76901,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

const setOnMapLoad = (callback) => {
  map.on('load', () => {
    callback();
  });

  map.setView({
    lat: 35.68322,
    lng: 139.76901,
  }, 13);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);
  mainPinMarker.addTo(map);
};

const advertGroup = L.layerGroup().addTo(map);

const advertIcon = L.icon({
  iconUrl: '../img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const changeMarkersOnMap = (callback) => {
  advertGroup.clearLayers();
  callback();
};

const setOnFiltersChange = (callback) => {
  typeFilter.addEventListener('change', debounce(() => { changeMarkersOnMap(callback); }, RENDER_DELAY));

  priceFilter.addEventListener('change', debounce(() => { changeMarkersOnMap(callback); }, RENDER_DELAY));

  roomsFilter.addEventListener('change', debounce(() => { changeMarkersOnMap(callback); }, RENDER_DELAY));

  guestsFilter.addEventListener('change', debounce(() => { changeMarkersOnMap(callback); }, RENDER_DELAY));

  mapFeatures.addEventListener('change', debounce(() => { changeMarkersOnMap(callback); }, RENDER_DELAY));
};

const isValueAny = (filter) => {
  if (filter.value === 'any') {
    return true;
  }
};

const isSuitableAdvertType = (advert) => {
  if (advert.offer.type === typeFilter.value) {
    return true;
  }
  return isValueAny(typeFilter);
};

const isSuitableAdvertPrice = (advert) => {
  if (priceFilter.value === 'middle') {
    if (advert.offer.price >= MIN_PRICE && advert.offer.price <= MAX_PRICE) {
      return true;
    }
  }
  else if (priceFilter.value === 'low') {
    if (advert.offer.price <= MIN_PRICE) {
      return true;
    }
  }
  else if (priceFilter.value === 'high') {
    if (advert.offer.price >= MAX_PRICE) {
      return true;
    }
  }
  return isValueAny(priceFilter);
};

const isSuitableAdvertRooms = (advert) => {
  if (advert.offer.rooms === parseInt(roomsFilter.value, 10)) {
    return true;
  }
  return isValueAny(roomsFilter);
};

const isSuitableAdvertGuests = (advert) => {
  if (advert.offer.guests === parseInt(guestsFilter.value, 10)) {
    return true;
  }
  else if (parseInt(guestsFilter.value, 10) === 0 && advert.offer.rooms > 3) { //вот тут ты сказал, что нужно показывать офферы у которых 100 комнат, но таких нет. Максимум 10 вроде
    return true;
  }
  return isValueAny(guestsFilter);
};

const isSuitableAdvertFeatures = (advert) => {
  const checkedFeatures = [];
  for (const feature of featuresFilters) {
    if (feature.checked) {
      checkedFeatures.push(feature.value);
    }
  }
  if (advert.offer.features) {
    return checkedFeatures.every((feature) => advert.offer.features.includes(feature));
  }
};

const filters = [
  isSuitableAdvertType,
  isSuitableAdvertPrice,
  isSuitableAdvertRooms,
  isSuitableAdvertGuests,
  isSuitableAdvertFeatures,
];

const isSuitableAdvert = (advert) => filters.every((filter) => filter(advert));

const createMarkers = (adverts) => {
  adverts
    .forEach((advert) => {
      L.marker(
        {
          lat: advert.location.lat,
          lng: advert.location.lng,
        },
        {
          icon: advertIcon,
        },
      ).addTo(advertGroup)
        .bindPopup(
          showPopup(advert),
          {
            keepInView: true,
          },
        );
    });
};

const getFiltered = (adverts) => {
  const filteredAdverts = [];
  for (let i = 0; i < adverts.length && filteredAdverts.length < MAX_ADVERTS; i++) {
    const advert = adverts[i];
    if (isSuitableAdvert(advert)) {
      filteredAdverts.push(advert);
    }
  }
  createMarkers(filteredAdverts);
};

export {
  mainPinMarker,
  featuresFilters,
  mapFiltersForm,
  mapFiltersElements,
  setOnMapLoad,
  setMapFormEnabled,
  createMarkers,
  setOnFiltersChange,
  getFiltered
};
