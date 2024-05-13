import { Character } from "./character.js";

export class Characters {
    _listCharacters = {}

    constructor() {
        this._listCharacters = {}
    }

    createCharacter({ name, status, species, type, gender, origin, image }) {
        const id = this.convertToArray.length + 1
        const character = new Character()
                            .setId(id)
                            .setName(name)
                            .setStatus(status)
                            .setSpecies(species)
                            .setType(type)
                            .setGender(gender)
                            .setOrigin(origin)
                            .setImage(image)
        this._listCharacters[character.id] = character
    }

    get convertToArray() {
        const list = []
        Object.keys(this._listCharacters).forEach(key => list.push(this._listCharacters[key]))

        return list
    }

    loadCharactersFromArray(characters = []) {
        characters.forEach(character => this._listCharacters[character.id] = character)
    }

    showCharacters() {
        console.log('\n');
        this.convertToArray.forEach((character, idx) => {
            const index = `${idx + 1}.`.blue
            const { name, status, type, gender, origin } = character
            console.log(`${index} ${name}, ${status}, ${type}, ${gender}, born on ${origin}`);
        })
    }

    deleteCharacter(id = '') {
        if(this._listCharacters[id]) delete this._listCharacters[id]
    }

    findByIdCharacter(id = '') {
        if(this._listCharacters[id]) return this._listCharacters[id]
    }

    updateCharacter({ id, name, status, species, type, gender, origin, image }) {
        const character = new Character()
                            .setId(id)
                            .setName(name)
                            .setStatus(status)
                            .setSpecies(species)
                            .setType(type)
                            .setGender(gender)
                            .setOrigin(origin)
                            .setImage(image)
        this._listCharacters[id] = character
    }
}