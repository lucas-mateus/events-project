const express = require('express');
const multer = require('multer')

const uploadConfig = require('./config/upload');
const EventController = require('./controllers/EventController');
const UserController = require('./controllers/UserController');

const routes = express.Router();
const upload = multer(uploadConfig);

//events routes
routes.get('/event/:eventId', EventController.getEventById)
routes.post('/event/register', upload.single("thumbnail"), EventController.save);

//user routes
routes.post('/user/register', UserController.save);
routes.get('/user/:userId', UserController.getUserById);

module.exports = routes;