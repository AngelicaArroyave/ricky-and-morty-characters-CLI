import { Character } from "./character.js";

export class Characters {
    _list = {}

    constructor() {
        this._list = {}
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
        this._list[character.id] = character
    }
}