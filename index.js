'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 3701;
var uri = 'mongodb://127.0.0.1:27017/LOCALDB';

mongoose.Promise = global.Promise;
mongoose.connect(uri, { useFindAndModify: false, useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => {
        console.log("Conexión a LOCALDB exitosa!");

        // Creación del servidor
        app.listen(port, () => {
            console.log("Servidor corriendo correctamente en la URL 127.0.0.1:" + port);
        });

    })
    .catch(err => console.log(err));