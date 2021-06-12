// const BASE_URL = 'https://brackets-backend.herokuapp.com/api/picks';
const BASE_URL = 'http://localhost:3001/api/picks';
const BASE_URL_ALL = 'http://localhost:3001/api/picks/all';

function fetchUserPicks(uid) {
    return fetch(`${BASE_URL}?uid=${uid}`).then(res => res.json());
}

function fetchAllUserPicks() {
    return fetch(BASE_URL_ALL).then(res => res.json());
}

function createPicks(data, uid) {
    return fetch(BASE_URL, {
        method: 'POST',
        headers: {
            'Content-type': 'Application/json'
        },
        body: JSON.stringify({...data, uid})
    }).then(res => res.json())
}


function updatePicks(data, totalPoints, _id) {
    return fetch(`${BASE_URL}/${_id}`, {
        method: 'PUT',
        headers: {
            'Content-type': 'Application/json'
        },
        body: JSON.stringify({data, totalPoints})
    }).then(res => res.json())
}

export {
    createPicks,
    updatePicks,
    fetchUserPicks,
    fetchAllUserPicks
}