const getTimestamp = require("./date.getTimestamp.js").default;

test("receive timestamp without ms", () => {
  expect(getTimestamp()).toEqual(expect.any(Number));
  expect(getTimestamp()).toBeLessThan(9999999999);
});
