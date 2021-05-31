// const BASE_URI = 'https://worldcup.sfg.io/teams/';
const BASE_URI = 'https://raw.githubusercontent.com/openfootball/world-cup.json/master/2018/worldcup.groups.json';

export function getGroups() {
    return fetch(BASE_URI).then(res => res.json())
}

