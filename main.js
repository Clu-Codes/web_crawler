const { argv } = require("node:process");
const { normalizeURL, getURLFROMHTML, crawlPage } = require("./crawl.js");

const main = () => {
  if (argv.length > 3 || argv.lenth < 3) {
    console.log("Invalid number of arguments submitted.");
  }

  const baseURL = argv[2];
  if (argv.length === 3) {
    console.log(`web crawler booting up. Starting crawl of... ${baseURL}`);
  }

  crawlPage(baseURL);
};

main();
