import {setOfferFormEnabled} from './form.js';
import {setMapFormEnabled, mapFiltersForm} from './map.js';
import {noticeForm, noticeFormAddress } from './form.js';
import { mainPinMarker } from './map.js';

const setPageEnabled = (enabled) => {
  setOfferFormEnabled(enabled);
  setMapFormEnabled(enabled);
};

const resetPage = () => {  //где её вызвать и как мне заного отрисовать маркеры после сброса фильтров карты
  noticeForm.reset();
  mapFiltersForm.reset();
  mainPinMarker.setLatLng({
    lat: 35.68322,
    lng: 139.76901,
  });
  noticeFormAddress.value = `${mainPinMarker._latlng.lat}, ${mainPinMarker._latlng.lng}`;
};

export {setPageEnabled, resetPage};
