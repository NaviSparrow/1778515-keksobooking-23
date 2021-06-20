const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
const mapCanvas = document.querySelector('.map__canvas');

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
  if (features.length === 0) {
    popupFeaturesBlock.classList.add('hidden');
  } else {
    for (let i = 0; i < popupFeatures.length; i++) {
      popupFeatures[i].classList.add('hidden');
      for (let j = 0; j < features.length; j++) {
        if (popupFeatures[i].classList.contains(`popup__feature--${features[j]}`)) {
          popupFeatures[i].classList.remove('hidden');
        }
      }
    }
  }
};

const updatePhotos  = (popuptItem, photos) => {
  const popupPhotosBlock = popuptItem.querySelector('.popup__photos');
  const popupPhoto = popupPhotosBlock.querySelector('.popup__photo');
  if (photos.length === 0) {
    popupPhotosBlock.classList.add('hidden');
  } else {
    popupPhoto.src = photos[0];
    for (let i = 1; i < photos.length; i++) {
      const newPhoto = popupPhoto.cloneNode(false);
      newPhoto.src = photos[i];
      popupPhotosBlock.appendChild(newPhoto);
    }
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
  const advertFeatures = advert.offer.features;
  updateFeatures(popuptItem, advertFeatures);
  popuptItem.querySelector('.popup__description').textContent = advert.offer.description;
  const advertPhotos = advert.offer.photos;
  updatePhotos(popuptItem, advertPhotos);
  popuptItem.querySelector('.popup__avatar').src = advert.author.avatar;

  mapCanvas.appendChild(popuptItem);
};

export {showPopup};

