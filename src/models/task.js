const { mongoose } = require('../db')
const Schema = mongoose.Schema


let task = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    }
});

 
module.exports =  mongoose.model('Task', task)