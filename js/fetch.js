import { showAlert } from './utils.js';

const getData = (onSuccsess) => {
  fetch('https://23.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.status);
    })
    .then((adverts) => {
      onSuccsess(adverts);
    })
    .catch((error) => {
      showAlert(`При загрузке данных с сервера произошла ошибка "${error}"`);
    });
};

const sendData = (onSuccsess, onFail, body) => {
  fetch('https://23.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccsess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};

export {getData, sendData};
