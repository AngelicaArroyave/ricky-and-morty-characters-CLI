import colors from 'colors'
import readline from 'readline'

const menu = () => {
    console.clear()
    console.log('==============================='.blue);
    console.log('     Seleccione una opción'.blue);
    console.log('===============================\n'.blue);
    console.log(`${'1'.blue}. Crear personaje`);
    console.log(`${'2'.blue}. Actualizar un personaje`);
    console.log(`${'3'.blue}. Listar todos los personajes`);
    console.log(`${'4'.blue}. Buscar información de personajes`);
    console.log(`${'5'.blue}. Eliminar un personake`);
    console.log(`${'0'.blue}. Salir\n`);
}

export const showMenu = () => {
    menu()
    return promptUser(`\nSeleccione una opción para continuar\n`)
}

export const pause = () => {
    return promptUser(`\nPresione ${'ENTER'.blue} para continuar\n`)
}

const createReadlineInterface = () => {
    return readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })
}

const promptUser = (question) => {
    return new Promise(resolve => {
        const rdl = createReadlineInterface()
        rdl.question(question, option => {
            rdl.close()
            resolve(option)
        })
    })
}