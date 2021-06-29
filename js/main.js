import {createAdvert} from './data.js';
import {setPageEnabled} from './page.js';
import { createMarker } from './map.js';
import { setOnMapLoad } from './map.js';
import './form.js';

setPageEnabled(false);

setOnMapLoad(() => {
  setPageEnabled(true);
  const similarAdverts = new Array(10).fill(null).map(() => createAdvert());
  similarAdverts.forEach((advert) => createMarker(advert));
});
