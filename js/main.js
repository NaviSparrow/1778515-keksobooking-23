const TYPE_LIST = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const CHECK_LIST = [
  '12:00',
  '13:00',
  '14:00',
];

const FEATURES_LIST = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const PHOTOS_LIST = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

function getRandomFloat (min, max, precision) {
  if (max <= min || max < 0 || min < 0) {
    return null;
  }
  const result = (Math.random() * (max - min + 0.1)) + min;
  return Number(result.toFixed(precision));
}

function getRandomInteger (min, max) {
  return getRandomFloat(min, max, 0);
}

function getRandomArrayElement (array) {
  return array[getRandomInteger(0, array.length - 1)];
}

function getRandomArray (array) {
  const randomArray = new Array(getRandomInteger(0, array.length - 1));
  let index = 0;
  while (index <= randomArray.length - 1) {
    const value = array[getRandomInteger(0, array.length - 1)];
    if(!randomArray.includes(value)) {
      randomArray[index] = value;
      index++;
    }
  }
  return randomArray;
}

function createAdvert() {
  return {
    author: {
      avatar: `img/avatars/user/0${getRandomInteger(1,8)}.png`,     //<---- я не понял как сделать так чтоб адреса не повторялись..объектов нужно 10 по заданию,
    },                                                              //а адресов получается только 8 (число нужно рандомить от 1 до 8)
    offer: {
      title: 'Do you need a room?',
      address: `${location.x}, ${location.y}`,
      price: getRandomInteger(1, 5000),
      type: getRandomArrayElement(TYPE_LIST),
      rooms: getRandomInteger(0, 5),
      guests: getRandomInteger(0, 5),
      checkin: getRandomArrayElement(CHECK_LIST),
      checkout: getRandomArrayElement(CHECK_LIST),
      features: getRandomArray(FEATURES_LIST),
      description: 'Сдаётся комната в центре Токио, все удобства',
      photos: getRandomArray(PHOTOS_LIST),
    },
    location: {
      lat: getRandomFloat(35.65000, 35.70000, 5),
      lng: getRandomFloat(139.70000, 139.80000, 5),
    },
  };
}

const similarAdverts = new Array(10).fill(null).map(() => createAdvert());
similarAdverts;
