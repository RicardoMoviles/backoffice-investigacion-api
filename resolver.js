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
        usuarios: () => listUsuarios,
        usuario: ( parent,args, context, info) =>listUsuarios.find(user => user.identificacion === args.identificacion),
        //getEstudiantes: async (perf) => await listUsuarios.find({}, {perfil:perf}),
        proyectos: async () =>  await Project.find({}),
        getProject: async ( parent,args, context, info) => await Project.findOne({nombre:args.nombre})
    },
    Mutation:{
        createUser: async ( parent,args, context, info) =>{
            const { clave } = args.user;
            const nuevoUsuario = new User(args.user);
            const encryptedPlainText = aes256.encrypt(key, clave);
            nuevoUsuario.clave = encryptedPlainText
            await nuevoUsuario.save();
            return "Usuario creado"
        }
    }
}

module.exports = resolvers