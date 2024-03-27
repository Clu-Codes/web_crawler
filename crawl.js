const normalizeURL = (urlString) => {
  const p1 = "https://";
  const p2 = "http://";
  const p3 = "www.";
  let url = urlString;

  if (url.indexOf(p1.toLowerCase()) !== -1) {
    url = url.slice(p1.length);
  }

  if (url.indexOf(p2.toLowerCase()) !== -1) {
    url = url.slice(p2.length);
  }

  if (url.indexOf(p3.toLowerCase()) !== -1) {
    url = url.slice(p3.length);
  }

  if (url.lastIndexOf("/") === url.length - 1) {
    url = url.slice(0, url.length - 1);
  }
  return url;
};

module.exports = {
  normalizeURL,
};
