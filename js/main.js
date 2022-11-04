import {
  pageDisabled,
  clickOnReset,
  clickOnSubmit
} from './form.js';

import {
  loadMap
} from './map.js';

import {
  renderAds,
  activateFilter,
  changeFilter } from './filter.js';

import {
  getData
} from './data.js';

import {
  debounce
} from './util.js';

pageDisabled();
loadMap();

getData((ads) => {
  renderAds(ads);
  changeFilter(debounce(() => renderAds(ads), 500));
  activateFilter();
  clickOnSubmit(() => renderAds(ads));
  clickOnReset(() => renderAds(ads));
});

