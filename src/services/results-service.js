// const BASE_URL = 'https://brackets-backend.herokuapp.com/api/results';
const BASE_URL = 'http://localhost:3001/api/results';


function createResults(data) {
    return fetch(BASE_URL, {
        method: 'POST',
        headers: {
            'Content-type': 'Application/json'
        },
        body: JSON.stringify({...data})
    }).then(res => res.json())
}

export {
    createResults,
}