import fs from 'fs'

const file = './db/dataFake.json'

export const saveDB = (data) => {
    fs.writeFileSync(file, JSON.stringify(data))
}