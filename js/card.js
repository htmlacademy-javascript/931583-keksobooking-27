// Объект с типом жилья для сопоставления с подписями на карточке
const TYPE_HOUSE = {
  'flat': 'Квартира',
  'bungalow': 'Бунгало',
  'house': 'Дом',
  'palace': 'Дворец',
  'hotel': 'Отель',
};

// Собирает объявление
const getCard = (ad) => {
  const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
  const card = cardTemplate.cloneNode(true);

  card.querySelector('.popup__title').textContent = ad.offer.title || '';
  card.querySelector('.popup__text--address').textContent = ad.offer.address || '';
  card.querySelector('.popup__text--price').textContent = `${ad.offer.price} ₽/ночь` || '';
  card.querySelector('.popup__type').textContent = TYPE_HOUSE[ad.offer.type] || '';
  card.querySelector('.popup__text--capacity').textContent = `${ad.offer.rooms} комнаты для ${ad.offer.guests} гостей` || '';
  card.querySelector('.popup__text--time').textContent = `Заезд после ${ad.offer.checkin}, выезд до ${ad.offer.checkout}` || '';
  card.querySelector('.popup__description').textContent = ad.offer.description || '';
  card.querySelector('.popup__avatar').src = ad.author.avatar || '';

  // Соотносит иконки преимуществ из шаблона с данными из сгенерированного объявления
  const featuresContainer = card.querySelector('.popup__features');
  const featuresList = featuresContainer.querySelectorAll('.popup__feature');
  const features = ad.offer.features;
  if (features) {
    featuresList.forEach((featureItem) => {
      const isNecessary = features.some(
        (modifier) => featureItem.classList.contains(`popup__feature--${modifier}`),
      );
      if (!isNecessary) {
        featureItem.remove();
      }
    });
  } else {
    featuresContainer.remove();
  }

  // Создает фотографии и их src в карточке
  const photosSrc = ad.offer.photos;
  const photosContainer = card.querySelector('.popup__photos');
  photosContainer.innerHTML = '';
  if (photosSrc) {
    photosSrc.forEach((link) => {
      const photo = document.createElement('img');
      photo.src = link;
      photo.classList.add('popup__photo');
      photo.alt = 'Фотография жилья';
      photo.setAttribute('width', '45');
      photo.setAttribute('height', '40');
      photosContainer.appendChild(photo);
    });
  } else {
    photosContainer.remove();
  }

  // Выводит одну  сгенерированную карточку на страницу сайта
  return card;
};

export {
  getCard
};
