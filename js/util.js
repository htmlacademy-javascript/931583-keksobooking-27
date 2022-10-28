const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  const mapContainer = document.querySelector('.map');
  alertContainer.style.zIndex = '1000';
  alertContainer.style.position = 'absolute';
  alertContainer.style.right = '0';
  alertContainer.style.top = '0';
  alertContainer.style.padding = '16px 16px';
  alertContainer.style.fontSize = '21px';
  alertContainer.style.fontWeight = '700';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  mapContainer.prepend(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, 3000);
};

export {showAlert};
