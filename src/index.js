const express = require('express')
const morgan = require('morgan');
const path = require('path')
const app = express()

const { mongoose } = require('./db')

require('./config/config')

// Settings



// Middlewares

app.use(express.json())
app.use(morgan('dev'))
app.use(express.urlencoded({extended:false}))

// Router

app.use('/api/data', require('./routes/task.routes'))


// Static file

app.use(express.static(path.join(__dirname, 'public')))




app.listen(process.env.PORT, () => {
    console.log('server ok  =>  200 ')
})