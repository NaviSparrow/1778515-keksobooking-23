import {noticeForm, noticeFormElements} from './form.js';
import {mapFiltersForm, mapFiltersElements} from './map.js';

const setFormEnabled = (form, elements, enabled) => {
  if (enabled) {
    form.classList.remove('ad-form--disabled');
    for (const element of elements) {
      element.removeAttribute('disabled', 'disabled');
    }
  } else {
    form.classList.add('ad-form--disabled');
    for (const element of elements) {
      element.setAttribute('disabled', 'disabled');
    }
  }
};

const setPageEnabled = (enabled) => {
  setFormEnabled(noticeForm, noticeFormElements, enabled);
  setFormEnabled(mapFiltersForm, mapFiltersElements, enabled);
};

export {setPageEnabled};
