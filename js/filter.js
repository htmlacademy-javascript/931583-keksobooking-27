import {
  addMarkers,
  clearMarkers,
} from './map.js';

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
const featuresFilter = filterMap.querySelector('#housing-features');

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

const checkFeature = (el, checkboxes) => {
  if(checkboxes.length === 0) {
    return true;
  } else if (!el.offer.features) {
    return false;
  } else {
    return checkboxes.every((checkbox) => el.offer.features.includes(checkbox));
  }
};

// Создание и добавление маркеров на карту, в т.ч. в зависимости от значений фильтра
const renderAds = (data) => {
  const checkedCheckboxes = Array
    .from(featuresFilter.querySelectorAll('input[type="checkbox"]:checked'))
    .map((element) => element.value);
  const filteredAds = [];
  for (let i = 0; i < data.length; i++) {
    const el = data[i];
    if (checkTypeHouse(el) && checkRooms(el) && checkGuests(el) && checkPrice(el) && checkFeature(el, checkedCheckboxes)) {
      filteredAds.push(el);
    }
    if (filteredAds.length === AMOUNT_MARKERS) {
      break;
    }
  }
  clearMarkers();
  addMarkers(filteredAds);
};

const addFilter = (cb) => {
  filterMap.addEventListener('change', () => {
    cb();
  });
};

export {
  activateFilter,
  renderAds,
  addFilter,
  filterMap,
  filterMapChildren
};
