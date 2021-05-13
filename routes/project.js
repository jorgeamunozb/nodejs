'use strict'

var express = require('express');
var ProjectController = require('../controller/project');

var router = express.Router();

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: './uploads' });

router.get('/home', ProjectController.home);
router.post('/test', ProjectController.test);
router.post('/save-project', ProjectController.saveProject);
router.get('/project/:id?', ProjectController.getProject);
router.get('/projects', ProjectController.getAllProjects);
router.put('/update-project/:id', ProjectController.updateProject);
router.delete('/delete-project/:id', ProjectController.deleteProject);
router.post('/upload-image/:id', multipartMiddleware, ProjectController.uploadImageWithProjectId);
router.get('/get-image/:image', ProjectController.getImageFile);
router.post('/create-project-with-image', multipartMiddleware, ProjectController.createProjectWithImage);
router.post('/upload-image', multipartMiddleware, ProjectController.uploadImageWithoutProjectId);

module.exports = router;