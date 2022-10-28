import { addMarkers, clearMarkers } from './map.js';

const FILTER_DEFAULT = 'any';

const AMOUNT_MARKERS = 10;

const PRICE_FILTER = {
  low: {
    from: 0,
    to: 10000,
  },
  middle: {
    from: 10000,
    to: 50000,
  },
  high: {
    from: 50000,
    to: 100000,
  },
};

const filterMap = document.querySelector('.map__filters');
const filterMapChildren = filterMap.children;
const typeHouseFilter = filterMap.querySelector('#housing-type');
const roomsFilter = filterMap.querySelector('#housing-rooms');
const guestsFilter = filterMap.querySelector('#housing-guests');
const priceFilter = filterMap.querySelector('#housing-price');
const featuresFilter = filterMap.querySelectorAll('.map__checkbox');
// Активное состояние фильтра
const activateFilter = () => {
  filterMap.classList.remove('.map__filters--disabled');
  for (const child of filterMapChildren) {
    child.removeAttribute('disabled', 'disabled');
  }
};

// Устанавливает взаимосвязь между фильтром и объялениями
const checkTypeHouse = (el) => typeHouseFilter.value === el.offer.type || typeHouseFilter.value === FILTER_DEFAULT;
const checkRooms = (el) => el.offer.rooms === +roomsFilter.value || roomsFilter.value === FILTER_DEFAULT;
const checkGuests = (el) => el.offer.guests === +guestsFilter.value || guestsFilter.value === FILTER_DEFAULT;
const checkPrice = (el) => priceFilter.value === FILTER_DEFAULT || (el.offer.price >= PRICE_FILTER[priceFilter.value].from && el.offer.price <= PRICE_FILTER[priceFilter.value].to);

console.log(featuresFilter);

// const checkFeatures = (el) => {
//   // Array.from(featuresFilter).some((checkbox) => {
//   //   if (checkbox.checked) {
//   //     return true;
//   //   }
//   //   if (!el.offer.features) {
//   //     return false;
//   //   }
//   //   return el.offer.features.includes(checkbox.value);
//   });
// };

// Создание и добавление маркеров на карту, в т.ч. в зависимости от значений фильтра
const renderAds = (data) => {
  const filteredAds = [];
  data.forEach((el) => {
    if (checkTypeHouse(el) && checkRooms(el) && checkGuests(el) && checkPrice(el) && checkFeatures(el)) {
      filteredAds.push(el);
    }
  });
  clearMarkers();
  addMarkers(filteredAds.slice(0, AMOUNT_MARKERS));

  filterMap.addEventListener('change', () => {
    renderAds(data);
  });
};

export {activateFilter, renderAds, filterMap, filterMapChildren};
