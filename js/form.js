import { setElementEnabled, setFormEnabled } from './utils.js';
import {DEFAULT_MAP_LOCATION, getMainPinLocation, setMainPinMoveHandler } from './map.js';

const HUNDRED_ROOMS = 100;
const ZERO_CAPACITY = 0;

const PRICE_FOR_TYPE = {
  bungalow: '0',
  flat: '1000',
  hotel: '3000',
  house: '5000',
  palace: '10000',
};

const adForm = document.querySelector('.ad-form');
const formFields = adForm.querySelectorAll('.ad-form__element');
const priceField = adForm.querySelector('#price');
const titleField = adForm.querySelector('#title');
const addressField = adForm.querySelector('#address');
const roomsField = adForm.querySelector('#room_number');
const capacityField = adForm.querySelector('#capacity');
const typeField = adForm.querySelector('#type');
const checkInField = adForm.querySelector('#timein');
const checkOutField = adForm.querySelector('#timeout');
const resetButton = adForm.querySelector('.ad-form__reset');

const setOfferFormEnabled = (enabled) => setFormEnabled(adForm, formFields, enabled, 'ad-form');

const formatLocation = (location) => `${location.lat}, ${location.lng}`;

const setFormSubmitHandler = (submitHandler) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    submitHandler(new FormData(evt.target));
  });
};

const resetAdForm = () => {
  adForm.reset();
  addressField.value = formatLocation(DEFAULT_MAP_LOCATION);
};

const setFormResetHandler = (resetHandler) => {
  resetButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    resetAdForm();
    resetHandler();
  });
};

titleField.addEventListener('invalid', () => {
  if (titleField.validity.tooShort) {
    titleField.setCustomValidity('Заголовок должен состоять минимум из 30 символов');
  } else if (titleField.validity.tooLong) {
    titleField.setCustomValidity('Заголовок должен состоять максимум из 100 символов');
  } else if (titleField.validity.valueMissing) {
    titleField.setCustomValidity('Обязательное поле для заполнения');
  } else {
    titleField.setCustomValidity('');
  }
});

priceField.addEventListener('invalid', () => {
  if (priceField.validity.rangeUnderflow) {
    priceField.setCustomValidity(`Минимальная цена ${priceField.min}`);
  } else if (priceField.validity.rangeOverflow) {
    priceField.setCustomValidity(`Максимальная цена ${priceField.max}`);
  } else {
    priceField.setCustomValidity('');
  }
});

addressField.setAttribute('readOnly', true);
addressField.addEventListener('invalid', () => {
  if (addressField.validity.valueMissing) {
    addressField.setCustomValidity('Обязательное поле для заполнения');
  } else {
    addressField.setCustomValidity('');
  }
});

const updatePriceField = () => {
  const typeSelectedOption = typeField.selectedOptions[0].value;
  const minPrice = PRICE_FOR_TYPE[typeSelectedOption];
  priceField.placeholder = minPrice;
  priceField.min = minPrice;
};

const updateCapacityField = () => {
  const roomsSelectedOption = parseInt(roomsField.selectedOptions[0].value, 10);
  for (const option of capacityField) {
    const intOption = parseInt(option.value, 10);
    setElementEnabled(option, roomsSelectedOption === intOption);
  }
};

const updateCheckInOutField = () => { checkInField.value = checkOutField.selectedOptions[0].value; };

const checkInOutChangeListener = (evt) => {
  const newCheckValue = evt.target.value;
  checkInField.value = newCheckValue;
  checkOutField.value = newCheckValue;
};

const roomsChangeListener = () => {
  const roomsInt = parseInt(roomsField.value, 10);
  for (const option of capacityField) {
    const optionInt = parseInt(option.value, 10);
    if (roomsInt === HUNDRED_ROOMS) {
      setElementEnabled(option, optionInt === ZERO_CAPACITY);
    } else {
      setElementEnabled(option, optionInt !== ZERO_CAPACITY);
      setElementEnabled(option, optionInt <= roomsInt && optionInt !== ZERO_CAPACITY);
    }
  }
};

roomsField.addEventListener('change', roomsChangeListener);
typeField.addEventListener('change', () => updatePriceField());
checkInField.addEventListener('change', checkInOutChangeListener);
checkOutField.addEventListener('change', checkInOutChangeListener);

updateCapacityField();
updatePriceField();
updateCheckInOutField();

addressField.value = formatLocation(getMainPinLocation());
setMainPinMoveHandler((location) => {
  addressField.value = formatLocation(location);
});


export {
  resetAdForm,
  setOfferFormEnabled,
  setFormSubmitHandler,
  setFormResetHandler
};
