import { pageActive, getCoordinates } from './form.js';
import { createBookingAds } from './data.js';
import { getCard } from './card.js';

// Координаты центра карты
const CENTER_MAP = {
  lat: 35.6895,
  lng: 139.6917,
};

// Главная иконка маркера на карте
const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

// Иконка маркера на карте
const pinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

// Карта с центром в Токио
const map = L.map('map-canvas')
  .setView(CENTER_MAP, 12);

// Использование тайлов от OpenStreetMap
L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

// Главный маркер
const mainPinMarker = L.marker(
  CENTER_MAP,
  {
    draggable: true,
    icon: mainPinIcon,
  },
);
mainPinMarker.addTo(map);

// 10 карточек объявлений и соответствующие им маркеры
const bookingAds = createBookingAds(10);
bookingAds.forEach((element) => {
  const marker = L.marker(
    {
      lat: element.location.lar,
      lng: element.location.lng,
    },
    {
      icon: pinIcon,
    },
  );
  marker
    .addTo(map)
    .bindPopup(getCard(element));
});

// Запись координат от главного маркера для формы в поле "Адрес"
mainPinMarker.on('moveend', (evt) => {
  const coordinatesMarker = evt.target.getLatLng();
  getCoordinates(coordinatesMarker);
});

// Загружает карту и снимает блок с формы
const loadMap = () => {
  map.on('load', pageActive());
  getCoordinates(CENTER_MAP);
};

export {loadMap};
