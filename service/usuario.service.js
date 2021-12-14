const User = require('../model/usuarioModel')
const aes256 = require('aes256');

const key = 'CLAVEDIFICIL';

const createUser =  ( user ) =>{
    const { clave } = user;
    const nuevoUsuario = new User(user);
    const encryptedPlainText = aes256.encrypt(key, clave);
    nuevoUsuario.clave = encryptedPlainText
    return nuevoUsuario.save()
    .then(u => "ususario creado")
    .catch(err => "fallo la creacion")
}

const activeUser = (identificacion) => {
    return User.updateOne({identificacion}, {estado:"Activo"})
        .then(u => "ususario activo")
        .catch(err => "fallo la activacion")
}

const deleteUser = (ident) => {
    return User.deleteOne({ident})
        .then(u => "ususario eliminado")
        .catch(err => "fallo la eliminacion")
}


const buscarUsuarioPorIdentificacion = (identi) => listUsuarios.find(user => user.identificacion === identi)

const listarEstudiantes = async (perfil) => await User.find({perfil})

const usuarios = async () => await User.find({})

module.exports = {
    createUser,
    activeUser,
    deleteUser,
    buscarUsuarioPorIdentificacion,
    listarEstudiantes,
    usuarios
}