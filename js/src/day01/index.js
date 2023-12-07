import run from "aocrunner"

const parseInput = (rawInput) => rawInput

const part1 = (rawInput) => {
  const input = parseInput(rawInput)
  const isInt = (char) => Number.isInteger(char)
  
  const inputArr = input.split("\n")
  // map
  const nums = inputArr.flatMap((line)=>{
      const charArr = [...line];
      const ints = charArr.filter((c)=> isInt(Number(c)))
      if (ints.length == 0){
          return 'Null'
      }
      if (ints.length > 1){
          return ints[0]+ints[ints.length-1]
      }
      return ints[ints.length-1]+ints[ints.length-1]
  })
  
  //map convert to integers from string
  const convertedToInts = nums.map((e) => parseInt(e))
  
  // reduce to sum
  const sum = convertedToInts.reduce((partialSum, a) => partialSum + a, 0)
  
  return sum
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)
  const numWords = ['one','two','three','four','five','six','seven','eight','nine']
  const numVal = ['1','2','3','4','5','6','7','8','9']
  const isInt = (char) => Number.isInteger(char)
  const position = (line,word) => line.indexOf(word)
  const inputArr = input.split("\n")
  // map
  const nums = inputArr.flatMap((line)=>{
      let orderIndx = []
      let positionIndx =[]
      let cpyLine = line
      numWords.forEach((e,indx)=>{
          const occurance = line.split(e).length -1
          if (occurance> 0 ){
              for (let i =0; i< occurance;i++){
  
                  orderIndx.push(indx)
                  positionIndx.push(position(cpyLine,e))
  
                  if (occurance > 1){
                      const lineChar = [...cpyLine]
                      lineChar[[positionIndx[positionIndx.length-1]+1]] = "&"
                      cpyLine = lineChar.join('')         
                  }
              }
          }
      })
      let combined = positionIndx.map((element, index) => ({ element, mapped: orderIndx[index] }));
      combined.sort((a, b) => a.element - b.element);
  
      positionIndx = combined.map(pair => pair.element);
      orderIndx = combined.map(pair => pair.mapped);
  
  
      orderIndx.forEach((e,i) => {
          const lineChar = [...line]
          lineChar[[positionIndx[i]]] = numVal[e]
          line = lineChar.join('')
      })
      const charArr = [...line];
      const ints = charArr.filter((c)=> isInt(Number(c)))
      if (ints.length == 0){
          return 'null'
      }
      if (ints.length > 1){
          return ints[0]+ints[ints.length-1]
      }
      return ints[ints.length-1]+ints[ints.length-1]
  })
  //map convert to integers from string
  const convertedToInts = nums.map((e) => parseInt(e))
  
  // reduce
  const sum = convertedToInts.reduce((partialSum, a) => partialSum + a, 0)
  
  return sum
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
