import { pageDisabled, clickOnReset } from './form.js';
import { loadMap } from './map.js';
import { renderAds, activateFilter } from './filter.js';
import { getData } from './data.js';

pageDisabled();
loadMap();

getData((ads) => {
  renderAds(ads);
  activateFilter();
  clickOnReset(() => renderAds(ads));
});

