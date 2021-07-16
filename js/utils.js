const debounce = (callback, timeout) => {
  let timer;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(callback, timeout);
  };
};

const setElementEnabled = (element, enabled) => {
  if (enabled) {
    element.removeAttribute('disabled');
  } else {
    element.setAttribute('disabled', true);
  }
};

const setFormEnabled = (form, elements, enabled, className) => {
  if (enabled) {
    form.classList.remove(`${className}--disabled`);
    for (const element of elements) {
      setElementEnabled(element, enabled);
    }
  } else {
    form.classList.add(`${className}--disabled`);
    for (const element of elements) {
      setElementEnabled(element, enabled);
    }
  }
};

const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';


export {
  debounce,
  setElementEnabled,
  setFormEnabled,
  isEscEvent
};
