const { gql} = require('apollo-server-express')

const typeDefs = gql`

    type Usuario{
        nombre: String
        identificacion: Int
        estado: String
        email: String
        perfil: String
    }

    type Proyecto{
        nombre: String
        lider: String
        facultad: String
        integrantes: [String]

    }

    type Query{
        usuarios: [Usuario]
        usuario( identificacion: Int ): Usuario
        getEstudiantes( perfil: String ): [Usuario]
        proyectos: [Proyecto]
        getProject( nombre: String ): Proyecto
    }
    input UserInput{
        nombre: String
        identificacion: Int
        clave: String
        email: String
        perfil: String
    }
    input ProjectInput{
        nombre: String
        lider: String
        facultad: String
    }

    type Mutation{
        createUser( user: UserInput ):String
        createProject( project: ProjectInput ):String
        activeUser(identificacion:Int ): String
        deleteUser(ident:Int ): String
        deleteProject(nombreProyecto: String): String
        insertUserToProject(identificacion: Int, nombreProyecto: String):String
    }
` 
module.exports = typeDefs
