import { isEscEvent, options } from './utils.js';

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
const successMsgTemplate = document.querySelector('#success').content.querySelector('.success');
const errorMsgTemplate = document.querySelector('#error').content.querySelector('.error');

const getPopupTypeName = (type) => {
  switch (type) {
    case 'flat':
      return 'Квартира';
    case 'bungalow':
      return 'Бунгало';
    case 'house':
      return 'Дом';
    case 'palace':
      return 'Дворец';
    case 'hotel':
      return 'Отель';
  }
};

const updateFeatures = (popuptItem, features) => {
  const popupFeaturesBlock = popuptItem.querySelector('.popup__features');
  const popupFeatures = popupFeaturesBlock.children;
  if (!features) {
    return popupFeaturesBlock.classList.add('hidden');
  }
  for (const popupFeature of popupFeatures) {
    popupFeature.classList.add('hidden');
    for (const feature of features) {
      if (popupFeature.classList.contains(`popup__feature--${feature}`)) {
        popupFeature.classList.remove('hidden');
      }
    }
  }
};

const updatePhotos  = (popuptItem, photos) => {
  const popupPhotosBlock = popuptItem.querySelector('.popup__photos');
  const popupPhoto = popupPhotosBlock.querySelector('.popup__photo');
  if (!photos) {
    return popupPhotosBlock.classList.add('hidden');
  }
  popupPhoto.src = photos[0];
  for (let i = 1; i < photos.length; i++) {
    const newPhoto = popupPhoto.cloneNode(false);
    newPhoto.src = photos[i];
    popupPhotosBlock.appendChild(newPhoto);
  }
};

const showPopup = (advert) => {
  const popuptItem = cardTemplate.cloneNode(true);
  popuptItem.querySelector('.popup__title').textContent = advert.offer.title;
  popuptItem.querySelector('.popup__text--address').textContent = advert.offer.address;
  popuptItem.querySelector('.popup__text--price').textContent = `${advert.offer.price}₽/ночь`;
  popuptItem.querySelector('.popup__type').textContent = getPopupTypeName(advert.offer.type);
  popuptItem.querySelector('.popup__text--capacity').textContent = `${advert.offer.rooms} комнаты для ${advert.offer.guests}`;
  popuptItem.querySelector('.popup__text--time').textContent = `Заезд после ${advert.offer.checkin}, выезд до ${advert.offer.checkout}`;
  updateFeatures(popuptItem, advert.offer.features);
  popuptItem.querySelector('.popup__description').textContent = advert.offer.description;
  updatePhotos(popuptItem, advert.offer.photos);
  popuptItem.querySelector('.popup__avatar').src = advert.author.avatar;
  return popuptItem;
};

const hideMessage = () => {
  const successMessage = document.querySelector('.success');
  const errorMessage = document.querySelector('.error');
  if (successMessage) {
    successMessage.remove();
    //resetPage(); здесь, как мне казалось, логично её вызвать
  } else {
    errorMessage.remove();
  }
};

const clickHandler = () => {
  hideMessage();
};

const keydownHandler = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    hideMessage();
  }
};

const showMessage = (message) => {
  document.body.insertAdjacentElement('beforeend', message);
  document.addEventListener('click', clickHandler, options);
  document.addEventListener('keydown', keydownHandler, options);
};

export {
  successMsgTemplate,
  errorMsgTemplate,
  showPopup,
  showMessage
};
