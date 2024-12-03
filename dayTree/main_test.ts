import { assertEquals } from "@std/assert/equals";
import { parseFile, parseFileSecondPart } from "./main.ts";

Deno.test("Parse File", async () => {
  const expectedResult = 161;

  const result = await parseFile("testInput.txt");

  assertEquals(result, expectedResult);
});

Deno.test("Parse File", async () => {
  const expectedResult = 161;

  const result = await parseFileSecondPart("testInput.txt");

  assertEquals(result, expectedResult);
});
