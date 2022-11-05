import {
  disableForm,
  resetPage,
  submitForm,
} from './form.js';

import {
  getMap
} from './map.js';

import {
  renderAds,
  activateFilter,
  addFilter } from './filter.js';

import {
  getData
} from './data.js';

import {
  debounce
} from './util.js';

disableForm();
getMap();

getData((ads) => {
  renderAds(ads);
  addFilter(debounce(() => renderAds(ads), 500));
  activateFilter();
  submitForm(() => renderAds(ads));
  resetPage(() => renderAds(ads));
});

