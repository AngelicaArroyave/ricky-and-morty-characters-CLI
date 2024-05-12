import { Characters } from './models/characters.js'
import { inquirerMenu, pause, readInformation } from './helpers/inquirer.js'
import { saveDB } from './helpers/fileManagement.js'
import colors from 'colors'

const characters = new Characters()

const main = async() => {
    let option = ''

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
            const { id, name, status, species, type, gender, origin, image } = await readInformation()
            characters.createCharacter({ id, name, status, species, type, gender, origin, image })
            break;
        case '2':
            // Actualizar personaje
            break;
        case '3':
            // Listar personajes
            console.log(characters._listCharacters);
            break;
        case '4':
            // Buscar información de personaje
            break;
        case '5':
            // Eliminar a un personaje
            break;
    }
}

main()