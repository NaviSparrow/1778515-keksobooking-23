import {createAdvert} from './data.js';
import {createPopup} from './popup.js';
import {mapCanvas} from './popup.js';

const advertsPopupFragment = document.createDocumentFragment();
const similarAdverts = new Array(10).fill(null).map(() => createAdvert());
similarAdverts.forEach((advert) => {
  advertsPopupFragment.appendChild(createPopup(advert));
});

mapCanvas.appendChild(advertsPopupFragment.firstChild);
