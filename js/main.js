import {setPageEnabled} from './page.js';
import { createMarkers } from './map.js';
import { setOnMapLoad } from './map.js';
import { getData } from './fetch.js';
import { setOnFormSubmit } from './form.js';
import { showSuccsess } from './popup.js';
import './form.js';

setPageEnabled(false);

setOnMapLoad(() => {
  setPageEnabled(true);
  getData(createMarkers);
});

setOnFormSubmit(showSuccsess);
