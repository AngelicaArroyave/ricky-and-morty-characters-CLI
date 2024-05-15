const URL = 'https://api.sampleapis.com/rickandmorty/characters'

export const createCharacter = async({ name, status, species, type, gender, origin, image }) => {
    await fetch(`${URL}`, {
        method: "POST",
        body: JSON.stringify({ name, status, species, type, gender, origin, image }),
        headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then(response => response.json()) 
        .then(json => console.log(json))
        .catch(error => console.log(error))
}

export const convertToArray = async() => {
    const list = []

    await fetch(`${URL}`)
        .then(response => response.json())
        .then(json => {
            Object.keys(json).forEach(key => list.push(json[key]))
        })
        .catch(error => console.log('Solicitud fallida'.red, error))

    return list
}

export const showCharacters = async() => {
    await fetch(`${URL}`)
        .then(response => response.json())
        .then(json => {
            console.log('\n')
            json.forEach((character, idx) => {
            const index = `${idx + 1}.`.blue
            const { name, status, type, gender, origin } = character
            console.log(`${index} ${name}, ${status}, ${type}, ${gender}, born on ${origin}`)
        })
        })
        .catch(error => console.log('Solicitud fallida'.red, error))
}

export const deleteCharacter = async(id) => {
    await fetch(`${URL}/${id}`, {
        method: "DELETE",
        headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then(response => response.json())
        .catch(error => console.log(error))
}

export const updateCharacter = async({ id, name, status, species, type, gender, origin, image }) => {
    await fetch(`${URL}/${id}`, {
        method: "PUT",
        body: JSON.stringify({ name, status, species, type, gender, origin, image }),
        headers: {"Content-type": "application/json; charset=UTF-8"}
        })
        .then(response => response.json()) 
        .then(json => console.log(json))
        .catch(error => console.log(error))
}

export const findByIdCharacter = async(id) => {
    await fetch(`${URL}/${id}`)
        .then(response => response.json())
        .then(json => console.log('\n', json))
        .catch(error => console.log('Solicitud fallida'.red, error))
}

export const findCharactersInformation = async(attribute, value) => {
    await fetch(`${URL}/?${attribute}=${value}`)
        .then(response => response.json())
        .then(json => {
            const characters = json.filter(character => character[attribute] === value)
            console.log('\n', characters)
        })
        .catch(error => console.log('Solicitud fallida'.red, error))
}