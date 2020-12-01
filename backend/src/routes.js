const express = require('express');
const multer = require('multer')

const uploadConfig = require('./config/upload');
const ApprovalController = require('./controllers/ApprovalController');
const EventController = require('./controllers/EventController');
const LoginController = require('./controllers/LoginController');
const RegistrationController = require('./controllers/RegistrationController');
const RejectionController = require('./controllers/RejectionController');
const UserController = require('./controllers/UserController');

const routes = express.Router();
const upload = multer(uploadConfig);


//Registration
routes.post('/registration/:eventId', RegistrationController.create);
routes.get('/registration/:regId', RegistrationController.getRegistration);
routes.post('/registration/:regId/approvals', ApprovalController.approval);
routes.post('/registration/:regId/rejections', RejectionController.rejection);

//login routes
routes.post('/login', LoginController.store)

//events routes
routes.get('/events', EventController.getAllEvents);
routes.get('/event/:eventId', EventController.getEventById);
routes.get('/events/:category', EventController.getByCategory);
routes.post('/event/register', upload.single("thumbnail"), EventController.save);
routes.delete('/event/:eventId', EventController.delete);

//user routes
routes.post('/user/register', UserController.save);
routes.get('/user/:userId', UserController.getUserById);

module.exports = routes;