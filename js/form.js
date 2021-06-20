const noticeForm = document.querySelector('.ad-form');
const noticeFormElements = document.querySelectorAll('.ad-form__element');
const mapFiltersForm = document.querySelector('.map__filters');
const mapFiltersElements = document.querySelectorAll('.map__filter');

const noticeFormType = document.querySelector('#type');
const noticeFormPrice = document.querySelector('#price');
const noticeFormTitle = document.querySelector('#title');

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


noticeFormType.addEventListener('change', () => {
  switch (noticeFormType.value) {
    case 'bungalow':
      noticeFormPrice.placeholder = '0';
      noticeFormPrice.min = '0';
      console.log( noticeFormPrice.min);
      break;
    case 'flat':
      noticeFormPrice.placeholder = '1000';
      noticeFormPrice.min = '1000';
      console.log( noticeFormPrice.min);
      break;
    case 'hotel':
      noticeFormPrice.placeholder = '3000';
      noticeFormPrice.min = '3000';
      console.log( noticeFormPrice.min);
      break;
    case 'house':
      noticeFormPrice.placeholder = '5000';
      noticeFormPrice.min = '5000';
      console.log( noticeFormPrice.min);
      break;
    case 'palace':
      noticeFormPrice.placeholder = '10000';
      noticeFormPrice.min = '10000';
      console.log( noticeFormPrice.min);
      break;
  }
});

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

 console.log(noticeFormPrice.validity);

export {getActivePage, getNotActivePage};
