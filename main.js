const { normalizeURL, getURLFROMHTML } = require("./crawl.js");

normalizeURL("https://www.blog.boot.dev/path/");
getURLFROMHTML(
  ` 
<html>
    <body>
        <a href="/page1">Page 1</a>
        <a href="/page2">Page 2</a>
    </body>
</html>
`,
  "https://www.example.com"
);
