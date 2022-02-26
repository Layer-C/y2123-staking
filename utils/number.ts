const pad = (num: string | number | undefined, size = 2, factionDigits?: number) => {
  if (num == null) {
    return '';
  }
  let _num = num.toString();

  while (_num.length < size) _num = '0' + _num;

  if (factionDigits != null) {
    _num = _num + '.' + Number(num).toFixed(factionDigits).split('.')[1];
  }

  return _num;
};

export const NumberUtils = {
  pad,
};
