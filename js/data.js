import {getRandomFloat, getRandomInteger, getRandomArrayElement, getRandomArray} from './utils.js';

const OFFER_TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const CHECKINS = [
  '12:00',
  '13:00',
  '14:00',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const createAdvert = () => ({
  author: {
    avatar: `img/avatars/user0${getRandomInteger(1,8)}.png`,
  },
  offer: {
    title: 'Do you need a room?',
    address: `${location.x}, ${location.y}`,
    price: getRandomInteger(1, 5000),
    type: getRandomArrayElement(OFFER_TYPES),
    rooms: getRandomInteger(0, 5),
    guests: getRandomInteger(0, 5),
    checkin: getRandomArrayElement(CHECKINS),
    checkout: getRandomArrayElement(CHECKINS),
    features: getRandomArray(FEATURES),
    description: 'Сдаётся комната в центре Токио, все удобства',
    photos: getRandomArray(PHOTOS),
  },
  location: {
    lat: getRandomFloat(35.65000, 35.70000, 5),
    lng: getRandomFloat(139.70000, 139.80000, 5),
  },
});

export {createAdvert};
