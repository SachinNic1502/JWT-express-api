const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authenticationMiddleware = require('../middleware/authenticationMiddleware');

router.post('/login', adminController.login);
router.post('/add-admin', adminController.addAdmin);
router.post('/add-seller', authenticationMiddleware, adminController.addSeller);

module.exports = router;
