import {createAdvert} from './data.js';
import {showPopup} from './popup.js';


const similarAdverts = new Array(10).fill(null).map(() => createAdvert());
showPopup(similarAdverts[0]);
