import { Characters } from './models/characters.js'
import { confirmAction, inquirerMenu, listCharactersToBeDeleted, listCharactersToBeUpdated, pause, readInformation, readInput } from './helpers/inquirer.js'
import { saveDB, readDB } from './helpers/fileManagement.js'
import colors from 'colors'

const characters = new Characters()

const main = async() => {
    let option = ''
    const charactersDB = readDB()

    if(charactersDB) characters.loadCharactersFromArray(charactersDB)

    do {
        option = await inquirerMenu()
        await selectAChoice(option)
        saveDB(characters.convertToArray)
        await pause()
    } while(option != 0)
}

const selectAChoice = async(option) => {
    switch (option) {
        case '1':
            const { name, status, species, type, gender, origin, image } = await readInformation()
            await characters.createCharacter({ name, status, species, type, gender, origin, image })
            break
        case '2':
            await choiceUpdate()
            break
        case '3':
            await characters.showCharacters()
            break
        case '4':
            await selectAChoiceSearch()
            break
        case '5':
            await choiceDelete()
            break
    }
}

const selectAChoiceSearch = async() => {
    const option = await inquirerMenu('search')

    switch (option) {
        case '1':
            const status = await readCharacterInformation('el estado', 'Alive, Dead o unknown', 'Status')
            await characters.findCharactersInformation('status', status)
            break
        case '2':
            const species = await readCharacterInformation('la especie', 'Human o Alien', 'Species')
            await characters.findCharactersInformation('species', species)
            break
        case '3':
            const type = await readCharacterInformation('el tipo', 'Human, Alien, Genetic experiment o Parasite', 'Type')
            await characters.findCharactersInformation('type', type, 'include')
            break
        case '4':
            const gender = await readCharacterInformation('el género', 'Female, Male o unknown', 'Gender')
            await characters.findCharactersInformation('gender', gender)
            break
        case '5':
            const origin = await readCharacterInformation('el origen', 'Earth (C-137), Abadango o unknown', 'Origin')
            await characters.findCharactersInformation('origin', origin, 'include')
            break
    }
}

const readCharacterInformation = async(message, example, filter) => {
    console.log(`\nPor favor ingrese ${message} a filtrar`.blue, `\nEjemplo: ${example}`.yellow)
    return await readInput(filter.toLowerCase(), filter)
}

const choiceDelete = async() => {
    const id = await listCharactersToBeDeleted(characters.convertToArray)

    if(id !== 0) {
        const response = await confirmAction('¿Está seguro/a?')
        
        if(response) {
            characters.deleteCharacter(id)
            console.log('Personaje borrado exitosamente'.green)
        }
    }
}

const choiceUpdate = async() => {
    const id = await listCharactersToBeUpdated(characters.convertToArray)

    if(id !== 0) {
        const characterInformation = characters.findByIdCharacter(id)
        console.log('\nInformacion que se tiene actualmente del personaje:\n'.blue, characterInformation)
        const { name, status, species, type, gender, origin, image } = await readInformation()
        const response = await confirmAction('¿Está seguro/a?')

        if(response) {
            characters.updateCharacter({ id, name, status, species, type, gender, origin, image })
            console.log('Actualizada la información del personaje exitosamente'.green)
        }
    }
}

main()