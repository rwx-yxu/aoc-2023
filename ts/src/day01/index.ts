import run from "aocrunner"

const parseInput = (rawInput: string) => rawInput

const part1 = (rawInput: string) => {
  
  const isInt = (char: string): boolean => {
    return Number.isInteger(Number(char));
  }
  
  const calculateSum = (rawInput: string): number => {
    const input = parseInput(rawInput);
    const inputArr: string[] = input.split("\n");
  
    const nums: string[]= inputArr.flatMap((line: string) => {
      const charArr: string[] = [...line];
      const ints: string[] = charArr.filter((c: string) => isInt(c));
  
      if (ints.length === 0) {
        return 'Null';
      }
  
      if (ints.length > 1) {
        return ints[0] + ints[ints.length - 1];
      }
  
      return ints[ints.length - 1] + ints[ints.length - 1];
    });

    const convertedToInts: number[] = nums.map((e: string) => parseInt(e));
  
    const sum: number = convertedToInts.reduce((partialSum: number, a: number) => partialSum + a, 0);
  
    return sum;
  }
  return calculateSum(rawInput)
}

const part2 = (rawInput: string): number => {
  const input: string = parseInput(rawInput);
  const numWords: string[] = ['one','two','three','four','five','six','seven','eight','nine'];
  const numVal: string[] = ['1','2','3','4','5','6','7','8','9'];
  const isInt = (char: any): boolean => Number.isInteger(char);
  const position = (line: string, word: string): number => line.indexOf(word);
  const inputArr: string[] = input.split("\n");
  
  const nums: string[] = inputArr.flatMap((line: string): string  => {
    let orderIndx: number[] = [];
    let positionIndx: number[] = [];
    let cpyLine: string = line;
    
    numWords.forEach((e: string, indx: number): void => {
      const occurance: number = line.split(e).length - 1;
      
      if (occurance > 0) {
        for (let i = 0; i < occurance; i++) {
          orderIndx.push(indx);
          positionIndx.push(position(cpyLine, e));
  
          if (occurance > 1) {
            const lineChar: string[] = [...cpyLine];
            lineChar[positionIndx[positionIndx.length - 1] + 1] = "&";
            cpyLine = lineChar.join('');
          }
        }
      }
    });
    
    let combined: { element: number, mapped: number }[] = positionIndx.map((element, index) => ({ element, mapped: orderIndx[index] }));
    combined.sort((a, b) => a.element - b.element);
  
    positionIndx = combined.map(pair => pair.element);
    orderIndx = combined.map(pair => pair.mapped);
  
    orderIndx.forEach((e, i) => {
      const lineChar: string[] = [...line];
      lineChar[positionIndx[i]] = numVal[e];
      line = lineChar.join('');
    });
    
    const charArr: string[] = [...line];
    const ints: string[] = charArr.filter((c) => isInt(Number(c)));
    
    if (ints.length == 0) {
      return 'Null';
    }
    
    if (ints.length > 1) {
      return ints[0] + ints[ints.length - 1];
    }
    
    return ints[ints.length - 1] + ints[ints.length - 1];
  });
  
  const convertedToInts: number[] = nums.map((e) => parseInt(e));
  const sum: number = convertedToInts.reduce((partialSum, a) => partialSum + a, 0);
  
  return sum;
}

run({
  part1: {
    tests: [
      {
        input: `        
        1abc2
        pqr3stu8vwx
        a1b2c3d4e5f
        treb7uchet`,
        expected: 142,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `        
        two1nine
        eightwothree
        abcone2threexyz
        xtwone3four
        4nineeightseven2
        zoneight234
        7pqrstsixteen`,
        expected: 281,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
