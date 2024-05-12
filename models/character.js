export class Character {
    constructor() {
        this.id = 0
        this.name = ''
        this.status = ''
        this.species = ''
        this.type = ''
        this.gender = ''
        this.origin = ''
        this.image = ''
    }

    setId(id) {
        this.id = id
        return this
    }

    setName(name) {
        this.name = name
        return this
    }

    setStatus(status) {
        this.status = status
        return this
    }

    setSpecies(species) {
        this.species = species
        return this
    }

    setType(type) {
        this.type = type
        return this
    }

    setGender(gender) {
        this.gender = gender
        return this
    }

    setOrigin(origin) {
        this.origin = origin
        return this
    }

    setImage(image) {
        this.image = image
        return this
    }
}