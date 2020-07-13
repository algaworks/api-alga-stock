const { readFileSync, writeFileSync } = require('fs')
const { join } = require('path')

exports.get = (storage) => {
  const path = join(__dirname, '..', 'storage', `${storage}.json`)

  const file = readFileSync(path, { encoding: 'utf-8' })
  return JSON.parse(file)
}

exports.set = (storage, data) => {
  const path = join(__dirname, '..', 'storage', `${storage}.json`)
  const json = JSON.stringify(data, null, 2)
  writeFileSync(path, json)
}
