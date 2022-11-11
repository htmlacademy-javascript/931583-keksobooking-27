import {
  disableForm,
  listenResetButtonClick,
  listenAdFormSubmit,
  activateForm,
  setCoordinates,
} from './form.js';

import {
  whenMapReady,
  centerMap
} from './map.js';

import {
  renderAds,
  activateFilter,
  addFilter } from './filter.js';

import {
  getData
} from './data.js';

import {
  debounce,
  showAlert
} from './util.js';

disableForm();

whenMapReady(() =>{
  activateForm();
  setCoordinates(centerMap);
});

getData()
  .then((ads) => {
    renderAds(ads);
    addFilter(debounce(() => renderAds(ads), 500));
    activateFilter();
    listenAdFormSubmit(() => renderAds(ads));
    listenResetButtonClick(() => renderAds(ads));
  })
  .catch((error) => showAlert(`Не удалось загрузить данные! ${error.message}`));


