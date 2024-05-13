import fs from 'fs'

const file = './db/data.json'

export const saveDB = (data) => {
    fs.writeFileSync(file, JSON.stringify(data))
}

export const readDB = () => {
    if(!fs.existsSync(file)) return null

    const information = fs.readFileSync(file, { encoding: 'utf-8' })
    return JSON.parse(information)
}