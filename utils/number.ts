const pad = (num: string | number | undefined, size = 2) => {
  if (num == null) {
    return '';
  }
  let _num = num.toString();

  while (_num.length < size) _num = '0' + _num;

  return _num;
};

export const NumberUtils = {
  pad,
};
