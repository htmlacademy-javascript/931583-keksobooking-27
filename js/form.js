const formAd = document.querySelector('.ad-form');
const formAdChildren = formAd.children;
const filterMap = document.querySelector('.map__filters');
const filterMapChildren = filterMap.children;

// Неактивное состояние формы и фильтра при отключенной карте
const pageDisabled = () => {
  formAd.classList.add('ad-form--disabled');
  for (const child of formAdChildren) {
    child.setAttribute('disabled', 'disabled');
  }

  filterMap.classList.add('.map__filters--disabled');
  for (const child of filterMapChildren) {
    child.setAttribute('disabled', 'disabled');
  }
};

// Активное состояние формы и фильтра при включенной карте
const pageActive = () => {
  formAd.classList.remove('ad-form--disabled');
  for (const child of formAdChildren) {
    child.removeAttribute('disabled', 'disabled');
  }

  filterMap.classList.remove('.map__filters--disabled');
  for (const child of filterMapChildren) {
    child.removeAttribute('disabled', 'disabled');
  }
};

export {pageDisabled,pageActive};
