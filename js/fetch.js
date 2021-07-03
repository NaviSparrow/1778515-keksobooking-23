import { showAlert } from './popup.js';

const KEKSOBOOKING_URL = 'https://23.javascript.pages.academy/keksobooking';

const getData = (onSuccess) => {
  fetch(`${KEKSOBOOKING_URL}/data`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.status);
    })
    .then((adverts) => {
      onSuccess(adverts);
    })
    .catch((error) => {
      showAlert(`При загрузке данных с сервера произошла ошибка "${error}"`);
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(KEKSOBOOKING_URL,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};

export {getData, sendData};
