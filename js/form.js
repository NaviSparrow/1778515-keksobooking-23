import { setFormEnabled } from './utils.js';

const noticeForm = document.querySelector('.ad-form');
const noticeFormElements = document.querySelectorAll('.ad-form__element');
const noticeFormPrice = document.querySelector('#price');
const noticeFormTitle = document.querySelector('#title');
const noticeFormAddress = document.querySelector('#address');
const noticeFormRooms = document.querySelector('#room_number');
const noticeFormCapacity = document.querySelector('#capacity');
const noticeFormType = document.querySelector('#type');
const noticeFormTimein = document.querySelector('#timein');
const noticeFormTimeout = document.querySelector('#timeout');

const setOfferFormEnabled = (enabled) => {
  setFormEnabled(noticeForm, noticeFormElements, enabled);
};

noticeFormTitle.addEventListener('invalid', () => {
  if (noticeFormTitle.validity.tooShort) {
    noticeFormTitle.setCustomValidity('Заголовок должен состоять минимум из 30 символов');
  } else if (noticeFormTitle.validity.tooLong) {
    noticeFormTitle.setCustomValidity('Заголовок должен состоять максимум из 100 символов');
  } else if (noticeFormTitle.validity.valueMissing) {
    noticeFormTitle.setCustomValidity('Обязательное поле для заполнения');
  } else {
    noticeFormTitle.setCustomValidity('');
  }
});

noticeFormPrice.addEventListener('invalid', () => {
  if (noticeFormPrice.validity.rangeUnderflow) {
    noticeFormPrice.setCustomValidity(`Минимальная цена ${noticeFormPrice.min}`);
  } else if (noticeFormPrice.validity.rangeOverflow) {
    noticeFormPrice.setCustomValidity(`Максимальная цена ${noticeFormPrice.max}`);
  } else {
    noticeFormPrice.setCustomValidity('');
  }
});

noticeFormRooms.addEventListener('change', () => {
  const HUNDRED_ROOMS = 100;
  const ZERO_CAPACITY = 0;
  const roomsInt = parseInt(noticeFormRooms.value, 10);
  for (const option of noticeFormCapacity) {
    const optionInt = parseInt(option.value, 10);
    if (roomsInt === HUNDRED_ROOMS) {
      if (optionInt !== ZERO_CAPACITY) {
        option.setAttribute('disabled', 'disabled');
      } else {
        option.removeAttribute('disabled', 'disabled');
      }
    }
    else if (optionInt > roomsInt || optionInt === ZERO_CAPACITY) {
      option.setAttribute('disabled', 'disabled');
    } else {
      option.removeAttribute('disabled', 'disabled');
    }
  }
});

noticeFormType.addEventListener('change', () => {
  const PRICE_FOR_TYPE = {
    bungalow: '0',
    flat: '1000',
    hotel: '3000',
    house: '5000',
    palace: '10000',
  };
  noticeFormPrice.placeholder = PRICE_FOR_TYPE[noticeFormType.value];
  noticeFormPrice.min = PRICE_FOR_TYPE[noticeFormType.value];
});

noticeFormTimein.addEventListener('change', () => {
  noticeFormTimeout.value = noticeFormTimein.value;
});

noticeFormTimeout.addEventListener('change', () => {
  noticeFormTimein.value = noticeFormTimeout.value;
});

noticeFormAddress.addEventListener('invalid', () => {
  if (noticeFormAddress.validity.valueMissing) {
    noticeFormAddress.setCustomValidity('Обязательное поле для заполнения');
  } else {
    noticeFormAddress.setCustomValidity('');
  }
});

export {setOfferFormEnabled};
