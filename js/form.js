const formAd = document.querySelector('.ad-form');
const formAdChildren = formAd.children;
const filterMap = document.querySelector('.map__filters');
const filterMapChildren = filterMap.children;

// Элементы формы для валидации
const titleField = formAd.querySelector('#title');
const roomField = formAd.querySelector('#room_number');
const capacityField = formAd.querySelector('#capacity');

// Pristine
const pristine = new Pristine(formAd, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  errorTextParent: 'ad-form__element',
});

// Проверка на валидацию - Заголовок
const validateTitle = (value) => value.length >= 30 && value.length <= 100;

pristine.addValidator(
  titleField,
  validateTitle,
  'От 30 до 100 символов',
  0
);

// Проверка на валидацию - синхронизация полей "Количество комнат" и "Количество мест"
const questsOption = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2','3'],
  '100': ['0'],
};

const validateQuests = () => questsOption[roomField.value].includes(capacityField.value);

const getDeliveryErrorMessage = () => {
  let deliveryErrorMessage;
  switch (roomField.value) {
    case '1':
      deliveryErrorMessage = 'Размещение в 1 комнате - не более 1 гостя';
      break;
    case '2':
      deliveryErrorMessage = 'Размещение в 2 комнатах - от 1 до 2 гостей';
      break;
    case '3':
      deliveryErrorMessage = 'Размещение в 3 комнатах - от 1 до 3 гостей';
      break;
    case '100':
      deliveryErrorMessage = '100 комнат не для гостей';
      break;
  }
  return deliveryErrorMessage;
};

pristine.addValidator(
  capacityField, validateQuests, getDeliveryErrorMessage
);

// Отправка формы SUBMIT
formAd.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

// Неактивное состояние формы и фильтра при отключенной карте
const pageDisabled = () => {
  formAd.classList.add('ad-form--disabled');
  for (const child of formAdChildren) {
    child.setAttribute('disabled', 'disabled');
  }

  filterMap.classList.add('.map__filters--disabled');
  for (const child of filterMapChildren) {
    child.setAttribute('disabled', 'disabled');
  }
};

// Активное состояние формы и фильтра при включенной карте
const pageActive = () => {
  formAd.classList.remove('ad-form--disabled');
  for (const child of formAdChildren) {
    child.removeAttribute('disabled', 'disabled');
  }

  filterMap.classList.remove('.map__filters--disabled');
  for (const child of filterMapChildren) {
    child.removeAttribute('disabled', 'disabled');
  }
};

export {pageDisabled,pageActive};
