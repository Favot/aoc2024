export type PartseFileReturn = {
  firstList: number[];
  secondList: number[];
};

export async function parseFileInputFile(
  fileName: string
): Promise<PartseFileReturn> {
  const decoder = new TextDecoder();
  const u8arr = new Uint8Array(await Deno.readFile(fileName));
  const decodedData = decoder.decode(u8arr).split("\n");

  return decodedData.reduce<PartseFileReturn>(
    (acc, line) => {
      const [firstNumber, secondeNumber] = line.split(/\s+/).map(Number);
      if (!isNaN(firstNumber)) acc.firstList.push(firstNumber);
      if (!isNaN(secondeNumber)) acc.secondList.push(secondeNumber);
      return acc;
    },
    { firstList: [], secondList: [] }
  );
}

export function pariaingListPartOne(
  firstList: number[],
  secondList: number[]
): number {
  const sortedFirstList = firstList.sort((a, b) => a - b);
  const sortedSecondList = secondList.sort((a, b) => a - b);

  return sortedFirstList.reduce((acc, curr, index) => {
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
    number in acc
      ? (acc[number] = acc[number] + number)
      : (acc[number] = number);
    return acc;
  }, {});
};

export function pariaingListPartTwo(
  firstList: number[],
  secondList: number[]
): number {
  let result = 0;

  const secondeNumberListDisctionnary =
    createSecondeListDictionnary(secondList);

  firstList.map((number) => {
    if (number in secondeNumberListDisctionnary) {
      result += secondeNumberListDisctionnary[number];
    }
  });

  return result;
}

if (import.meta.main) {
  const { firstList, secondList } = await parseFileInputFile("input.txt");

  console.log("Result part one:", pariaingListPartOne(firstList, secondList));

  console.log("Result part two:", pariaingListPartTwo(firstList, secondList));
}
