const getRandomInt = require("./getRandomInt").default;

test("pass 1 and 1 to the function and receive 1", () => {
  expect(getRandomInt(1, 1)).toEqual(1);
});
