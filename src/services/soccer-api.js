const BASE_URI = 'https://worldcup.sfg.io/teams/';

export function getGroups() {
    return fetch(BASE_URI).then(res => res.json())
}

