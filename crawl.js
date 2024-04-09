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

async function crawlPage(baseURL, currentURL, pages = {}) {
  const currentUrlObj = new URL(currentURL);
  const baseUrlObj = new URL(baseURL);
  if (currentUrlObj.hostname !== baseUrlObj.hostname) {
    return pages;
  }

  const cleanURL = normalizeURL(currentURL);
  if (pages[cleanURL] > 0) {
    pages[cleanURL]++;
    return pages;
  }
  pages[cleanURL] = 1;

  console.log(`crawling: ${currentURL}...`);
  respHTML = "";
  try {
    const resp = await fetch(currentURL);
    if (resp.status > 399) {
      console.log(`HTTP error status code: ${resp.status}`);
      return pages;
    }
    const contentType = resp.headers.get("content-type");
    if (!contentType.includes("text/html")) {
      console.log(`Got non-html response: ${contentType}`);
      return pages;
    }
    respHTML = await resp.text();
  } catch (e) {
    console.log(e.message);
  }
  const pageURLs = getURLFROMHTML(respHTML, baseURL);
  //   for (const pageURL of pageURLs) {
  //     pages = await crawlPage(baseURL, pageURL, pages);
  //   }
  await Promise.all(pageURLs.map((link) => crawlPage(baseURL, link, pages)));
  return pages;
}

module.exports = {
  normalizeURL,
  getURLFROMHTML,
  crawlPage,
};
