import {getRandomPositiveInteger, getRandomPositiveFloat} from './util.js';

// Массивы с данными для объявлений о бронировании
//
const OFFER_TITLE = [
  'Дом с приведениями',
  'Квартира-студия',
  'Шалаш',
  'Апартаменты',
  'Отель',
];

const OFFER_TYPE = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const OFFER_CHECKIN = [
  '12:00',
  '13:00',
  '14:00',
];

const OFFER_CHECKOUT = [
  '12:00',
  '13:00',
  '14:00',
];

const OFFER_FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const OFFER_DESCRIPTION = [
  'Большая - прибольшая площадь без туалета',
  'Маленькая - прималенькая площадь, на кухне нет стола',
  'Самое лучшее проживание, но нет окон и дверей',
  'Элитное жилье с обслуживающим персоналом и охраной',
  'Просто шалаш в лесу, удобства на улице',
];

const OFFER_PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

// Создает номер для ссылки
//
const createNumberLink = (input) => input < 10 ? `0${input}` : String(input);

// Выбирает случайный элемент из массива
//
const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

// Создает массив строк — массив случайной длины из значений
//
const createRandomArray = (elements) => {
  const lengthArray = elements.length;
  const lengthRandomArray = getRandomPositiveInteger(1, lengthArray);
  const array = [];

  while (array.length < lengthRandomArray) {
    const indexElement = getRandomPositiveInteger(0, lengthArray - 1);
    const element = elements[indexElement];

    if (!array.includes(element)) {
      array.push(element);
    }
  }
  return array;
};

// Создает объект объявления
//
const createBookingAd = (bookingAd, index) => {
  const latitude = getRandomPositiveFloat(35.65, 35.7, 5);
  const longitude = getRandomPositiveFloat(139.7, 139.8, 5);
  return {
    author: {
      avatar: `img/avatars/user${createNumberLink(index + 1)}.png`,
    },
    offer: {
      title: getRandomArrayElement(OFFER_TITLE),
      address: `${latitude}, ${longitude}`,
      price: getRandomPositiveInteger(1000, 15000),
      type: getRandomArrayElement(OFFER_TYPE),
      rooms: getRandomPositiveInteger(1, 6),
      guests: getRandomPositiveInteger(1, 12),
      checkin: getRandomArrayElement(OFFER_CHECKIN),
      checkout: getRandomArrayElement(OFFER_CHECKOUT),
      features: createRandomArray(OFFER_FEATURES),
      description: getRandomArrayElement(OFFER_DESCRIPTION),
      photos: createRandomArray(OFFER_PHOTOS),
    },
    location: {
      lar: latitude,
      lng: longitude,
    },
  };
};

// Массив со всеми объявлениями
//
const createBookingAds = (countAds) => Array.from({length: countAds}, createBookingAd);

export {createBookingAds};
