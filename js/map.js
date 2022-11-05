import { activateForm, createCoordinates } from './form.js';
import { getCard } from './card.js';

// Координаты центра карты
const centerMap = {
  lat: 35.682339,
  lng: 139.75318,
};

// Зум карты
const ZOOM_MAP = 12;

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
  .setView(centerMap, ZOOM_MAP);

// Использование тайлов от OpenStreetMap
L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

// Главный маркер
const mainPinMarker = L.marker(
  centerMap,
  {
    draggable: true,
    icon: mainPinIcon,
  },
);
mainPinMarker.addTo(map);

const markerGroup = L.layerGroup().addTo(map);
const clearMarkers = () => markerGroup.clearLayers();

// Создает маркеры похожих объявлений на карте
const addMarkers = (ads) => {
  ads.forEach((element) => {
    const marker = L.marker(
      {
        lat: element.location.lat,
        lng: element.location.lng,
      },
      {
        icon: pinIcon,
      },
    );
    marker
      .addTo(markerGroup)
      .bindPopup(getCard(element));
  });
};

// Запись координат от главного маркера для формы в поле "Адрес"
mainPinMarker.on('moveend', (evt) => {
  const coordinatesMarker = evt.target.getLatLng();
  createCoordinates(coordinatesMarker);
});

// Загружает карту и снимает блок с формы
const getMap = () => {
  map.on('load', activateForm());
  createCoordinates(centerMap);
};
export {getMap, addMarkers, clearMarkers, mainPinMarker, map, centerMap, ZOOM_MAP};
