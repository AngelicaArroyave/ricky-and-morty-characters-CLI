import { Character } from "./character.js";

export class Characters {
    _listCharacters = {}

    constructor() {
        this._listCharacters = {}
    }

    createCharacter({ id, name, status, species, type, gender, origin, image }) {
        const character = new Character()
                            .setId(Number(id))
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
}