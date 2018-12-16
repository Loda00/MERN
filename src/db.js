const mongoose = require('mongoose')

const URI = 'mongodb://localhost:27017/mern'

mongoose.connect(URI, { useNewUrlParser: true } )
    .then(() => console.log('Connected mongo'))
    .catch(err => console.log('Connection fail' + err))

module.exports = { mongoose }