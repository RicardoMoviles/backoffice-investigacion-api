const Project = require('../model/proyectoModel')

const addUserToProject = async (identificacion, nombreProyecto) => {
    const user = await User.findOne({ identificacion })
    if (user && user.estado === "Activo"){
        const project = await Project.findOne({nombre: nombreProyecto})
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

const createProject = ( project ) =>{
    const nuevoProyecto = new Project(project);
    return nuevoProyecto.save()
    .then(u => "Proyecto creado")
    .catch(err => "fallo la creacion")
}


const deleteProject = ( nombreProyecto ) => {
    return Project.updateOne({nombre: nombreProyecto})
        .then(u => "Proyecto eliminado")
        .catch(err => "fallo la eliminacion")
}

const proyectos =  async () =>  await Project.find({}).populate("integrantes");
const getProject =  async ( nombre ) => await Project.findOne({ nombre });

module.exports = {
    addUserToProject,
    createProject,
    deleteProject,
    proyectos,
    getProject
}