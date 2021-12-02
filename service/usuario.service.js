const User = require('../model/usuarioModel')
const buscarUsuarioPorIdentificacion = (identi) => listUsuarios.find(user => user.identificacion === identi)

const listarEstudiantes = async (perfil) => await User.find({perfil})

const usuarios = async () => await User.find({})

module.exports = {
    buscarUsuarioPorIdentificacion,
    listarEstudiantes,
    usuarios
}