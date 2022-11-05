import {
  pristine
} from './form.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const ERROR__MESSAGE = 'Значение полей может быть только изображение![jpg или png]';

const avatarInput = document.querySelector('.ad-form__field');
const avatarChooser = avatarInput.querySelector('#avatar');
const avatarPreview = document.querySelector('.ad-form-header__preview');

const photoInput = document.querySelector('.ad-form__upload');
const photoChooser = photoInput.querySelector('#images');
const photoPreview = document.querySelector('.ad-form__photo');
const imgAvatar = avatarPreview.querySelector('img');

// Добавляет в разметку аватар
const createLinkAvatar = (link) => {
  imgAvatar.src = link;
};

// Добавляет в разметку фото
const createElementPhoto = (link) => {
  const img = document.createElement('img');
  photoPreview.appendChild(img);
  img.alt = 'Фото жилья';
  img.width = 70;
  img.height = 70;
  img.src = link;
};

// Загружает картинки и выводит превью
const getPicture = (chooser, cb) => {
  chooser.addEventListener('change', () => {
    const file = chooser.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (matches) {
      const linkImg = URL.createObjectURL(file);
      cb(linkImg);
    } else {
      pristine.addError(chooser, ERROR__MESSAGE);
    }
  });
};

const addAvatar = () => getPicture(avatarChooser, createLinkAvatar);
const addPhoto = () => getPicture(photoChooser, createElementPhoto);

export {
  addAvatar,
  addPhoto,
  photoPreview,
  imgAvatar
};
