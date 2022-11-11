import {
  sendData,
} from './data.js';

import {
  showSuccessPopup,
  showErrorPopup
} from './popup.js';

import {
  mainPinMarker,
  map,
  centerMap,
  ZOOM_MAP,
} from './map.js';

import {
  filterMap,
  filterMapChildren,
} from './filter.js';

import {
  initAvatarPreview,
  initPhotoPreview,
  photoPreview,
  imgAvatar,
} from './photo.js';

const questsOption = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2','3'],
  '100': ['0'],
};

const minPriceHouse = {
  'bungalow': '0',
  'flat': '1 000',
  'hotel': '3 000',
  'house': '5 000',
  'palace': '10 000',
};

const questsErrorMessage = {
  '1': 'Размещение в 1 комнате - не более 1 гостя',
  '2': 'Размещение в 2 комнатах - от 1 до 2 гостей',
  '3': 'Размещение в 3 комнатах - от 1 до 3 гостей',
  '100': '100 комнат не для гостей!',
};

const allowedHeaderLength = {
  min: 30,
  max: 100,
};

const MAX_PRICE = 100000;

const DEFAULT_AVATAR_SRC = 'img/muffin-grey.svg';

const formAd = document.querySelector('.ad-form');
const formAdChildren = formAd.children;

// Элементы формы
const titleField = formAd.querySelector('#title');
const roomField = formAd.querySelector('#room_number');
const capacityField = formAd.querySelector('#capacity');
const priceField = formAd.querySelector('#price');
const typeHouseField = formAd.querySelector('#type');
const checkInField = formAd.querySelector('#timein');
const checkOutField = formAd.querySelector('#timeout');
const addressField = formAd.querySelector('#address');
const resetButton = formAd.querySelector('.ad-form__reset');

// Элемент для слайдера
const sliderPriceElement = formAd.querySelector('.ad-form__slider');

// Переводит мин.цену из строки в число
const getNumberMinPrice = () => parseInt(minPriceHouse[typeHouseField.value].replace(' ', ''), 10);

// Слайдер noUiSlider
noUiSlider.create(sliderPriceElement, {
  range: {
    min: 0,
    max: MAX_PRICE,
  },
  start: getNumberMinPrice(),
  connect: 'lower',
  format: {
    to: (value) => Number(value.toFixed(0)),
    from: (value) => parseFloat(value),
  },
});

// Pristine
const pristine = new Pristine(formAd, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  errorTextParent: 'ad-form__element',
});

// Проверка на валидацию - Заголовок
const validateTitle = (value) => value.length >= allowedHeaderLength.min && value.length <= allowedHeaderLength.max;

pristine.addValidator(
  titleField,
  validateTitle,
  `От ${allowedHeaderLength.min} до ${allowedHeaderLength.max} символов`,
  0
);

// Проверка на валидацию - зависимость полей "Количество комнат" и "Количество мест"
const validateQuests = () => questsOption[roomField.value].includes(capacityField.value);

const getQuestsErrorMessage = () => questsErrorMessage[roomField.value];

pristine.addValidator(
  capacityField, validateQuests, getQuestsErrorMessage
);

//  Выбор значения «Тип жилья» меняет атрибуты минимального значения и плейсхолдера поля «Цена за ночь».
const changeMinPrice = () => {
  priceField.min = getNumberMinPrice();
  priceField.placeholder = minPriceHouse[typeHouseField.value];
};

typeHouseField.addEventListener('change', changeMinPrice);

// Включает слайдер при нажатии и перетягивании ползунка
sliderPriceElement.noUiSlider.on('slide', (evt) => {
  if (evt) {
    priceField.value = sliderPriceElement.noUiSlider.get();
  }
});

// Меняет положение ползунка слайдера в зависимости от введенного значения поля цены
priceField.addEventListener('change', () => {
  sliderPriceElement.noUiSlider.set(priceField.value);
});
// Проверка на валидацию - зависимость поля «Цена за ночь» от значения «Тип жилья»
const validatePriceHouse = () => Number(priceField.value) >= Number(priceField.min);
const getPriceErrorMessage = () => `${typeHouseField.options[typeHouseField.selectedIndex].text} - мин.цена ${priceField.min} рублей!`;

pristine.addValidator(
  priceField, validatePriceHouse, getPriceErrorMessage
);

// «Время заезда» и «Время выезда» - выбор значения одного поля автоматически изменят значение другого.
const changeCheckIn = () => {
  checkOutField.value = checkInField.value;
};

const changeCheckOut = () => {
  checkInField.value = checkOutField.value;
};

checkInField.addEventListener('change', changeCheckIn);
checkOutField.addEventListener('change', changeCheckOut);

// Блокировка поля "Адрес" для редактирования и создание его значений от главного маркера карты
addressField.setAttribute('readonly', 'readonly');

const setCoordinates = (coordinates) => {
  addressField.value = `${(coordinates.lat).toFixed(5)}, ${(coordinates.lng).toFixed(5)}`;
};

// Включает загрузку и превью аватарки и фото
initAvatarPreview();
initPhotoPreview();

// Сбросывает все поля при успешной отправке или при нажатии на кнопку "Очистка"
const resetForm = () => {
  mainPinMarker.setLatLng(centerMap);
  map.setView(centerMap, ZOOM_MAP);
  map.closePopup();
  imgAvatar.src = DEFAULT_AVATAR_SRC;
  photoPreview.innerHTML = '';
  formAd.reset();
  filterMap.reset();
  sliderPriceElement.noUiSlider.reset();
  pristine.reset();
  changeMinPrice();
  setCoordinates(mainPinMarker.getLatLng());
};

// Сброс формы при нажатии кнопки "Очистка"
const listenResetButtonClick = (cb) => {
  resetButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    resetForm();
    cb();
  });
};

// Отправка формы SUBMIT
const listenAdFormSubmit = (cb) => {
  formAd.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      sendData(new FormData(evt.target))
        .then(() => {
          showSuccessPopup();
          resetForm();
          cb();
        })
        .catch(() => {
          showErrorPopup();
        });
    }
  });
};

// Неактивное состояние формы и фильтра при отключенной карте
const disableForm = () => {
  formAd.classList.add('ad-form--disabled');
  Array.from(formAdChildren).forEach((element) => element.setAttribute('disabled', 'disabled'));
  filterMap.classList.add('.map__filters--disabled');
  Array.from(filterMapChildren).forEach((element) => element.setAttribute('disabled', 'disabled'));
};

// Активное состояние формы
const activateForm = () => {
  formAd.classList.remove('ad-form--disabled');
  Array.from(formAdChildren).forEach((element) => element.removeAttribute('disabled'));
};

export {
  disableForm,
  listenResetButtonClick,
  listenAdFormSubmit,
  activateForm,
  setCoordinates,
  pristine
};
