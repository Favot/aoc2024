export type ParseFileReturn = {
  firstList: number[];
  secondList: number[];
};

export async function parseFileInputFile(
  fileName: string
): Promise<ParseFileReturn> {
  const decoder = new TextDecoder();
  try {
    const u8arr = new Uint8Array(await Deno.readFile(fileName));
    const decodedData = decoder.decode(u8arr).split("\n");

    return decodedData.reduce<ParseFileReturn>(
      (acc, line) => {
        const [firstNumber, secondeNumber] = line.split(/\s+/).map(Number);
        if (!isNaN(firstNumber)) acc.firstList.push(firstNumber);
        if (!isNaN(secondeNumber)) acc.secondList.push(secondeNumber);
        return acc;
      },
      { firstList: [], secondList: [] }
    );
  } catch (error) {
    console.error("Error reading file:", error);
    throw error;
  }
}

export function pariaingListPartOne(
  firstList: number[],
  secondList: number[]
): number {
  const sortedSecondList = secondList.sort((a, b) => a - b);

  return firstList
    .sort((a, b) => a - b)
    .reduce((acc, curr, index) => {
      return (acc += Math.abs(curr - sortedSecondList[index]));
    }, 0);
}

export type DictionaryType = {
  [key: number]: number;
};

export const createSecondeListDictionnary = (
  list: number[]
): DictionaryType => {
  return list.reduce<DictionaryType>((acc, number) => {
    acc[number] = (acc[number] || 0) + number;
    return acc;
  }, {});
};

export function pariaingListPartTwo(
  firstList: number[],
  secondList: number[]
): number {
  const secondeNumberListDisctionnary =
    createSecondeListDictionnary(secondList);

  return firstList.reduce((acc, number) => {
    return acc + (secondeNumberListDisctionnary[number] || 0);
  }, 0);
}

if (import.meta.main) {
  const { firstList, secondList } = await parseFileInputFile("input.txt");

  console.log("Result part one:", pariaingListPartOne(firstList, secondList));

  console.log("Result part two:", pariaingListPartTwo(firstList, secondList));
}
