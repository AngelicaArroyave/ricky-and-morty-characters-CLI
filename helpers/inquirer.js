import colors from 'colors'
import inquirer from 'inquirer'

const menuOptions = [
    {
        type: 'list',
        name: 'option',
        message: '¿Qué desea hacer?',
        choices: [
            {
                value: '1',
                name: `${'1.'.blue} Crear personaje`
            },
            {
                value: '2',
                name: `${'2.'.blue} Actualizar un personaje`
            },
            {
                value: '3',
                name: `${'3.'.blue} Listar todos los personajes`
            },
            {
                value: '4',
                name: `${'4.'.blue} Buscar información de personajes`
            },
            {
                value: '5',
                name: `${'5.'.blue} Eliminar un personaje`
            },
            {
                value: '0',
                name: `${'0.'.blue} Salir`
            }
        ]
    }
]

export const inquirerMenu = async() => {
    console.clear()
    console.log('==============================='.blue);
    console.log('     Seleccione una opción'.blue);
    console.log('===============================\n'.blue);

    const { option } = await inquirer.prompt(menuOptions)

    return option
}

export const pause = async() => {
    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${'ENTER'.blue} para continuar`
        }
    ]

    console.log('\n');
    await inquirer.prompt(question)
}

export const readInformation = async() => {
    const id = await readInput('id', 'Id')
    const name = await readInput('name', 'Name')
    const status = await readInput('status', 'Status')
    const species = await readInput('species', 'Species')
    const type = await readInput('type', 'Type')
    const gender = await readInput('gender', 'Gender')
    const origin = await readInput('origin', 'Origin')
    const image = await readInput('image', 'Image')

    return { id, name, status, species, type, gender, origin, image }
}

const readInput = async(name, message) => {
    const question = [
        {
            type: 'input',
            name: `${name}`,
            message,
            validate(value) {
                if(value.length === 0) return `Por favor ingrese un valor para el ${name}`
                return true
            }
        }
    ]

    let info = await inquirer.prompt(question)
    info = Object.values(info)
    return info[0]
}