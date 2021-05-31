function getRandomFloat (min, max, precision) {
  if (max <= min || max < 0 || min < 0) {
    return null;
  }
  const result = (Math.random() * (max - min + 0.1)) + min;
  return result.toFixed(precision);
}

function getRandomInteger (min, max) {
  return getRandomFloat(min, max, 0);
}

getRandomFloat(1.2, 4.2, 2);
getRandomInteger(1, 15);
