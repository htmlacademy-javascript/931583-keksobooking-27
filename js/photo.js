const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const avatarInput = document.querySelector('.ad-form__field');
const avatarChooser = avatarInput.querySelector('#avatar');
const avatarPreview = document.querySelector('.ad-form-header__preview');

const photoInput = document.querySelector('.ad-form__upload');
const photoChooser = photoInput.querySelector('#images');
const photoPreview = document.querySelector('.ad-form__photo');

// Добавляет в разметку аватар
const addAvatar = (link) => {
  const img = avatarPreview.querySelector('img').cloneNode(true);
  avatarPreview.innerHTML = '';
  avatarPreview.appendChild(img);
  img.src = link;
};

// Добавляет в разметку фото
const addPhoto = (link) => {
  const img = document.createElement('img');
  photoPreview.appendChild(img);
  img.alt = 'Фото жилья';
  img.width = 70;
  img.height = 70;
  img.src = link;
};

// Загружает картинки и выводит превью
const unploadPicture = (chooser, cb) => {
  chooser.addEventListener('change', () => {
    const file = chooser.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      const addLink = URL.createObjectURL(file);
      cb(addLink);
    }
  });
};

const getAvatar = () => unploadPicture(avatarChooser,addAvatar);
const getPhoto = () => unploadPicture(photoChooser,addPhoto);

export {getAvatar, getPhoto};
