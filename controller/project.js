'use strict'

var Project = require('../model/project');
var fs = require('fs');

var controller = {
    home: function (req, res) {
        return res.status(200).send({
            message: 'Soy Home'
        });
    },

    test: function (req, res) {
        return res.status(200).send({
            message: 'Soy Test'
        });
    },

    saveProject: function (req, res) {
        var project = new Project();

        var body = req.body;

        project.name = body.name;
        project.description = body.description;
        project.category = body.category;
        project.year = body.year;
        project.langs = body.langs;
        project.image = body.image;

        project.save((err, projectStored) => {
            if (err) return res.status(500).send({ message: 'Error interno guardando objeto en DB' });
            if (!projectStored) return res.status(404).send({ message: 'Error interno guardando objeto en DB' });

            return res.status(200).send({ project: projectStored });
        });

    },

    getProject: function (req, res) {
        var projectId = req.params.id;

        Project.findById(projectId, (err, project) => {
            if (err) return res.status(500).send({ message: 'Error obteniendo datos.' });
            if (!project) return res.status(404).send({ message: 'El proyecto no existe.' });

            return res.status(200).send({ project });
        });
    },

    getAllProjects: function (req, res) {
        Project.find().sort('+year').exec((err, projects) => {
            if (err) return res.status(500).send({ message: 'Error obteniendo datos.' });
            if (projects.length === 0) return res.status(404).send({ message: 'El proyecto no existe.' });

            return res.status(200).send({ projects });
        });
    },

    updateProject: function (req, res) {
        var projectId = req.params.id;
        var update = req.body;

        Project.findByIdAndUpdate(projectId, update, { new: true }, (err, projectUpdated) => {
            if (err) return res.status(500).send({ message: 'Error actualizando proyecto.' });
            if (!projectUpdated) return res.status(404).send({ message: 'El proyecto ha actualizar no existe.' });

            return res.status(200).send({ project: projectUpdated });
        });
    },

    deleteProject: function (req, res) {
        var projectId = req.params.id;

        Project.findByIdAndDelete(projectId, (err, projectDeleted) => {
            if (err) return res.status(500).send({ message: 'Error eliminando proyecto.' });
            if (!projectDeleted) return res.status(404).send({ message: 'El proyecto ha eliminar no existe.' });

            return res.status(200).send({ project: projectDeleted });
        });
    },

    uploadImage: function (req, res) {
        var projectId = req.params.id;

        if (req.files) {
            //File name
            var filePath = req.files.image.path;
            var fileSplit = filePath.split('\\');
            var fileName = fileSplit[1];
            //File extension
            var extSplit = fileName.split('.');
            var fileExt = extSplit[1];
            var extAllowed = ['png', 'jpeg', 'jpg'];

            if (extAllowed.includes(fileExt)) {
                Project.findByIdAndUpdate(projectId, { image: fileName }, { new: true }, (err, projectUpdated) => {
                    if (err) return res.status(500).send({ message: 'Error actualizando imagen.' });
                    if (!projectUpdated) return res.status(404).send({ message: 'El proyecto para actualizar imagen no existe.' });

                    return res.status(200).send({ project: projectUpdated });
                });
            } else {
                fs.unlink(filePath, (err) => {
                    return res.status(200).send({ message: 'Extensión [' + fileExt + '] no permitida.' });
                });
            }
        }
    }
};

module.exports = controller;