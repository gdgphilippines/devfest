const fs = require('fs')
const files = fs.readdirSync(__dirname + '/tasks')

files.forEach((task) => {
  require(`${__dirname}/tasks/${task}`)
})
