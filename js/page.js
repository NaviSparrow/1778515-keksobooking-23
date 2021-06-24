import {setOfferFormEnabled} from './form.js';
import {setMapFormEnabled} from './map.js';

const setPageEnabled = (enabled) => {
  setOfferFormEnabled(enabled);
  setMapFormEnabled(enabled);
};

export {setPageEnabled};
