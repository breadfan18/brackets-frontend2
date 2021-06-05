const BASE_URL = 'http://localhost:3001/api/picks';

function createPicks(data, uid) {
    return fetch(BASE_URL, {
        method: 'POST',
        headers: {
            'Content-type': 'Application/json'
        },
        body: JSON.stringify({...data, uid})
    }).then(res => res.json())
}


function updatePicks(data, _id) {
    return fetch(`${BASE_URL}/${_id}`, {
        method: 'PUT',
        headers: {
            'Content-type': 'Application/json'
        },
        body: JSON.stringify({data})
    }).then(res => res.json())
}

export {
    createPicks,
    updatePicks
}