import {createBookingAds} from './data.js';

// Объект с типом жилья для сопоставления с подписями на карточке
const TYPE_HOUSE = {
  'flat': 'Квартира',
  'bungalow': 'Бунгало',
  'house': 'Дом',
  'palace': 'Дворец',
  'hotel': 'Отель',
};

const mapCanvas = document.querySelector('.map__canvas');
const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

// Создает одно объяление
const bookingAds = createBookingAds(1);

// Собирает объявление
bookingAds.forEach((ad) => {
  const card = cardTemplate.cloneNode(true);
  card.querySelector('.popup__title').textContent = ad.offer.title;
  card.querySelector('.popup__text--address').textContent = ad.offer.address;
  card.querySelector('.popup__text--price').textContent = `${ad.offer.price} ₽/ночь`;
  card.querySelector('.popup__type').textContent = TYPE_HOUSE[ad.offer.type];
  card.querySelector('.popup__text--capacity').textContent = `${ad.offer.rooms} комнаты для ${ad.offer.guests} гостей`;
  card.querySelector('.popup__text--time').textContent = `Заезд после ${ad.offer.checkin}, выезд до ${ad.offer.checkout}`;
  card.querySelector('.popup__description').textContent = ad.offer.description;
  card.querySelector('.popup__avatar').src = ad.author.avatar;

  // Соотносит иконки преимуществ из шаблона с данными из сгенерированного объявления
  const featuresContainer = cardTemplate.querySelector('.popup__features');
  const featuresList = featuresContainer.querySelectorAll('.popup__feature');
  featuresList.forEach((featureItem) => {
    const isNecessary = ad.offer.features.some(
      (icon) => featureItem.classList.contains('popup__feature--' + icon),
    );
    if(!isNecessary) {
      featureItem.remove();
    }
  });

  // Создает фотографии и их src в карточке
  const photosSrc = ad.offer.photos;
  const photosContainer = card.querySelector('.popup__photos');
  photosContainer.innerHTML = '';
  photosSrc.forEach((link) => {
    const photo = document.createElement('img');
    photo.src = link;
    photo.classList.add('popup__photo');
    photo.alt = 'Фотография жилья';
    photo.setAttribute('width', '45');
    photo.setAttribute('height', '40');
    photosContainer.appendChild(photo);
  });

  // Выводит одну  сгенерированную карточку на страницу сайта
  mapCanvas.appendChild(card);
});


