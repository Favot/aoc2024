import { assertEquals } from "@std/assert";
import {
  getNumberOfSafeLinePartTwo,
  getTroubleIndex,
  parseInputFile,
} from "./main.ts";

Deno.test("should correctly parse the input file", async () => {
  const expectedResult = [
    [35, 37, 38, 41, 43, 41],
    [64, 66, 69, 71, 72, 72],
    [45, 47, 50, 51, 52, 53, 55, 59],
    [16, 18, 19, 20, 23, 29],
    [36, 39, 41, 43, 44, 41, 44],
  ];

  const result = await parseInputFile("inputTestFile.txt");

  assertEquals(result, expectedResult);
});

Deno.test(
  "should return the index when adjacent values differ by more than 3",
  () => {
    const input: number[] = [1, 4, 9];

    const troubleIndex = getTroubleIndex(input);

    assertEquals(troubleIndex, 1);
  }
);

Deno.test("should return the index when adjacent values are equal", () => {
  const input: number[] = [1, 1, 1];

  const troubleIndex = getTroubleIndex(input);

  assertEquals(troubleIndex, 1);
});

Deno.test("should return the index for a line with a peak", () => {
  const input: number[] = [1, 2, 1];

  const troubleIndex = getTroubleIndex(input);

  assertEquals(troubleIndex, 1);
});

Deno.test("should return the index for a line with a valley", () => {
  const input: number[] = [2, 1, 3];

  const troubleIndex = getTroubleIndex(input);

  assertEquals(troubleIndex, 1);
});

Deno.test("should return the index when the gap is supperior a 3", () => {
  const input: number[] = [1, 2, 7, 8, 9];

  const troubleIndex = getTroubleIndex(input);

  assertEquals(troubleIndex, 1);
});

Deno.test("should return the total count of safe lines when evaluated", () => {
  const input = [
    [7, 6, 4, 2, 1],
    [1, 2, 7, 8, 9],
    [9, 7, 6, 2, 1],
    [1, 3, 2, 4, 5],
    [1, 6, 5, 4, 1],
    [1, 3, 6, 7, 9],
  ];

  const { safeLine, madeSafeLine } = getNumberOfSafeLinePartTwo(input);

  assertEquals(safeLine + madeSafeLine, 4);
});
