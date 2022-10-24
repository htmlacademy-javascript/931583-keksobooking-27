import {showAlert} from './util.js';

const getData = (onSuccess) => {
  fetch('https://27.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        showAlert('Не удалось получить данные с сервера!');
      }
    })
    .then((ads) => onSuccess(ads))
    .catch((err) => showAlert('Не удалось получить данные с сервера!'));
};

export {getData};
