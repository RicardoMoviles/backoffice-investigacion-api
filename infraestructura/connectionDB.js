const mongoose = require('mongoose');

const urlDB = 'mongodb+srv://MongoR:PNywTGe1soQsKr5obzWK@misiontic.gt36n.mongodb.net/proyectosInvestigacion?retryWrites=true&w=majority';
mongoose.connect(urlDB);

const mongoDB = mongoose.connection;

mongoDB.on('open', _ => {
    console.log("conectado a la bd")
})