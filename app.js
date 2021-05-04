'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// Cargar archivos de rutas
var projectRoutes = require('./routes/project');

// Middlewares: Método que se ejecuta antes de la acción del controlador
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS

// Rutas
app.use('/api', projectRoutes);

// Exportar
module.exports = app;