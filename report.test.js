const { test, expect } = require("@jest/globals");
const { sortPages } = require("./report.js");

test("Sort Pages", () => {
  const unsortedObj = {
    a: 5,
    b: 3,
    c: 15,
    d: 2,
  };
  const sortedArr = [
    ["c", 15],
    ["a", 5],
    ["b", 3],
    ["d", 2],
  ];
  expect(sortPages(unsortedObj)).toEqual(sortedArr);
});
