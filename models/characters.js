export class Characters {
    _listCharacters = {}
    _URL = 'https://api.sampleapis.com/rickandmorty/characters'

    constructor() {
        this._listCharacters = {}
    }

    async createCharacter({ name, status, species, type, gender, origin, image }) {
        await fetch(`${this._URL}`, {
            method: "POST",
            body: JSON.stringify({ name, status, species, type, gender, origin, image }),
            headers: {"Content-type": "application/json; charset=UTF-8"}
            })
            .then(response => response.json()) 
            .then(json => console.log(json))
            .catch(error => console.log(error))
    }

    async convertToArray() {
        const list = []

        await fetch(`${this._URL}`)
            .then(response => response.json())
            .then(json => {
                Object.keys(json).forEach(key => list.push(json[key]))
            })
            .catch(error => console.log('Solicitud fallida'.red, error))

        return list
    }

    async showCharacters() {
        await fetch(`${this._URL}`)
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

    async deleteCharacter(id) {
        await fetch(`${this._URL}/${id}`, {
            method: "DELETE",
            headers: {"Content-type": "application/json; charset=UTF-8"}
            })
            .then(response => response.json())
            .catch(error => console.log(error))
    }

    async updateCharacter({ id, name, status, species, type, gender, origin, image }) {
        await fetch(`${this._URL}/${id}`, {
            method: "PUT",
            body: JSON.stringify({ name, status, species, type, gender, origin, image }),
            headers: {"Content-type": "application/json; charset=UTF-8"}
            })
            .then(response => response.json()) 
            .then(json => console.log(json))
            .catch(error => console.log(error))
    }

    async findByIdCharacter(id) {
        await fetch(`${this._URL}/${id}`)
            .then(response => response.json())
            .then(json => console.log('\n', json))
            .catch(error => console.log('Solicitud fallida'.red, error))
    }

    async findCharactersInformation(attribute, value) {
        await fetch(`${this._URL}/?${attribute}=${value}`)
            .then(response => response.json())
            .then(json => {
                const characters = json.filter(character => character[attribute] === value)
                console.log('\n', characters)
            })
            .catch(error => console.log('Solicitud fallida'.red, error))
    }
}