// const BASE_URI = 'https://worldcup.sfg.io/teams/';
const BASE_URI_GROUPS = 'https://raw.githubusercontent.com/openfootball/world-cup.json/master/2018/worldcup.groups.json';
const BASE_URI_GROUPS_RESULTS = 'https://raw.githubusercontent.com/openfootball/world-cup.json/master/2018/worldcup.standings.json';

export function getGroups() {
    return fetch(BASE_URI_GROUPS).then(res => res.json());
}

export function getGroupsResults(){
    return fetch(BASE_URI_GROUPS_RESULTS).then(res => res.json());
}
