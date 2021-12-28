// https://stackoverflow.com/questions/5598743/finding-elements-position-relative-to-the-document
const getCoords = (elem: Element) => {
  const box = elem.getBoundingClientRect();

  const body = document.body;
  const docEl = document.documentElement;

  const scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
  const scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

  const clientTop = docEl.clientTop || body.clientTop || 0;
  const clientLeft = docEl.clientLeft || body.clientLeft || 0;

  const top = box.top + scrollTop - clientTop;
  const left = box.left + scrollLeft - clientLeft;

  return {
    x: Math.round(left),
    y: Math.round(top),
    centerX: left + Math.round(box.width / 2),
    centerY: top + Math.round(box.height / 2),
    width: box.width,
    height: box.height,
  };
};

const download = (uri: string, name: string) => {
  const link = document.createElement('a');
  // If you don't know the name or want to use
  // the webserver default set name = ''
  link.setAttribute('download', name);
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  link.remove();
};

export const DomUtils = { getCoords, download };
