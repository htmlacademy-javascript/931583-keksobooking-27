const successPopup = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
const errorPopup = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
const errorButton = errorPopup.querySelector('.error__button');

const showSuccessPopup = () => {
  document.body.appendChild(successPopup);

  const handleEscPress = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      successPopup.remove();
      document.removeEventListener('keydown', handleEscPress);
    }
  };

  document.addEventListener('keydown', handleEscPress);
  successPopup.addEventListener('click', () => {
    successPopup.remove();
    document.removeEventListener('keydown', handleEscPress);
  }, {once: true});
};

const showErrorPopup = () => {
  document.body.appendChild(errorPopup);

  const handleEscPress = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      errorPopup.remove();
      document.removeEventListener('keydown', handleEscPress);
    }
  };

  document.addEventListener('keydown', handleEscPress);
  errorPopup.addEventListener('click', () => {
    errorPopup.remove();
    document.removeEventListener('keydown', handleEscPress);
  }, {once: true});
  errorButton.addEventListener('mousedown', () => {
    errorPopup.remove();
    document.removeEventListener('keydown', handleEscPress);
  }, {once: true});
};

export {showSuccessPopup, showErrorPopup};
