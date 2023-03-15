function solution(hp) {
    let General = Math.floor(hp / 5)
    let Soldier = Math.floor((hp - General * 5) / 3)
    let Worker = hp - (General * 5) - (Soldier * 3)
    return (General + Soldier + Worker)
}