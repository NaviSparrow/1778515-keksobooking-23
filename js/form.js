const noticeForm = document.querySelector('.ad-form');
const noticeFormElements = document.querySelectorAll('.ad-form__element');

const noticeFormPrice = document.querySelector('#price');
const noticeFormTitle = document.querySelector('#title');
const noticeFormAddress = document.querySelector('#address');
const noticeFormRooms = document.querySelector('#room_number');
const noticeFormCapacity = document.querySelector('#capacity');

const setOfferFormEnabled = (form, elements, enabled) => {
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

//---Валидация
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
  const roomsInt = parseInt(noticeFormRooms.value, 10);
  for (const option of noticeFormCapacity) {
    const optionInt = parseInt(option.value, 10);
    if (roomsInt === 100) {
      if (optionInt !== 0) {
        option.setAttribute('disabled', 'disabled');
      }
    } else if (optionInt > roomsInt || optionInt === 0) {
      option.setAttribute('disabled', 'disabled');
    } else {
      option.removeAttribute('disabled', 'disabled');
    }
  }
});

noticeFormAddress.addEventListener('invalid', () => {
  if (noticeFormAddress.validity.valueMissing) {
    noticeFormAddress.setCustomValidity('Обязательное поле для заполнения');
  } else {
    noticeFormAddress.setCustomValidity('');
  }
});

export {noticeForm, noticeFormElements, setOfferFormEnabled};
