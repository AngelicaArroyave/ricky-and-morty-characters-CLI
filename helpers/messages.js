import colors from 'colors'
import readline from 'readline'

export const menu = () => {
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

export const pause = () => {
    const rdl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })

    rdl.question(`\nPresione ${'ENTER'.blue} para continuar\n`, option => {
        rdl.close()
        // resolve(option)
    })
}