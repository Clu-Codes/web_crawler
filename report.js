const printReport = (pages) => {
  console.log(`Report is starting...`);
  const sortedUrls = sortPages(pages);
  for (const [page, count] of sortedUrls) {
    console.log(`Found ${count} internal links of ${page}`);
  }
};

const sortPages = (pages) => {
  //   const sorted = Object.fromEntries(
  //     Object.entries(pages).sort(([, a], [, b]) => b - a)
  //   );
  const sorted = Object.entries(pages).sort((a, b) => b[1] - a[1]);
  console.log(sorted);
  return sorted;
};

module.exports = {
  printReport,
  sortPages,
};
