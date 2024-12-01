import { assertEquals } from "@std/assert";
import {
  createSecondeListDictionnary,
  DictionaryType,
  pariaingListPartOne,
  pariaingListPartTwo,
  parseFileInputFile,
  ParseFileReturn,
} from "./main.ts";

Deno.test("pariaing list part one", () => {
  const firstList = [3, 4, 2, 1, 3, 3];

  const secondList = [4, 3, 5, 3, 9, 3];

  const expectResult = 11;

  const result = pariaingListPartOne(firstList, secondList);

  assertEquals(result, expectResult);
});

Deno.test("pairing list part two", () => {
  const firstList = [3, 4, 2, 1, 3, 3];

  const secondList = [4, 3, 5, 3, 9, 3];

  const expectResult = 31;

  const result = pariaingListPartTwo(firstList, secondList);

  assertEquals(expectResult, result);
});

Deno.test("createSecondeListDictionnary", () => {
  const input = [4, 3, 5, 3, 9, 3];

  const expectResult: DictionaryType = {
    3: 9,
    4: 4,
    5: 5,
    9: 9,
  };

  const result = createSecondeListDictionnary(input);

  assertEquals(expectResult, result);
});

Deno.test("parse file", async () => {
  const expectResult: ParseFileReturn = {
    firstList: [38665, 84587, 93374],
    secondList: [13337, 21418, 50722],
  };
  const result = await parseFileInputFile("testInput.txt");

  assertEquals(result, expectResult);
});
