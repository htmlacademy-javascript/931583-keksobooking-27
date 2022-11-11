const getData = () =>
  fetch('https://27.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Не удалось загрузить данные!');
      }
      return response.json();
    });

const sendData = (body) =>
  fetch(
    'https://27.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error('Не удалось отправить данные!');
      }
      return response.json();
    });

export {
  getData,
  sendData
};
