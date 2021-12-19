//const ProjectModel = require('./model/proyectoModel')
require('./infraestructura/connectionDB')
const typeDefs = require('./typeDef')
const resolvers = require('./resolver')
const authRoute = require('./routes/auth.routes')

const express = require('express')
const { ApolloServer} = require('apollo-server-express')


const iniciarServidor = async () => {
    const api = express();
    const apollo = new ApolloServer(
        { 
            typeDefs, 
            resolvers 
        });
    await apollo.start()
    apollo.applyMiddleware({app:api})
    /*api.use((request,response) =>{
        response.send('Hola')
    })*/
    api.use(express.json())  //PARA TRABAJAR CON JSON
    api.use('/api', authRoute)
    api.listen('9092', () => console.log('Inicio server'))
}

iniciarServidor()

/*
const projectAguas = new ProjectModel({
    nombre: 'Segundo proyecto',
    lider: 'Santiago Bustamante',
    facultad: 'Medicina'
})

projectAguas.save( (err, document) => {
    if(err){
        console.log(err);
        return;
    }
})


const consultaProyectos = async () => {
    return await ProjectModel.find({})
}

api.get('/proyectos', (request,response) => {
    consultaProyectos().then(function (resultado) {
        response.json({ projects: resultado })
    })
    
})*/





