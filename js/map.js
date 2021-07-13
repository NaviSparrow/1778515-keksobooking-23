import { debounce } from './utils.js';
import { setFormEnabled } from './dom-utils.js';
import { showPopup } from './popup.js';

const RENDER_DELAY = 500;
const MIN_PRICE = 10000;
const MAX_PRICE = 50000;
const MAX_ADVERTS = 10;
const COORDINATES_LENGTH = 5;
const MAP_ZOOM = 13;

const DEFAULT_MAP_LOCATION = {
  lat: 35.68322,
  lng: 139.76901,
};

const mapFiltersForm = document.querySelector('.map__filters');
const mapFiltersElements = document.querySelectorAll('.map__filter');
const typeFilter = mapFiltersForm.querySelector('#housing-type');
const priceFilter = mapFiltersForm.querySelector('#housing-price');
const roomsFilter = mapFiltersForm.querySelector('#housing-rooms');
const guestsFilter = mapFiltersForm.querySelector('#housing-guests');
const mapFeatures = mapFiltersForm.querySelector('.map__features');
const featuresFilters = mapFeatures.querySelectorAll('.map__checkbox');

const map = L.map('map-canvas');

const advertIcon = L.icon({
  iconUrl: '../img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const mainPinIcon = L.icon({
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

const advertGroup = L.layerGroup().addTo(map);

const setMapFormEnabled = (enabled) => {
  setFormEnabled(mapFiltersForm, mapFiltersElements, enabled, 'map__filters');
};

const setMapLoadHandler = (loadHandler) => {
  map.on('load', () => loadHandler());

  map.setView(DEFAULT_MAP_LOCATION, MAP_ZOOM);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  mainPinMarker.addTo(map);
};

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

const renderMarkers = (adverts) => {
  advertGroup.clearLayers();
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

const showAdvertMarkers = (adverts) => {
  renderMarkers(filterAdverts(adverts));
  setFilterListeners(adverts);
};

const getMainPinLocation = () => ({
  lat: mainPinMarker._latlng.lat,
  lng: mainPinMarker._latlng.lng,
});

const setMainPinMoveHandler = (moveHandler) => {
  mainPinMarker.on('moveend', (evt) => {
    const coordinates = evt.target.getLatLng();
    moveHandler({
      lat: Number(coordinates.lat.toFixed(COORDINATES_LENGTH)),
      lng: Number(coordinates.lng.toFixed(COORDINATES_LENGTH)),
    });
  });
};

const resetMap = (adverts) => {
  mapFiltersForm.reset();
  map.setView(DEFAULT_MAP_LOCATION, MAP_ZOOM);
  mainPinMarker.setLatLng(DEFAULT_MAP_LOCATION);
  renderMarkers(filterAdverts(adverts));
};

export {
  DEFAULT_MAP_LOCATION,
  setMapLoadHandler,
  setMapFormEnabled,
  showAdvertMarkers,
  resetMap,
  getMainPinLocation,
  setMainPinMoveHandler
};
