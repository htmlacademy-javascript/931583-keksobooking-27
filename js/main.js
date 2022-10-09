
// Функция, возвращающая случайное целое число
// из переданного диапазона включительно:
function getRandomPositiveInteger (a, b) {
  if (a < 0 || b < 0) {
    return NaN;
  }
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

// Функция, возвращающая случайное число с плавающей
// точкой из переданного диапазона включительно
function getRandomPositiveFloat (a, b, digits = 1) {
  if (a < 0 || b < 0 || digits < 0) {
    return NaN;
  }
  const lower = Math.min(a, b);
  const upper = Math.max(a, b);
  const result = Math.random() * (upper - lower) + lower;
  return +result.toFixed(digits);
}

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

// Количество созданных объвлений
//
const ADS_COUNT = 10;

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
const createBookingAd = (bookigAd, index) => {
  bookigAd = {
    author: {
      avatar: `img/avatars/user${createNumberLink(index + 1)}.png`,
    },
    offer: {
      title: getRandomArrayElement(OFFER_TITLE),
      address: '',
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
      lar: getRandomPositiveFloat(35.65, 35.7, 5),
      lng: getRandomPositiveFloat(139.7, 139.8, 5),
    },
  };
  bookigAd.offer.address = `${bookigAd.location.lar}, ${bookigAd.location.lng}`;
  return bookigAd;
};

// Массив со всеми объявлениями
//
const allAds = Array.from({length: ADS_COUNT}, createBookingAd);
console.log(allAds);
