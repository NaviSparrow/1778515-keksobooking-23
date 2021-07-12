import { showAlert } from './notification.js';

const KEKSOBOOKING_URL = 'https://23.javascript.pages.academy/keksobooking';

const fetchAdverts = (onSuccess) => {
  fetch(`${KEKSOBOOKING_URL}/data`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.status);
    })
    .then((adverts) => onSuccess(adverts))
    .catch((error) => showAlert(`При загрузке данных с сервера произошла ошибка: "${error}"`));
};

const saveAdvert = (body, onSuccess, onFail) => {
  fetch(KEKSOBOOKING_URL,
    {
      method: 'POST',
      body,
    })
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => onFail());
};

export { fetchAdverts, saveAdvert };
