import {setFormEnabled} from './utils.js';
const mapFiltersForm = document.querySelector('.map__filters');
const mapFiltersElements = document.querySelectorAll('.map__filter');

const setMapFormEnabled = (enabled) => {
  setFormEnabled(mapFiltersForm, mapFiltersElements, enabled);
};

export {setMapFormEnabled};
