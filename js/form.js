const noticeForm = document.querySelector('.ad-form');
const formElements = document.querySelectorAll('.ad-form__element');
const mapFiltersForm = document.querySelector('.map__filters');
const mapFiltersElements = document.querySelectorAll('.map__filter');

const setFormDisabled = (form, elements) => {
  form.classList.add('ad-form--disabled');
  for (const element of elements) {
    element.setAttribute('disabled', 'disabled');
  }
};

const setFormEnabled = (form, elements) => {
  form.classList.remove('ad-form--disabled');
  for (const element of elements) {
    element.removeAttribute('disabled', 'disabled');
  }
};

const getActivePage = () => {
  setFormEnabled(noticeForm, formElements);
  setFormEnabled(mapFiltersForm, mapFiltersElements);
};

const getNotActivePage = () => {
  setFormDisabled(noticeForm, formElements);
  setFormDisabled(mapFiltersForm, mapFiltersElements);
};

export {getActivePage, getNotActivePage};
