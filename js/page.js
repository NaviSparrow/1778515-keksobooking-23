import {noticeForm, noticeFormElements, setOfferFormEnabled} from './form.js';
import {mapFiltersForm, mapFiltersElements, setMapFormEnabled} from './map.js';

const setPageEnabled = (enabled) => {
  setOfferFormEnabled(noticeForm, noticeFormElements, enabled);
  setMapFormEnabled(mapFiltersForm, mapFiltersElements, enabled);
};

export {setPageEnabled};
