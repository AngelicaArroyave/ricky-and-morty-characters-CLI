import { Characters } from './models/characters.js'
import { confirmAction, inquirerMenu, listCharactersToBeDeleted, listCharactersToBeUpdated, pause, readInformation } from './helpers/inquirer.js'
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
            characters.createCharacter({ name, status, species, type, gender, origin, image })
            break;
        case '2':
            await choiceUpdate()
            break;
        case '3':
            characters.showCharacters()
            break;
        case '4':
            // Buscar información de personaje
            break;
        case '5':
            await choiceDelete()
            break;
    }
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