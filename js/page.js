import {setOfferFormEnabled} from './form.js';
import {setMapFormEnabled} from './map.js';
import { noticeFormAddress } from './form.js';
import { mainPinMarker } from './map.js';
import { noticeForm } from './form.js';

const setPageEnabled = (enabled) => {
  setOfferFormEnabled(enabled);
  setMapFormEnabled(enabled);
};

const resetForm = () => {
  noticeForm.reset();
  mainPinMarker.setLatLng({
    lat: 35.68322,
    lng: 139.76901,
  });
  noticeFormAddress.value = `${mainPinMarker._latlng.lat}, ${mainPinMarker._latlng.lng}`;
};

export {setPageEnabled, resetForm};
