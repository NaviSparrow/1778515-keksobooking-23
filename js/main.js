function getRandomNumber (min, max) {
  if (max <= min || max < 0 || min < 0) {
    return null;
  }
  return Math.floor((Math.random() * (max - min + 1)) + min);
}
getRandomNumber(3, 20);

function getRandomFloat (min, max, intAfterDot) {
  if (max <= min || max < 0 || min < 0) {
    return null;
  }
  let result = (Math.random() * (max - min + 0.1)) + min;
  if (result > max) {
    result = max;
  }
  return result.toFixed(intAfterDot);
}
getRandomFloat(1.2, 2.6, 2);
