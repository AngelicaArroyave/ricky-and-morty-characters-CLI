import { inquirerMenu, pause } from './helpers/inquirer.js'
import colors from 'colors'

const main = async() => {
    let option = ''

    do {
        option = await inquirerMenu()
        await pause()
    } while(option != 0)
}

main()