import {setPageEnabled} from './page.js';
import {setOnMapLoad, setOnFiltersChange, getFiltered} from './map.js';
import {getData} from './fetch.js';
import {setOnFormSubmit} from './form.js';
import {showSuccessMsg} from './utils.js';
import './form.js';

setPageEnabled(false);

setOnMapLoad(() => {
  setPageEnabled(true);
  getData((adverts) => {
    getFiltered(adverts);
    setOnFiltersChange(() => getFiltered(adverts));
  });
});

setOnFormSubmit(showSuccessMsg);
