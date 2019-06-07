module.exports = (array) => {
  return array.every((value, index) => {
    if (index === 0) {
      return true;
    }

    return value - 1 === array[index - 1];
  });
};
