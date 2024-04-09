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
  //   const cleanBaseURL = normalizeURL(baseURL);
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
  const filteredArr = abArrayLinks.filter((urls) => urls.includes(baseURL));
  return filteredArr;
};

async function crawlPage(baseURL, currentURL = baseURL, pages = {}) {
  const baseURLLength = baseURL.length;
  if (baseURL === currentURL.slice(0, baseURLLength)) {
    const cleanURL = normalizeURL(currentURL);
    if (pages[cleanURL]) {
      pages[cleanURL] += 1;
      return pages;
    } else {
      pages[cleanURL] = 1;
    }
  } else if (currentURL.slice(0) === "/") {
    const cleanBase = normalizeURL(baseURL);
    const cleanURL = normalizeURL(`${cleanBase}${currentURL}`);
    if (pages[cleanURL]) {
      pages[cleanURL] += 1;
      return pages;
    } else {
      pages[cleanURL] = 1;
    }
  }
  try {
    console.log(`crawling: ${currentURL}...`);
    const resp = await fetch(currentURL);
    if (resp.status > 399) {
      console.log(`HTTP error status code: ${resp.status}`);
      return;
    }
    const contentType = resp.headers.get("content-type");
    if (!contentType.includes("text/html")) {
      console.log(`Got non-html response: ${contentType}`);
      return;
    }
    const respHTML = await resp.text();
    const pageURLs = getURLFROMHTML(respHTML, baseURL);
    await Promise.all(pageURLs.map((link) => crawlPage(baseURL, link, pages)));
    return pages;
  } catch (e) {
    console.log(e.message);
  }
}

module.exports = {
  normalizeURL,
  getURLFROMHTML,
  crawlPage,
};
