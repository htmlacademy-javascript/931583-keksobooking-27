// Основа функций взята с MDN

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  if (min < 0 || max < 0 || typeof min !== 'number' || typeof max !== 'number' || max < min) {
    return NaN;
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomInt(min, max, numberSigns) {
  if (min < 0 || max < 0 || numberSigns < 0 || numberSigns % 1 !== 0 || typeof min !== 'number' || typeof max !== 'number' || typeof numberSigns !== 'number' || max < min) {
    return NaN;
  }

  return Number((Math.random() * (max - min + 1) + min).toFixed(numberSigns));
}

getRandomInt();
getRandomIntInclusive();
