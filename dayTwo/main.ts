export type ParseFileReturn = number[][];

export async function parseInputFile(
  fileName: string
): Promise<ParseFileReturn> {
  const decoder = new TextDecoder();
  try {
    const u8arr = new Uint8Array(await Deno.readFile(fileName));
    const decodedData = decoder.decode(u8arr).split("\n");

    return decodedData.reduce<ParseFileReturn>((acc, line) => {
      acc.push(line.split(" ").map((number) => parseInt(number)));

      return acc;
    }, []);
  } catch (error) {
    console.error("Error reading file:", error);
    throw error;
  }
}

export const getTroubleIndex = (line: number[]) => {
  for (let index = 1; index < line.length - 1; index++) {
    const level = line[index];
    const nextLevel = line[index + 1];
    const prevLevel = line[index - 1];

    if (
      (nextLevel >= level && prevLevel >= level) ||
      (nextLevel <= level && prevLevel <= level) ||
      Math.abs(nextLevel - level) > 3 ||
      Math.abs(prevLevel - level) > 3
    ) {
      return index;
    }
  }

  return null;
};

export const getNumberOfSafeLine = (
  lines: number[][]
): {
  safeLine: number;
  madeSafeLine: number;
} => {
  let safeLine = 0;
  let madeSafeLine = 0;

  lines.forEach((line) => {
    const troubleIndex = getTroubleIndex(line);

    if (troubleIndex) {
      const safeCount = [
        line.slice(0, troubleIndex).concat(line.slice(troubleIndex + 1)),
        line.slice(0, troubleIndex + 1).concat(line.slice(troubleIndex + 2)),
        line.slice(0, troubleIndex - 1).concat(line.slice(troubleIndex)),
      ].filter((l) => !getTroubleIndex(l)).length;

      if (safeCount > 0) {
        madeSafeLine++;
      }
    } else {
      safeLine++;
    }
  });

  return { safeLine, madeSafeLine };
};

if (import.meta.main) {
  const { safeLine: safeLinePartOne } = getNumberOfSafeLine(
    await parseInputFile("inputFile.txt")
  );

  console.log("Result part one:", safeLinePartOne);

  const { safeLine: safeLienPartTwo, madeSafeLine } = getNumberOfSafeLine(
    await parseInputFile("inputFile.txt")
  );

  console.log("Result part Two:", safeLienPartTwo + madeSafeLine);
}
