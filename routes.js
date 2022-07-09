const express = require('express');
const router = express.Router();
const homeCtrl = require('./src/controllers/HomeController');
const loginCtrl = require('./src/controllers/LoginController');
const contactCtrl = require('./src/controllers/ContactController');

// home
router.get('/', homeCtrl.index);

// login
router.get('/login/index', loginCtrl.loginIndex);
router.post('/login/', loginCtrl.loginUser);

// register
router.get('/register/index', loginCtrl.registerIndex);
router.post('/register/add', loginCtrl.registerUser);

// logout
router.get('/logout/', loginCtrl.logoutUser);

// contact
router.get('/contact/index', contactCtrl.index);
router.get('/contact/add/index', contactCtrl.addIndex);
router.post('/contact/add', contactCtrl.add);
router.get('/contact/edit/index/:id', contactCtrl.editIndex);
router.post('/contact/edit/:id', contactCtrl.edit);
router.get('/contact/delete/confirm/:id', contactCtrl.confirmDelete);
router.get('/contact/delete/:id', contactCtrl.delete);

module.exports = router;