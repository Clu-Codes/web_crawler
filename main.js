const { argv } = require("node:process");
const { crawlPage } = require("./crawl.js");
const { printReport } = require("./report.js");

async function main() {
  if (argv.length > 3 || argv.lenth < 3) {
    console.log("Invalid number of arguments submitted.");
  }

  const baseURL = argv[2];
  console.log(`starting crawl of ${baseURL}...`);
  const pages = await crawlPage(baseURL, baseURL, {});

  console.log(pages);

  printReport(pages);
}

main();
