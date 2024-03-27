const { test, expect } = require("@jest/globals");
const { normalizeURL } = require("./crawl.js");

test("URL normalizer", () => {
  const url1 = "http://blog.boot.dev/path/";
  const url2 = "https://blog.boot.dev/path/";
  const url3 = "http://www.blog.boot.dev/path";
  expect(normalizeURL(url1)).toEqual("blog.boot.dev/path");
  expect(normalizeURL(url2)).toEqual("blog.boot.dev/path");
  expect(normalizeURL(url3)).toEqual("blog.boot.dev/path");
});
