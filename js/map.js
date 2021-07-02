import {setFormEnabled} from './utils.js';
import { showPopup } from './popup.js';

const mapFiltersForm = document.querySelector('.map__filters');
const mapFiltersElements = document.querySelectorAll('.map__filter');

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
  }, 10);

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

const createMarkers = (adverts) => {
  adverts.forEach((advert) => {
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

export {
  mainPinMarker,
  setOnMapLoad,
  setMapFormEnabled,
  createMarkers
};
