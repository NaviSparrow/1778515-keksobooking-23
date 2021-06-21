const noticeForm = document.querySelector('.ad-form');
const noticeFormElements = document.querySelectorAll('.ad-form__element');
const mapFiltersForm = document.querySelector('.map__filters');
const mapFiltersElements = document.querySelectorAll('.map__filter');

const noticeFormPrice = document.querySelector('#price');
const noticeFormTitle = document.querySelector('#title');
const noticeFormAddress = document.querySelector('#address');
const noticeFormRooms = document.querySelector('#room_number');
const noticeFormCapacity = document.querySelector('#capacity');

//---Активность страницы
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
  setFormEnabled(noticeForm, noticeFormElements);
  setFormEnabled(mapFiltersForm, mapFiltersElements);
};

const getNotActivePage = () => {
  setFormDisabled(noticeForm, noticeFormElements);
  setFormDisabled(mapFiltersForm, mapFiltersElements);
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
  switch (noticeFormRooms.value) {
    case '1':
      for (const option of noticeFormCapacity) {
        if (option.value !== '1') {
          option.setAttribute('disabled', 'disabled');
        }
      }
      break;
    case '2':
      for (const option of noticeFormCapacity) {
        if (option.value !== '2' && option.value !== '1') {
          option.setAttribute('disabled', 'disabled');
        }
      }
      break;
    case '3':
      for (const option of noticeFormCapacity) {
        if (option.value !== '3' && option.value !== '2' && option.value !== '1') {
          option.setAttribute('disabled', 'disabled');
        }
      }
      break;
    case '100':
      for (const option of noticeFormCapacity) {
        if (option.value !== '0') {
          option.setAttribute('disabled', 'disabled');
        }
      }
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

export {getActivePage, getNotActivePage};
