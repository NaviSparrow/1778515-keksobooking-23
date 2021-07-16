import { filterAdverts, setFilterListeners } from './filter.js';
import { setFormEnabled } from './utils.js';
import { showPopup } from './popup.js';

const COORDINATES_LENGTH = 5;
const MAP_ZOOM = 13;

const DEFAULT_MAP_LOCATION = {
  lat: 35.68322,
  lng: 139.76901,
};

const mapFiltersForm = document.querySelector('.map__filters');
const mapFiltersElements = document.querySelectorAll('.map__filter');

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
  renderMarkers,
  resetMap,
  getMainPinLocation,
  setMainPinMoveHandler
};
