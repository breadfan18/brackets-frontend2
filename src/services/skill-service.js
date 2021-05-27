const BASE_URL = 'http://localhost:3001/api/skills';

function fetchSkills(uid) {
    return fetch(BASE_URL + '?uid=' + uid).then(res => res.json());
}

function updateSkill(skill, level, _id) {
    return fetch(`${BASE_URL}/${_id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'Application/json'
        },
        body: JSON.stringify({ skill, level })
      }).then(res => res.json());
}

function createSkill(data, uid) {
    return fetch(BASE_URL, {
        method: 'POST',
        headers: {
          'Content-type': 'Application/json'
        },
        body: JSON.stringify({...data, uid})
      }).then(res => res.json())
}

function deleteSkill(id) {
    return fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE'
      }).then(res => res.json())
}

export {
    fetchSkills,
    updateSkill,
    createSkill,
    deleteSkill
}