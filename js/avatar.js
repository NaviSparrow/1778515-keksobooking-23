const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const IMAGE_WIDTH = 70;
const IMAGE_HEIGHT = 70;
const avatarPhoto = document.querySelector('.ad-form__field input[type=file]');
const avatarPreview = document.querySelector('.ad-form-header__preview img');

const housePhoto = document.querySelector('.ad-form__upload input[type=file]');
const housePreview = document.querySelector('.ad-form__photo');

const photoChangeListener = (photo, previewImage) => {
  const file = photo.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((end) => fileName.endsWith(end));
  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      previewImage.src = reader.result;
    });
    reader.readAsDataURL(file);
  }
};

const createImage = () => {
  const image = document.createElement('img');
  image.src = '';
  image.width = IMAGE_WIDTH;
  image.height = IMAGE_HEIGHT;
  image.alt = 'Фото жилья';
  housePreview.appendChild(image);
};

const avatarChangeHandler = () => {
  photoChangeListener(avatarPhoto, avatarPreview);
};

const housePhotoChangeHandler = () => {
  createImage();
  photoChangeListener(housePhoto, housePreview.lastChild);
};

avatarPhoto.addEventListener('change', avatarChangeHandler);
housePhoto.addEventListener('change', housePhotoChangeHandler);
