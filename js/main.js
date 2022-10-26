import {pageDisabled} from './form.js';
import {bookingAds, loadMap} from './map.js';
import {getData} from './data.js';

pageDisabled();
loadMap();
getData((ads) => bookingAds(ads));

