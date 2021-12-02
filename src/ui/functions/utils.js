export const padRight = (str, length, pad) => {
  if (str.length >= length) {
    return str;
  }
  return str + pad.repeat(length - str.length);
};

export const padLeft = (str, length, pad) => {
  str = `${str}`;
  if (str.length >= length) {
    return str;
  }
  return pad.repeat(length - str.length) + str;
};
