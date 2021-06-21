import {createAdvert} from './data.js';
import {showPopup} from './popup.js';
import {getNotActivePage} from './form.js';
import { getActivePage } from './form.js';

const similarAdverts = new Array(10).fill(null).map(() => createAdvert());
showPopup(similarAdverts[0]);

getNotActivePage();
getActivePage();
