const { Schema, model } = require('mongoose');


const usuario = new Schema({
    nombre : {
        type:String,
        required: true
    },
    identificacion : {
        type:Number,
        unique: true,
        required: true
    },
    perfil: {
        type: String,
        require: true
    },
    estado: {
        type: String,
        default: 'Inactivo'
    },
    clave: {
        type: String,
        required: true
    }
})

module.exports = model('usuarios', usuario, 'usuarios')