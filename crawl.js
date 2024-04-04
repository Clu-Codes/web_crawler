const { JSDOM } = require("jsdom");

const normalizeURL = (urlString) => {
  const urlObj = new URL(urlString);
  let fullPath = `${urlObj.hostname}${urlObj.pathname}`;
  if (fullPath.length > 0 && fullPath.slice(-1) === "/") {
    fullPath = fullPath.slice(0, -1);
  }
  return fullPath;
};

const getURLFROMHTML = (htmlbody, baseURL) => {
  const dom = new JSDOM(htmlbody);
  const linkElements = dom.window.document.querySelectorAll("a");
  const arrayLinks = Array.from(linkElements);

  const abArrayLinks = [];

  arrayLinks.forEach((link) => {
    if (link.href.slice(0, 1) === "/") {
      abArrayLinks.push(baseURL + link.href);
    } else {
      abArrayLinks.push(link.href);
    }
  });

  console.log("end of func:", abArrayLinks);
  return abArrayLinks;
};

module.exports = {
  normalizeURL,
  getURLFROMHTML,
};
