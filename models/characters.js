const URL = 'https://api.sampleapis.com/rickandmorty/characters'

async function fetchData(url, method, body = '') {
    try {
        const options = {
            method,
            headers: {"Content-type": "application/json; charset=UTF-8"}
        }

        if(body !== '') options.body = JSON.stringify(body)
        
        const response = await fetch(url, options)
    
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)

        const data = await response.json()
        
        return data
    } catch (error) {
        throw new Error('Error fetching data: ', error)
    }
}

export const createCharacter = async({ name, status, species, type, gender, origin, image }) => {
    const response = await fetchData(URL, 'POST', { name, status, species, type, gender, origin, image })
    console.log(response)
}

export const convertToArray = async() => {
    const list = []
    const response = await fetchData(URL, 'GET')
    Object.keys(response).forEach(key => list.push(response[key]))

    return list
}

export const showCharacters = async() => {
    const response = await fetchData(URL, 'GET')
    console.log('\n')
    response.forEach((character, idx) => {
        const index = `${idx + 1}.`.blue
        const { name, status, type, gender, origin } = character
        console.log(`${index} ${name}, ${status}, ${type}, ${gender}, born on ${origin}`)
    })
}

export const deleteCharacter = async(id) => await fetchData(`${URL}/${id}`, 'DELETE')

export const updateCharacter = async({ id, name, status, species, type, gender, origin, image }) => {
    const response = await fetchData(`${URL}/${id}`, 'PUT', { name, status, species, type, gender, origin, image })
    console.log(response)
}

export const findByIdCharacter = async(id) => {
    const response = await fetchData(`${URL}/${id}`, 'GET')
    console.log('\n', response)
}

export const findCharactersInformation = async(attribute, value) => {
    const response = await fetchData(`${URL}/?${attribute}=${value}`, 'GET')
    const characters = response.filter(character => character[attribute] === value)
    console.log('\n', characters)
}