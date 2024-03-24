export function generateData(numPlayers) {
    const players = [];
    for (let i = 1; i <= numPlayers; i++) {
        const points = Math.floor(Math.random() * 401) + 100;
        const multiplier = (Math.random() * 10);
        const name = `Cpu${i}`;
        players.push({ name, points, multiplier });
    }
    return players;
}