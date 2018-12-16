const path = require('path')

module.exports = {
    entry: './src/app/app.js',
    output:  {
        path : path.join(__dirname + 'public')
    }
}