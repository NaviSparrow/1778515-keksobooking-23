import { setFormEnabled } from './dom-utils.js';
import { getMainPinLocation, setMainPinMoveHandler } from './map.js';

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

const formatLocation = (location) => `${location.lat}, ${location.lng}`;

const setOfferFormEnabled = (enabled) => setFormEnabled(adForm, formFields, enabled, 'ad-form');

const setFormSubmitHandler = (submitHandler) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    submitHandler(new FormData(evt.target));
  });
};

const resetAdForm = () => {
  adForm.reset();
  addressField.value = formatLocation(getMainPinLocation());
};

const setFormResetHandler = (resetHandler) => {
  resetButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    resetHandler();
    resetAdForm();
  });
};

const updatePriceField = () => {
  const minPrice = PRICE_FOR_TYPE[typeField.selectedOptions[0].value];
  priceField.placeholder = minPrice;
  priceField.min = minPrice;
};

const updateCapacityField = () => {
  for (const option of capacityField) {
    if (parseInt(roomsField.selectedOptions[0].value, 10) === parseInt(option.value, 10)) {
      capacityField.value = option.value;
      option.removeAttribute('disabled', 'disabled');
    } else {
      option.setAttribute('disabled', 'disabled');
    }
  }
};

const updateCheckInOutField = () => {
  checkInField.value = checkOutField.selectedOptions[0].value;
};

const checkInOutChangeListener = (evt) => {
  const newCheckValue = evt.target.value;
  checkInField.value = newCheckValue;
  checkOutField.value = newCheckValue;
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

roomsField.addEventListener('change', () => {
  const roomsInt = parseInt(roomsField.value, 10);
  for (const option of capacityField) {
    const optionInt = parseInt(option.value, 10);
    if (roomsInt === HUNDRED_ROOMS) {
      if (optionInt !== ZERO_CAPACITY) { //вместо setElementEnabled я пока оставил это условие. Что бы при выборе 100 комнат - в поле "кол-ва" мест отображался единственно возможный вариант.
        option.setAttribute('disabled', 'disabled');
      } else {
        option.removeAttribute('disabled', 'disabled');
        capacityField.value = option.value; //в поле выбирается единственный вариант
      }
    }
    else if (optionInt > roomsInt || optionInt === ZERO_CAPACITY) {
      option.setAttribute('disabled', 'disabled');
    } else {
      option.removeAttribute('disabled', 'disabled');
      capacityField.value = option.value;
    }
  }
});

updateCapacityField(); // Функция апдейт поля "кол-ва мест". Нужна что бы при загрузке страницы изначально к полю "кол-ва мест" применялись ограничения по вариантам, т.к ограничения накладываются только при событии "change"
updatePriceField();
typeField.addEventListener('change', () => updatePriceField());

updateCheckInOutField(); //Смысл такой же как и в updateCapacityField, только для полей чекин/чекаут
checkInField.addEventListener('change', checkInOutChangeListener);
checkOutField.addEventListener('change', checkInOutChangeListener);

addressField.addEventListener('invalid', () => {
  if (addressField.validity.valueMissing) {
    addressField.setCustomValidity('Обязательное поле для заполнения');
  } else {
    addressField.setCustomValidity('');
  }
});

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
