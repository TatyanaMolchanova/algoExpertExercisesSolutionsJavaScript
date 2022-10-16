const tournamentWinner = (competitions, results) => {
    const winners = []
    const winner = {}

    if (competitions.length !== results.length) {
        console.log("ERROR", )
        
        return new Error(`There is an error! 
        The tournament is invalid!
        The quantity of results and competitions are not the same`)
    }

   competitions.forEach((team, index) => {
        if (results[index] === 1) {
            winners.push(team[0])
        } else if (results[index] === 0) {
            winners.push(team[1])
        }
   })

   winners.forEach((player) => winner[player] ? winner[player]++ : winner[player] = 1)
   
   return Object.keys(winner).sort((a, b) => winner[b] - winner[a])[0]
   
}

console.log("tournamentWinner", tournamentWinner([
    ["HTML", "C#"],
    ["C#", "Python"],
    ["Python", "HTML"],
], [0, 0, 1]))
