const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
const mapCanvas = document.querySelector('.map__canvas');
const popupFragment = document.createDocumentFragment();

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

const getPopupFeatures = (popuptItem, advert) => {
  const popupFeaturesBlock = popuptItem.querySelector('.popup__features');
  const popupFeatures = popupFeaturesBlock.children;
  const advertFeatures = advert.offer.features;
  for (let i = 0; i < popupFeatures.length; i++) {
    popupFeatures[i].classList.add('hidden');
    for (let j = 0; j < advertFeatures.length; j++) {
      if (popupFeatures[i].classList.contains(`popup__feature--${advertFeatures[j]}`)) {
        popupFeatures[i].classList.remove('hidden');
      }
      else if (advertFeatures.length === 0) {
        popupFeaturesBlock.classList.add('hidden');
      }
    }
  }
};

const getPopupPhotos  = (popuptItem, advert) => {
  const popupPhotosBlock = popuptItem.querySelector('.popup__photos');
  const popupPhoto = popupPhotosBlock.querySelector('.popup__photo');
  const advertPhotos = advert.offer.photos;
  if (advertPhotos.length === 0) {
    popupPhotosBlock.classList.add('hidden');
  } else {
    popupPhoto.src = advertPhotos[0];
    for (let i = 1; i < advertPhotos.length; i++) {
      const newPhoto = popupPhoto.cloneNode(false);
      newPhoto.src = advertPhotos[i];
      popupPhotosBlock.appendChild(newPhoto);
    }
  }
};

const createPopup = (advert) => {
  const popuptItem = cardTemplate.cloneNode(true);
  popuptItem.querySelector('.popup__title').textContent = advert.offer.title;
  popuptItem.querySelector('.popup__text--address').textContent = advert.offer.address;
  popuptItem.querySelector('.popup__text--price').textContent = `${advert.offer.price}₽/ночь`;
  popuptItem.querySelector('.popup__type').textContent = getPopupTypeName(advert.offer.type);
  popuptItem.querySelector('.popup__text--capacity').textContent = `${advert.offer.rooms} комнаты для ${advert.offer.guests}`;
  popuptItem.querySelector('.popup__text--time').textContent = `Заезд после ${advert.offer.checkin}, выезд до ${advert.offer.checkout}`;
  getPopupFeatures(popuptItem, advert);
  popuptItem.querySelector('.popup__description').textContent = advert.offer.description;
  getPopupPhotos(popuptItem, advert);
  popuptItem.querySelector('.popup__avatar').src = advert.author.avatar;

  popupFragment.appendChild(popuptItem);
  return popupFragment;
};

export {createPopup};
export {mapCanvas};

