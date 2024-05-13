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

const searchMenuOptions = [
    {
        type: 'list',
        name: 'option',
        message: `¿Qué desea buscar en la lista de personajes?\n ${'IMPORTANTE: Recuerde ingresar tal cual los filtros como se indica en los ejemplos'.yellow}`,
        choices: [
            {
                value: '1',
                name: `${'1.'.blue} Por estado (status)`
            },
            {
                value: '2',
                name: `${'2.'.blue} Por tipo de especie (species)`
            },
            {
                value: '3',
                name: `${'3.'.blue} Por tipo (type)`
            },
            {
                value: '4',
                name: `${'4.'.blue} Por género (gender)`
            },
            {
                value: '5',
                name: `${'5.'.blue} Por origen (Origin)`
            },
            {
                value: '0',
                name: `${'0.'.blue} Salir`
            }
        ]
    }
]

export const inquirerMenu = async(typeOptions = 'general') => {
    console.clear()
    console.log('==============================='.blue)
    console.log('     Seleccione una opción'.blue)
    console.log('===============================\n'.blue)

    const choiceOptions = typeOptions !== 'general' ? searchMenuOptions : menuOptions
    const { option } = await inquirer.prompt(choiceOptions)

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

    console.log('\n')
    await inquirer.prompt(question)
}

export const readInformation = async() => {
    const name = await readInput('name', 'Name')
    const status = await readInput('status', 'Status')
    const species = await readInput('species', 'Species')
    const type = await readInput('type', 'Type')
    const gender = await readInput('gender', 'Gender')
    const origin = await readInput('origin', 'Origin')
    const image = await readInput('image', 'Image')

    return { name, status, species, type, gender, origin, image }
}

export const readInput = async(name, message) => {
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

export const listCharactersToBeDeleted = async(characters = []) => {
    const choices = choicesCharacters(characters)

    return await optionsDeleteAndUpdate('Borrar', choices)
}

export const listCharactersToBeUpdated = async(characters = []) => {
    const choices = choicesCharacters(characters)

    return await optionsDeleteAndUpdate('Actualizar', choices)
}

const choicesCharacters = (characters) => {
    const choices = characters.map((character, index) => {
        const idx = `${index + 1}.`.blue
        
        return {
            value: character.id,
            name: `${idx} ${character.name}`
        }
    })
    
    choices.unshift({
        value: 0,
        name: `${'0.'.blue} Cancelar`
    })

    return choices
}

const optionsDeleteAndUpdate = async(message, choices) => {
    const optionsUpdate = [
        {
            type: 'list',
            name: 'id',
            message,
            choices
        }
    ]
    const { id } = await inquirer.prompt(optionsUpdate)

    return id
}

export const confirmAction = async(message) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ]
    const { ok } = await inquirer.prompt(question)

    return ok
}