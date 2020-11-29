const express = require('express');
const multer = require('multer')

const uploadConfig = require('./config/upload');
const EventController = require('./controllers/EventController');
const LoginController = require('./controllers/LoginController');
const UserController = require('./controllers/UserController');

const routes = express.Router();
const upload = multer(uploadConfig);

//login routes
routes.post('/login', LoginController.store)

//events routes
routes.get('/events', EventController.getAllEvents);
routes.get('/event/:eventId', EventController.getEventById);
routes.get('/events/:category', EventController.getByCategory);
routes.post('/event/register', upload.single("thumbnail"), EventController.save);
routes.delete('/event/:eventId',  EventController.delete);

//user routes
routes.post('/user/register', UserController.save);
routes.get('/user/:userId', UserController.getUserById);

module.exports = routes;