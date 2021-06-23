import {createAdvert} from './data.js';
import {showPopup} from './popup.js';
import {setPageEnabled} from './page.js';
import './form.js';

const similarAdverts = new Array(10).fill(null).map(() => createAdvert());
showPopup(similarAdverts[0]);

setPageEnabled(true);
