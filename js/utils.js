const getRandomFloat = (min, max, precision) => {
  if (max <= min || max < 0 || min < 0) {
    return null;
  }
  const result = (Math.random() * (max - min + 0.1)) + min;
  return Number(result.toFixed(precision));
};

const getRandomInteger = (min, max) => getRandomFloat(min, max, 0);

const getRandomArrayElement = (array) => array[getRandomInteger(0, array.length - 1)];

const getRandomArray = (array) => {
  const newArray = array.slice().sort(() => Math.random() - 0.5);
  return newArray.slice(0, getRandomInteger(0, newArray.length - 1));
};

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

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '350px';
  alertContainer.style.right = '350px';
  alertContainer.style.top = '15px';
  alertContainer.style.padding = '20px 3px';
  alertContainer.style.fontSize = '25px';
  alertContainer.style.color = 'black';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;
  document.body.appendChild(alertContainer);
};

const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';


export {
  getRandomFloat,
  getRandomInteger,
  getRandomArrayElement,
  getRandomArray,
  setFormEnabled,
  showAlert,
  isEscEvent
};
