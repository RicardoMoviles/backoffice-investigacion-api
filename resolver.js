const { buscarUsuarioPorIdentificacion,
    listarEstudiantes,
    usuarios } = require('./service/usuario.service')
const Project = require('./model/proyectoModel')
const User = require('./model/usuarioModel')
const aes256 = require('aes256');

const key = 'CLAVEDIFICIL';

const listUsuarios = [
    {
        nombre: 'Ramon Castano',
        identificacion: 123456789,
        estado: 'activo',
        email: 'ranon@gmail.com',
        perfil: 'estudiante'
    },
    {
        nombre: 'Ernesto',
        identificacion: 98765,
        estado: 'inactivo',
        email: 'ernesto@gmail.com',
        perfil: 'estudiante'
    },
    {
        nombre: 'Daniel Saavedra',
        identificacion: 123456789,
        estado: 'activo',
        email: 'daniel@gmail.com',
        perfil: 'lider'
    }
]

const resolvers = {
    Query: {
        usuarios: () => usuarios(),
        usuario: ( parent,args, context, info) =>buscarUsuarioPorIdentificacion(args.identificacion),
        getEstudiantes: async ( parent,args, context, info) => listarEstudiantes(args.perfil),
        proyectos: async () =>  await Project.find({}),
        getProject: async ( parent,args, context, info) => await Project.findOne({nombre:args.nombre})
    },
    Mutation:{
        createUser: ( parent,args, context, info) =>{
            const { clave } = args.user;
            const nuevoUsuario = new User(args.user);
            const encryptedPlainText = aes256.encrypt(key, clave);
            nuevoUsuario.clave = encryptedPlainText
            return nuevoUsuario.save()
            .then(u => "ususario creado")
            .catch(err => "fallo la creacion")
        },
        activeUser: (parent, args, context, info) => {
            return User.updateOne({identificacion: args.identificacion}, {estado:"Activo"})
                .then(u => "ususario activo")
                .catch(err => "fallo la activacion")
        },
        deleteUser: (parent, args, context, info) => {
            return User.deleteOne({ident:args.ident})
                .then(u => "ususario eliminado")
                .catch(err => "fallo la eliminacion")
        },
        deleteProject: (parent, args, context, info) => {
            return Project-updateOne({nombreProyecto:args.nombre})
                .then(u => "Proyecto eliminado")
                .catch(err => "fallo la eliminacion")
        },
        insertUserToProject: async (parent, args, context, info) => {
            const user = await User.findOne({identificacion: args.identificacion})
            if (user && user.estado === "Activo"){
                const project = await Project.findOne({nombre: args.nombreProyecto})
                if(project && project.activo){
                    if(project.integrantes.find(i => i == user.identificacion)){
                        return "El usuario ya pertenece al proyecto indicado"
                    }else{
                        await Project.updateOne({ nombre: args.nombreProyecto}, { $push: {integrantes: user.identificacion} })
                        return "Usuario adicionado correctamente"
                    }
                }else{
                    return "Proyecto no valido para adicionar un integrante, consulte al administrador"
                }
            }else{
                return "Usuario no valido"
            }
        }


    }
}

module.exports = resolvers