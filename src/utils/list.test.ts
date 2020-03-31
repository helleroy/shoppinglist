import { moveElementLeft, moveElementRight } from "./list";

describe("list move left", () => {
  test("returns same list if index is 0", () => {
    const list = [1, 2, 3];
    const result = moveElementLeft(list, 0);

    expect(result).toBe(list);
  });

  test("returns same list if index is less than 0", () => {
    const list = [1, 2, 3];
    const result = moveElementLeft(list, -1);

    expect(result).toBe(list);
  });

  test("moves element one space to the left", () => {
    const list = [1, 2, 3];
    const result = moveElementLeft(list, 1);

    expect(result).toEqual([2, 1, 3]);
  });
});

describe("list move right", () => {
  test("returns same list if index is list max", () => {
    const list = [1, 2, 3];
    const result = moveElementRight(list, list.length - 1);

    expect(result).toBe(list);
  });

  test("returns same list if index is larger than list max", () => {
    const list = [1, 2, 3];
    const result = moveElementRight(list, list.length);

    expect(result).toBe(list);
  });

  test("moves element one space to the right", () => {
    const list = [1, 2, 3];
    const result = moveElementRight(list, 1);

    expect(result).toEqual([1, 3, 2]);
  });
});
