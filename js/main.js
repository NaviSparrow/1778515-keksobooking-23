import { setMapLoadHandler, showAdvertMarkers, setMapFormEnabled, resetMap } from './map.js';
import { fetchAdverts, saveAdvert } from './api.js';
import { setFormResetHandler, setFormSubmitHandler, setOfferFormEnabled, resetAdForm } from './form.js';
import { showSuccess, showError } from './notification.js';

let adverts = [];

const setPageEnabled = (enabled) => {
  setOfferFormEnabled(enabled);
  setMapFormEnabled(enabled);
};

setPageEnabled(false);

setMapLoadHandler(() => {
  setPageEnabled(true);

  setFormSubmitHandler((newAdvert) => {
    saveAdvert(newAdvert, () => {
      resetMap(adverts);
      resetAdForm();
      showSuccess();
    }, showError);
  });

  setFormResetHandler(() => resetMap(adverts));

  fetchAdverts((advertsFromServer) => {
    adverts = advertsFromServer;
    showAdvertMarkers(adverts);
  });
});
