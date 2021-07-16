const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

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
  const popupItem = cardTemplate.cloneNode(true);
  popupItem.querySelector('.popup__title').textContent = advert.offer.title;
  popupItem.querySelector('.popup__text--address').textContent = advert.offer.address;
  popupItem.querySelector('.popup__text--price').textContent = `${advert.offer.price}₽/ночь`;
  popupItem.querySelector('.popup__type').textContent = getPopupTypeName(advert.offer.type);
  popupItem.querySelector('.popup__text--capacity').textContent = `${advert.offer.rooms} комнаты для ${advert.offer.guests}`;
  popupItem.querySelector('.popup__text--time').textContent = `Заезд после ${advert.offer.checkin}, выезд до ${advert.offer.checkout}`;
  updateFeatures(popupItem, advert.offer.features);
  popupItem.querySelector('.popup__description').textContent = advert.offer.description;
  updatePhotos(popupItem, advert.offer.photos);
  popupItem.querySelector('.popup__avatar').src = advert.author.avatar;
  return popupItem;
};

export {showPopup};
