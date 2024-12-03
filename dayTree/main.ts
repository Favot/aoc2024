type ParseFileReturn = number;

export const parseFile = async (fileName: string): Promise<ParseFileReturn> => {
  const decoder = new TextDecoder();
  try {
    const mulRegex = /mul\((\d{1,3}\,\d{1,3})\)/g;

    const u8arr = new Uint8Array(await Deno.readFile(fileName));
    const decodedData = decoder.decode(u8arr).match(mulRegex);

    if (!decodedData) {
      throw new Error("No data found in the current file:");
    }

    return decodedData.reduce<ParseFileReturn>((acc, data) => {
      const numberRegex = /(\d{1,3})/g;

      const test = data.match(numberRegex);

      if (!test) {
        throw new Error("No data found in the current file:");
      }

      return acc + parseInt(test[0]) * parseInt(test[1]);
    }, 0);
  } catch (error) {
    console.error("Error reading file:", error);
    throw error;
  }
};

export const parseFileSecondPart = async (
  fileName: string
): Promise<ParseFileReturn> => {
  const decoder = new TextDecoder();
  try {
    const mulRegex =
      /(?<command>(don't|do)|(?<operation>mul\((?<first>\d+),(?<second>\d+)\)))/g;

    const u8arr = new Uint8Array(await Deno.readFile(fileName));
    const text = decoder.decode(u8arr);
    const decodedData = text.match(mulRegex);

    if (!decodedData) {
      throw new Error("No data found in the current file:");
    }

    let flag = true;

    return decodedData.reduce<ParseFileReturn>((acc, currentData) => {
      if (currentData === "don't") {
        flag = false;
        return acc;
      }

      if (currentData === "do") {
        flag = true;
        return acc;
      }

      if (flag) {
        const numberRegex = /(\d{1,3})/g;
        const test = currentData.match(numberRegex);

        if (!test) {
          throw new Error("No data found in the current file:");
        }

        acc = acc + parseInt(test[0]) * parseInt(test[1]);
      }

      return acc;
    }, 0);
  } catch (error) {
    console.error("Error reading file:", error);
    throw error;
  }
};

if (import.meta.main) {
  const resultPartOne = await parseFile("input.txt");

  console.log("Result part One: ", resultPartOne);

  const resultPartTwo = await parseFileSecondPart("input.txt");

  console.log("Result part Two:", resultPartTwo);
}
