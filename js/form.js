const noticeForm = document.querySelector('.ad-form');
const noticeFormElements = document.querySelectorAll('.ad-form__element');

const noticeFormPrice = document.querySelector('#price');
const noticeFormTitle = document.querySelector('#title');
const noticeFormAddress = document.querySelector('#address');
const noticeFormRooms = document.querySelector('#room_number');
const noticeFormCapacity = document.querySelector('#capacity');
const noticeFormTimein = document.querySelector('#timein');
const noticeFormTimeout = document.querySelector('#timeout');

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

<<<<<<< HEAD
//---Валидация
=======
const getActivePage = () => {
  setFormEnabled(noticeForm, noticeFormElements);
  setFormEnabled(mapFiltersForm, mapFiltersElements);
};

const getNotActivePage = () => {
  setFormDisabled(noticeForm, noticeFormElements);
  setFormDisabled(mapFiltersForm, mapFiltersElements);
};

>>>>>>> b1f06d1 (в модуле form написал код для обработки полей ввода "тип жилья" и "время заезда/выезда")
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

noticeFormType.addEventListener('change', () => {
  switch (noticeFormType.value) {
    case 'bungalow':
      noticeFormPrice.placeholder = '0';
      noticeFormPrice.min = '0';
      break;
    case 'flat':
      noticeFormPrice.placeholder = '1000';
      noticeFormPrice.min = '1000';
      break;
    case 'hotel':
      noticeFormPrice.placeholder = '3000';
      noticeFormPrice.min = '3000';
      break;
    case 'house':
      noticeFormPrice.placeholder = '5000';
      noticeFormPrice.min = '5000';
      break;
    case 'palace':
      noticeFormPrice.placeholder = '10000';
      noticeFormPrice.min = '10000';
      break;
  }
});

noticeFormTimein.addEventListener('change', () => {
  switch (noticeFormTimein.value) {
    case '12:00':
      noticeFormTimeout.value = '12:00';
      break;
    case '13:00':
      noticeFormTimeout.value = '13:00';
      break;
    case '14:00':
      noticeFormTimeout.value = '14:00';
      break;
  }
});

noticeFormTimeout.addEventListener('change', () => {
  switch (noticeFormTimeout.value) {
    case '12:00':
      noticeFormTimein.value = '12:00';
      break;
    case '13:00':
      noticeFormTimein.value = '13:00';
      break;
    case '14:00':
      noticeFormTimein.value = '14:00';
      break;
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
