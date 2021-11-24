export const padRight = (str, length, pad) => {
  if (str.length >= length) {
    return str;
  }
  return str + pad.repeat(length - str.length);
};
