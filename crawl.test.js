const { test, expect } = require("@jest/globals");
const { normalizeURL, getURLFROMHTML } = require("./crawl.js");

test("URL normalizer", () => {
  const url1 = "http://blog.boot.dev/path/";
  const url2 = "https://blog.boot.dev/path/";
  const url3 = "http://blog.boot.dev/path";
  expect(normalizeURL(url1)).toEqual("blog.boot.dev/path");
  expect(normalizeURL(url2)).toEqual("blog.boot.dev/path");
  expect(normalizeURL(url3)).toEqual("blog.boot.dev/path");
});

test("HTML URL Extractor", () => {
  const html = ` 
    <html>
        <body>
            <a href="/page1">Page 1</a>
            <a href="/page2">Page 2</a>
        </body>
    </html>
    `;
  const baseURL = "https://www.example.com";
  expect(getURLFROMHTML(html, baseURL)).toEqual([
    "https://www.example.com/page1",
    "https://www.example.com/page2",
  ]);
});
