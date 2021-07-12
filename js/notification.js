
import { isEscEvent } from './dom-utils.js';

const successMsgTemplate = document.querySelector('#success').content.querySelector('.success');
const errorMsgTemplate = document.querySelector('#error').content.querySelector('.error');

const hideMessage = () => {
  const successMessage = document.querySelector('.success');
  const errorMessage = document.querySelector('.error');
  if (successMessage) {
    successMessage.remove();
  } else {
    errorMessage.remove();
  }
};

const onDocumentClick = () => hideMessage();

const onDocumentKeyDown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    hideMessage();
  }
};

const showMessage = (template) => {
  const message = template.cloneNode(true);
  document.body.insertAdjacentElement('beforeend', message);
  document.addEventListener('click', onDocumentClick, { once: true });
  document.addEventListener('keydown', onDocumentKeyDown, { once: true });
};

const showError = () => showMessage(errorMsgTemplate);
const showSuccess = () => showMessage(successMsgTemplate);

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

export {
  showSuccess,
  showError,
  showAlert
};
