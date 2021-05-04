'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 3701;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/LOCALDB')
    .then(() => {
        console.log("Conexión a LOCALDB exitosa!");

        // Creación del servidor
        app.listen(port, () => {
            console.log("Servidor corriendo correctamente en la URL 127.0.0.1:" + port);
        });

    })
    .catch(err => console.log(err));