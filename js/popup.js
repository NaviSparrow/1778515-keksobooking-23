import {createAdvert} from './data.js';

const cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const similarAdverts = new Array(10).fill(null).map(() => createAdvert());

similarAdverts.forEach((advert) => {
  const advertItem = cardTemplate.cloneNode(true);
  advertItem.querySelector('.popup__title').textContent = advert.offer.title;
  advertItem.querySelector('.popup__text--address').textContent = advert.offer.address;
  advertItem.querySelector('.popup__text--price').textContent = `${advert.offer.price}₽/ночь`;

  const advertType = advert.offer.type;
  const popupType = advertItem.querySelector('.popup__type');
  switch (advertType) {
    case 'flat':
      popupType.textContent = 'Квартира';
      break;
    case 'bungalow':
      popupType.textContent = 'Бунгало';
      break;
    case 'house':
      popupType.textContent = 'Дом';
      break;
    case 'palace':
      popupType.textContent = 'Дворец';
      break;
    case 'hotel':
      popupType.textContent = 'Отель';
      break;
  }

  advertItem.querySelector('.popup__text--capacity').textContent = `${advert.offer.rooms} комнаты для ${advert.offer.guests}`;
  advertItem.querySelector('.popup__text--time').textContent = `Заезд после ${advert.offer.checkin}, выезд до ${advert.offer.checkout}`;

  const popupFeatures = advertItem.querySelector('.popup__features').children; //получаю элементы списка из разметки
  const advertFeatures = advert.offer.features; //получаю фичи из объекта объявления
  for (let i = 0; i < popupFeatures.length; i++) {
    for (let j = 0; j < advertFeatures.length; j++) {
      if (popupFeatures[i].classList.contains(`popup__feature--${advertFeatures[j]}`)) {
        popupFeatures[i].classList.add('hidden'); //в таком виде правильно определяет совпадения и добавляет класс
      }
    }
  }
  console.log(advertFeatures);
  console.log(popupFeatures);

  advertItem.querySelector('.popup__description').textContent = advert.offer.description;
  advertItem.querySelector('.popup__avatar').textContent = advert.author.avatar;
  const pic = advertItem.querySelector('.popup__photos').children;
  pic.src = advert.offer.photos;
});

