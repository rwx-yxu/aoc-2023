import run from "aocrunner"

const parseInput = (rawInput) => rawInput
const tryMatchesBag = () => (t) =>{
  if (t.color == "red"){
    return t.count <= 12
  }else if (t.color == "green") {
    return t.count <= 13
  }
  return t.count<= 14
}
const triesMatchesBagCount = () =>(tryValue) => {
  return tryValue.every(tryMatchesBag())
}
const part1 = (rawInput) => {
  const input = parseInput(rawInput)
  const games = input.split("\n").filter((n) => n).map((line) => {
    let [game, tries] = line.split(":");

    const gameID = Number(game.split("Game ")[1]);
    tries = tries.split(";").map((t) => {
        const counters  = t.split(",").map((c) => {
          const parts = c.split(" ")
          return {color: parts[2], count: parts[1]}
        })
        
        return counters
      }
    )
    return {"game": gameID,"tries": tries}
  }).filter(game => {
    return game.tries.every(triesMatchesBagCount(game))
  })
  for(const g of games){
    console.log(g.game)
  }
  const total= games.reduce((accumulator, currentObject) => accumulator + currentObject.game, 0);
  console.log(games.length)
  return total
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)

  return
}

run({
  part1: {
    tests: [
      {
        input: `
        Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
        Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
        Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
        Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
        Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`,
        expected: 8,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
