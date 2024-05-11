import { showMenu, pause } from './helpers/messages.js'
import colors from 'colors'

const main = async() => {
    let option = ''

    do {
        option = await showMenu()
        console.log("🚀 ~ main ~ option:", option)
        await pause(`Presione ${'ENTER'.blue} para continuar`)
    } while(option != 0)
}

main()