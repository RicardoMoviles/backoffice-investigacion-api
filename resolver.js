const { createUser,
    activeUser,
    deleteUser,
    buscarUsuarioPorIdentificacion,
    listarEstudiantes,
    usuarios
} = require('./service/usuario.service');

const { addUserToProject,
    createProject,
    deleteProject,
    proyectos,
    getProject
} = require('./service/proyecto.service');



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
        proyectos: () => proyectos(),
        getProject: ( parent,args, context, info) => getProject(args.nombre)
    },
    Mutation:{
        createUser: ( parent,args, context, info) => createUser(args.user),
        activeUser: (parent, args, context, info) => activeUser(args.identificacion),
        deleteUser: (parent, args, context, info) => deleteUser(args.ident),
        deleteProject: (parent, args, context, info) => deleteProject(args.nombreProyecto),
        insertUserToProject: async (parent, args, context, info) => addUserToProject(args.identificacion, args.nombreProyecto),
        createProject: ( parent,args, context, info) => createProject(args.project),
    }
}

module.exports = resolvers